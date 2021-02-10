from course.api.v1.serializers import (
    HousingItemsSerializer,
    TransportItemsSerializer,
    ChildCareItemsSerializer,
    GroceryItemsSerializer,
    LifeHappensSerializer,
    RestaurantsItemsSerializer,
    CreditCardSerializer,
    ElectronicItemsSerializer,
    # ClothingItemsSerializer,
    PersonalCareItemsSerializer,
    HomeFurnishingItemsSerializer,
    EntertainmentItemsSerializer, IntroductionAssignmentSerializer)
from course.models import LifeHappensAssignment, CreditCardAssignment, Introduction


def get_customized_serializer(content_object):
    serializer = None
    description = {}
    if hasattr(content_object, "house_items"):
        description = {'text': content_object.description, "type": "housing"}
        queryset = content_object.get_items()
        serializer = HousingItemsSerializer(queryset, many=True)
    elif hasattr(content_object, "transport_items"):
        description = {'text': content_object.description, "type": "transportation"}
        queryset = content_object.get_items()
        serializer = TransportItemsSerializer(queryset, many=True)
    elif hasattr(content_object, "childcare_items"):
        description = {'text': content_object.description, "type": "childcare"}
        queryset = content_object.get_items()
        serializer = ChildCareItemsSerializer(queryset, many=True)
    elif hasattr(content_object, "grocery_items"):
        description = {'text': content_object.description, "type": "grocery"}
        queryset = content_object.get_items()
        serializer = GroceryItemsSerializer(queryset, many=True)
    elif hasattr(content_object, "restaurant_items"):
        description = {'text': content_object.description, "type": "restaurant"}
        queryset = content_object.get_items()
        serializer = RestaurantsItemsSerializer(queryset, many=True)
    elif hasattr(content_object, "electronic_items"):
        description = {'text': content_object.description, "type": "electronic"}
        queryset = content_object.get_items()
        serializer = ElectronicItemsSerializer(queryset, many=True)
    # elif hasattr(content_object, "clothing_items"):
    #     description = {'text': content_object.description, "type": "clothing"}
    #     queryset = content_object.get_items()
    #     serializer = ClothingItemsSerializer(queryset, many=True)
    elif hasattr(content_object, "personalcare_items"):
        description = {'text': content_object.description, "type": "personalcare"}
        queryset = content_object.get_items()
        serializer = PersonalCareItemsSerializer(queryset, many=True)
    elif hasattr(content_object, "homefurnishing_items"):
        description = {'text': content_object.description, "type": "homefurnishing"}
        queryset = content_object.get_items()
        serializer = HomeFurnishingItemsSerializer(queryset, many=True)
    elif hasattr(content_object, "entertainment_items"):
        description = {'text': content_object.description, "type": "entertainment"}
        queryset = content_object.get_items()
        serializer = EntertainmentItemsSerializer(queryset, many=True)
    elif isinstance(content_object, LifeHappensAssignment):
        serializer = LifeHappensSerializer(content_object)
        description = {'text': content_object.description, "type": "life_happens"}
    elif isinstance(content_object, CreditCardAssignment):
        serializer = CreditCardSerializer(content_object)
        description = {'text': content_object.description, "type": "credit_card"}
    elif isinstance(content_object, Introduction):
        serializer = IntroductionAssignmentSerializer(content_object)
        description = {'text': content_object.description, "type": "overview"}
    return serializer, description


def convert_second_to_time(seconds):
    seconds = seconds % (24 * 3600)
    hour = seconds // 3600
    seconds %= 3600
    minutes = seconds // 60
    seconds %= 60

    return "%d:%02d:%02d" % (hour, minutes, seconds)
