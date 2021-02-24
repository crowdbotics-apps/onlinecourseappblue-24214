from rest_framework import serializers


class StripeCustomerSerializer(serializers.Serializer):
    card_number = serializers.CharField(required=True)
    card_exp_month = serializers.CharField(required=True)
    card_exp_year = serializers.CharField(required=True)
    card_cvv = serializers.CharField(required=True)
    plan_id = serializers.CharField(required=True)
    promo_code = serializers.CharField(required=True, allow_blank=True)

    class Meta:
        fields = "__all__"


class CancelSubscriptionSerializer(serializers.Serializer):
    stripe_user_id = serializers.CharField(required=True)

    class Meta:
        fields = "__all__"
