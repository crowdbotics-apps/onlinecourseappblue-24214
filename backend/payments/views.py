import stripe
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['POST'])
def test_payment(request):
    test_payment_intent = stripe.PaymentIntent.create(
        amount=1000, currency='pln',
        payment_method_types=['card'],
        receipt_email='muhammad.jamshaid@crowdbotics.com')
    return Response(status=status.HTTP_200_OK, data=test_payment_intent)
