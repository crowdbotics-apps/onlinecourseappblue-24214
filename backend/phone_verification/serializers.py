from rest_framework import serializers


class VerifyPhoneNumberSerializer(serializers.Serializer):
    email_or_number = serializers.CharField(required=True)
    key = serializers.CharField(required=True)

    class Meta:
        fields = '__all__'


class RegisterLoginSerializer(serializers.Serializer):
    phone_number = serializers.CharField(required=True)
    id = serializers.IntegerField(required=True)
    name = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)

    class Meta:
        fields = '__all__'


class CreateNewKeySerializer(serializers.Serializer):
    email_or_number = serializers.CharField(required=True)

    class Meta:
        fields = '__all__'


# class CreateNewOTPSerializer(serializers.Serializer):
#     email_or_number = serializers.CharField(required=True)
#
#     class Meta:
#         fields = '__all__'
