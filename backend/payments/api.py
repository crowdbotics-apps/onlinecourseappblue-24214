import stripe
from rest_framework import status, viewsets
from rest_framework.response import Response
from payments.models import StripeCustomer
from payments.serializers import StripeCustomerSerializer, CancelSubscriptionSerializer


class StripeCustomerViewSet(viewsets.ModelViewSet):
    queryset = StripeCustomer.objects.none()
    http_method_names = ["post", "option", "head"]
    serializer_class = StripeCustomerSerializer

    def create(self, request, *args, **kwargs):
        user = request.user
        try:
            _, created, message = StripeCustomer.update_or_create(
                **request.data, user=user)
            user.subscription_plan = request.data["plan_id"]
            user.save()
            return Response(status=status.HTTP_200_OK, data={
                "ok": True,
                "error": None,
                "created": created,
                "message": message
            })
        except stripe.error.CardError as e:
            body = e.json_body
            err = body.get('error', {})
            return Response(status=status.HTTP_400_BAD_REQUEST, data={
                "ok": False,
                "error": err.get('type'),
                "message": err.get('message')
            })
        except Exception as e:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR, data={
                "ok": False,
                "error": "Server Error",
                "message": "Invalid Card Detail"
            })


class CancelSubscriptionStripeCustomerViewSet(viewsets.ModelViewSet):
    queryset = StripeCustomer.objects.none()
    http_method_names = ["post", "option", "head"]
    serializer_class = CancelSubscriptionSerializer

    def create(self, request, *args, **kwargs):
        user = request.user
        stripe_customer = StripeCustomer.find_by_user(user)

        if stripe_customer:
            try:
                stripe_customer.cancel_subscription()
                user.subscription_plan = ""
                user.save()
                return Response(status=status.HTTP_200_OK, data={
                    "ok": True,
                    "error": None,
                })
            except Exception as err:
                return Response(status=status.HTTP_400_BAD_REQUEST, data={
                    "ok": False,
                    "error": str(err),
                })
        else:
            return Response(status=status.HTTP_404_NOT_FOUND, data={
                "ok": False,
                "error": "Customer Does not exist.",
            })


class AllPlansStripeCustomerViewSet(viewsets.ModelViewSet):
    queryset = StripeCustomer.objects.none()
    http_method_names = ["get", "option", "head"]
    serializer_class = CancelSubscriptionSerializer

    def list(self, request, *args, **kwargs):
        try:
            plans = stripe.Plan.list()
            return Response(status=status.HTTP_200_OK, data=plans.data)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST, data={
                "ok": False,
                "error": "Not Plans found",
            })
