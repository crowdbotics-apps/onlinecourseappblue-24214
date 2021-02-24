from datetime import datetime
import uuid
import stripe
from django.conf import settings
from django.db import models
from django.utils.translation import gettext as _
stripe.api_key = settings.STRIPE_API_KEY


def get_or_create_plan(plan_id):
    plan = stripe.Plan.retrieve(plan_id)
    return plan


class StripeCustomer(models.Model):
    """ Stripe customer model """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    external_id = models.CharField(
        _("Stripe id"),
        unique=True,
        max_length=64,
        blank=True)
    email = models.EmailField(
        _("Email"),
        max_length=256,
        blank=False,
        unique=True)
    plan_id = models.CharField(_("Plan id"), max_length=64, blank=True)
    plan_name = models.CharField(_("Plan name"), max_length=64, blank=True)
    subscription_id = models.CharField(
        _("Subscription id"),
        max_length=64,
        blank=True,
        null=True)

    user = models.OneToOneField("users.User", on_delete=models.CASCADE)

    created_at = models.DateTimeField(_("Created at"), auto_now_add=True)
    updated_at = models.DateTimeField(_("Updated at"), auto_now=True)

    def __str__(self):
        return self.external_id

    @classmethod
    def find_by_user(cls, user):
        return cls.objects.filter(user=user).first()

    @classmethod
    def find_by_external_id(cls, external_id):
        return cls.objects.filter(external_id=external_id).first()

    @property
    def uuid(self):
        return str(self.id)

    def cancel_subscription(self):
        subscription = stripe.Subscription.retrieve(self.subscription_id)
        subscription.collection_method = "send_invoice"
        subscription.days_until_due = 3
        subscription.cancel_at_period_end = True
        subscription.save()

        ext_customer = stripe.Customer.retrieve(self.external_id)
        old_source = ext_customer.sources.retrieve(ext_customer.default_source)
        ext_customer.description = "Updated at %s" % str(datetime.utcnow())
        old_source.delete()
        ext_customer.save()

    @classmethod
    def create_payment_token(
            cls, card_number, card_exp_month, card_exp_year, card_cvv):
        return stripe.Token.create(
            card={
                "number": card_number,
                "exp_month": card_exp_month,
                "exp_year": card_exp_year,
                "cvc": card_cvv
            },
        )

    @classmethod
    def update_or_create(cls, **kwargs):
        user = kwargs.pop('user')
        coupon_id = kwargs.pop('promo_code')
        plan_id = kwargs.pop('plan_id')
        payment_token = cls.create_payment_token(**kwargs)
        instance = cls.objects.filter(user=user).first()
        plan = get_or_create_plan(plan_id)

        # Add new card to existing customer and update plan subscription
        if instance:
            customer = stripe.Customer.retrieve(instance.external_id)
            if customer:
                subscription = stripe.Subscription.retrieve(instance.subscription_id)
                if subscription:
                    stripe.Subscription.modify(
                        subscription.id,
                        cancel_at_period_end=False,
                        proration_behavior='create_prorations',
                        items=[{
                            'id': subscription['items']['data'][0].id,
                            'price': plan.id,
                        }]
                    )
                customer.sources.create(source=payment_token)

                if customer.default_source:
                    old_card = customer.sources.retrieve(
                        customer.default_source)
                    old_card.delete()
                    # stripe.Customer.delete_source(
                    #     customer.id,
                    #     old_card.id
                        # customer.default_source,
                    # )
                customer.default_source = payment_token.card.id
                customer.description = "Updated at %s" % str(datetime.utcnow())

                customer.save()
                created = False
                message = ""
            else:
                raise Exception("Invalid stripe id")
            """ Here we could update plan in future """
        else:
            customer = stripe.Customer.create(
                description="Customer %s" % user.email,
                email=user.email,
                source=payment_token
            )
            arguments = {
                "customer": customer.id,
                "items": [
                    {
                        "plan": plan.id,
                    },
                ],
                "prorate": False
            }

            try:
                if coupon_id != '':
                    coupon = stripe.Coupon.retrieve(coupon_id)
                    if coupon.get("id"):
                        arguments['coupon'] = coupon.get('id')
            except:
                pass

            subscription = stripe.Subscription.create(
                **arguments
            )

            instance = cls.objects.create(
                external_id=customer.id,
                email=user.email,
                user=user,
                plan_id=plan.id,
                plan_name="",
                subscription_id=subscription.id
            )
            instance.save()
            created = True
            message = ""

        return instance, created, message
