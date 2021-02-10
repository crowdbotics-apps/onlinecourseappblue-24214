from django.conf import settings
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models
from datetime import timedelta

from course.font_awesome_icons import ICONS


class Category(models.Model):
    """Category Model"""
    name = models.CharField(max_length=256, )
    icon = models.CharField(choices=ICONS, max_length=250, null=True, blank=True)

    class Meta:
        verbose_name_plural = 'Categories'

    def __str__(self):
        return u'%s' % self.name

    @property
    def total_courses(self):
        return self.course_categories.filter(is_published=True).count()


class Group(models.Model):
    """Group Model"""
    name = models.CharField(max_length=256, )

    class Meta:
        verbose_name_plural = 'Groups'

    def __str__(self):
        return u'%s' % self.name


class PaymentMethod(models.Model):
    """PaymentMethod Model"""
    user = models.ForeignKey(
        "users.User", on_delete=models.CASCADE, related_name="paymentmethod_user",
    )
    primary = models.BooleanField()
    token = models.CharField(max_length=256, )

    class Meta:
        verbose_name_plural = 'Payment Method'

    def __str__(self):
        return u'%s' % self.user


class Course(models.Model):
    """Course Model"""

    FREE = 0
    PREMIUM = 1

    STATUS_CHOICES = ((FREE, 'FREE'), (PREMIUM, 'PREMIUM'))

    author = models.ForeignKey(
        "users.User", on_delete=models.CASCADE, related_name="course_author",
    )
    title = models.CharField(max_length=256)
    description = models.TextField(null=True, blank=True, )
    categories = models.ManyToManyField("course.Category", blank=True, related_name="course_categories")
    image = models.ImageField(upload_to="course/", blank=True, null=True)
    initial_balance = models.DecimalField(decimal_places=3, max_digits=10, default=0, verbose_name="ledger balance")
    is_published = models.BooleanField(default=False)
    subscription_status = models.PositiveSmallIntegerField(choices=STATUS_CHOICES, default=FREE)

    class Meta:
        verbose_name_plural = 'Courses'

    def __str__(self):
        return u'%s' % self.title

    def save_notification(self):
        from notifications.models import Notification

        title = 'Notice'
        message = f"New course {self.title} has been published and is open for enrollment."
        Notification.objects.create(title=title, message=message, course_id=self.id)

    def get_time_sum(self, lessons):
        total_time = timedelta()
        for lesson in lessons:
            if lesson:
                total_time += timedelta(hours=lesson.hour, minutes=lesson.minute, seconds=lesson.second)

        return total_time

    @property
    def duration(self):
        lessons = Lesson.objects.filter(course_id=self.id).values_list('duration')
        return str(sum(map(self.get_time_sum, lessons), timedelta()))


# class Module(models.Model):
#     """Generated Model"""
#     course = models.ForeignKey(
#         "course.Course", on_delete=models.CASCADE, related_name="module_course",
#     )
#     title = models.CharField(max_length=256,)
#     description = models.TextField()
#
#     class Meta:
#         verbose_name_plural = "Modules"
#         ordering = ('pk',)
#
#     def __str__(self):
#         return u'%s' % self.title
#

class Lesson(models.Model):
    """Lesson Model"""
    # module = models.ForeignKey(
    #     "course.Module", on_delete=models.CASCADE, related_name="lesson_module",
    # )
    course = models.ForeignKey(
        "course.Course", on_delete=models.CASCADE, related_name="course_lesson",
    )

    title = models.CharField(max_length=256, )
    description = models.TextField()
    media = models.FileField()
    duration = models.TimeField(null=True, blank=True)

    class Meta:
        verbose_name_plural = "Lessons"
        ordering = ('pk',)

    def __str__(self):
        return u'%s' % self.title


class Introduction(models.Model):
    description = models.CharField(max_length=255)
    image = models.ImageField(upload_to="assignment/", blank=True, null=True)
    file = models.FileField(upload_to="assignment/", blank=True, null=True)

    class Meta:
        verbose_name_plural = 'Introduction'

    def __str__(self):
        return f"{self.description}"


class HousingAssignment(models.Model):
    description = models.CharField(max_length=255)

    def get_items(self):
        return self.house_items.all()

    class Meta:
        verbose_name_plural = 'Housings'

    def __str__(self):
        return f"{self.description}"


class HousingItems(models.Model):
    house = models.ForeignKey(HousingAssignment, blank=True, null=True, on_delete=models.CASCADE, related_name="house_items")
    title = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(decimal_places=3, max_digits=10)

    class Meta:
        verbose_name_plural = 'Housing items'

    def __str__(self):
        return f"{self.title}"


class Transportation(models.Model):
    description = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.description}"

    def get_items(self):
        return self.transport_items.all()


class TransportItems(models.Model):
    NEW = 0
    USED = 1
    TRANSPORTATION_CHOICES = ((NEW, 'NEW'), (USED, 'USED'))

    transportation = models.ForeignKey(Transportation, on_delete=models.PROTECT, related_name='transport_items')
    title = models.CharField(max_length=100)
    total = models.CharField(max_length=100)
    type = models.PositiveSmallIntegerField(choices=TRANSPORTATION_CHOICES, default=NEW)

    class Meta:
        verbose_name_plural = 'Transportation Items'

    def __str__(self):
        return f"{self.title}"


class ChildCare(models.Model):
    description = models.CharField(max_length=255)

    def get_items(self):
        return self.childcare_items.all()

    def __str__(self):
        return f"{self.description}"


class ChildCareItems(models.Model):
    REQUIRED_COST = 0
    ADD_ONS = 1
    CHILD_CARE_CHOICES = ((REQUIRED_COST, 'REQUIRED_COST'), (ADD_ONS, 'ADD_ONS'))

    child_care = models.ForeignKey(ChildCare, on_delete=models.PROTECT, related_name='childcare_items')
    title = models.CharField(max_length=100)
    price = models.CharField(max_length=100)
    type = models.PositiveSmallIntegerField(choices=CHILD_CARE_CHOICES, default=REQUIRED_COST)

    def __str__(self):
        return f"{self.title}"

    class Meta:
        verbose_name_plural = "Child Care Items"


class GroceryAssignment(models.Model):
    description = models.CharField(max_length=255)

    def get_items(self):
        return self.grocery_items.all()

    def __str__(self):
        return f"{self.description}"

    class Meta:
        verbose_name_plural = "Groceries"


class GroceryItems(models.Model):
    grocery = models.ForeignKey(GroceryAssignment, blank=True, null=True, on_delete=models.CASCADE, related_name="grocery_items")
    title = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(decimal_places=3, max_digits=10)

    def __str__(self):
        return f"{self.title}"

    class Meta:
        verbose_name_plural = "Grocery Items"


class LifeHappensAssignment(models.Model):
    description = models.CharField(max_length=255)
    loss = models.DecimalField(decimal_places=3, max_digits=10)
    loss_description = models.CharField(max_length=255, null=True)

    def __str__(self):
        return f"{self.loss}"

    class Meta:
        verbose_name_plural = "Life Happens"


class RestaurantAssignment(models.Model):
    description = models.CharField(max_length=255)

    def get_items(self):
        return self.restaurant_items.all()

    def __str__(self):
        return f"{self.description}"

    class Meta:
        verbose_name_plural = "Restaurants"


class RestaurantsItems(models.Model):
    FAST_FOOD = 0
    SIT_DOWN = 1
    RESTAURANT_CHOICES = ((FAST_FOOD, 'FAST_FOOD'), (SIT_DOWN, 'SIT_DOWN'))

    restaurant = models.ForeignKey(RestaurantAssignment, blank=True, null=True, on_delete=models.CASCADE, related_name="restaurant_items")
    title = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(decimal_places=3, max_digits=10)
    type = models.PositiveSmallIntegerField(choices=RESTAURANT_CHOICES, default=FAST_FOOD)

    def __str__(self):
        return f"{self.title}"

    class Meta:
        verbose_name_plural = "Restaurant Items"


class CreditCardAssignment(models.Model):
    description = models.CharField(max_length=255)
    min_payment = models.PositiveIntegerField(default=0)
    current_balance = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.description}"

    class Meta:
        verbose_name_plural = "Credit Cards"


class Electronic(models.Model):
    description = models.CharField(max_length=255)

    def get_items(self):
        return self.electronic_items.all()

    def __str__(self):
        return f"{self.description}"


class ElectronicItems(models.Model):
    electronic = models.ForeignKey(Electronic, on_delete=models.PROTECT, related_name='electronic_items')
    title = models.CharField(max_length=100)
    price = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.title}"

    class Meta:
        verbose_name_plural = "Electronic Items"


# class Clothing(models.Model):
#     description = models.CharField(max_length=255)

#     def get_items(self):
#         return self.clothing_items.all()

#     def __str__(self):
#         return f"{self.description}"


# class ClothingItems(models.Model):
#     clothing = models.ForeignKey(Clothing, blank=True, null=True, on_delete=models.CASCADE, related_name="clothing_items")
#     title = models.CharField(max_length=255)
#     description = models.TextField()
#     price = models.DecimalField(decimal_places=3, max_digits=10)

#     def __str__(self):
#         return f"{self.title}"

#     class Meta:
#         verbose_name_plural = "Clothing Items"


class PersonalCare(models.Model):
    description = models.CharField(max_length=255)

    def get_items(self):
        return self.personalcare_items.all()

    def __str__(self):
        return f"{self.description}"


class PersonalCareItems(models.Model):
    MEN = 0
    WOMEN = 1
    SOAP_OR_SHAMPOO = 2
    MAKE_UP_OR_SKIN_CARE = 3
    SHAVING_SUPPLIES = 4
    CLOTHING = 5
    PERSONAL_CARE_CHOICES = (
        (MEN, 'MEN'), (WOMEN, 'WOMEN'), (SOAP_OR_SHAMPOO, 'SOAP_OR_SHAMPOO'),
        (MAKE_UP_OR_SKIN_CARE, 'MAKE_UP_OR_SKIN_CARE'), (SHAVING_SUPPLIES, 'SHAVING_SUPPLIES'),
        (CLOTHING, 'CLOTHING')
    )

    personal_care = models.ForeignKey(PersonalCare, on_delete=models.PROTECT, related_name='personalcare_items')
    title = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)
    price = models.CharField(max_length=100)
    type = models.PositiveSmallIntegerField(choices=PERSONAL_CARE_CHOICES, default=MEN)

    def __str__(self):
        return f"{self.title}"

    class Meta:
        verbose_name_plural = "Personal Care Items"


class HomeFurnishing(models.Model):
    description = models.CharField(max_length=255)

    def get_items(self):
        return self.homefurnishing_items.all()

    def __str__(self):
        return f"{self.description}"


class HomeFurnishingItems(models.Model):
    TV = 0
    COMPUTER = 1
    FURNITURE = 2
    CLEANING = 3
    FURNISHING_CHOICES = (
        (TV, 'TV'), (COMPUTER, 'COMPUTER'), (FURNITURE, 'FURNITURE'), (CLEANING, 'CLEANING')
    )

    home_furnishing = models.ForeignKey(HomeFurnishing, on_delete=models.PROTECT, related_name='homefurnishing_items')
    title = models.CharField(max_length=100)
    price = models.CharField(max_length=100)
    type = models.PositiveSmallIntegerField(choices=FURNISHING_CHOICES, default=TV)

    def __str__(self):
        return f"{self.title}"

    class Meta:
        verbose_name_plural = "Home Furnishing Items"


class Entertainment(models.Model):
    description = models.CharField(max_length=255)

    def get_items(self):
        return self.entertainment_items.all()

    def __str__(self):
        return f"{self.description}"


class EntertainmentItems(models.Model):
    entertainment = models.ForeignKey(Entertainment, on_delete=models.PROTECT, related_name='entertainment_items')
    title = models.CharField(max_length=100)
    price = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.title}"

    class Meta:
        verbose_name_plural = "Entertainment Items"


class Assignment(models.Model):
    lesson = models.ManyToManyField(Lesson, related_name="lesson_assignment")
    title = models.CharField(max_length=255)
    min_range = models.PositiveIntegerField(default=0)
    max_range = models.PositiveIntegerField(default=0)
    inline = models.BooleanField(default=False)
    content_type = models.ForeignKey(ContentType, limit_choices_to={
        'model__in': (
            'introduction', 'housingassignment', 'transportation', 'childcare', 'groceryassignment',
            'lifehappensassignment', 'restaurantassignment', 'creditcardassignment',
            'electronic', 'personalcare', 'homefurnishing', 'entertainment'
        )
    }, on_delete=models.PROTECT, related_name="content_type_timelines", null=True, blank=True)
    object_id = models.PositiveIntegerField(null=True, blank=True)
    content_object = GenericForeignKey('content_type', 'object_id')

    class Meta:
        verbose_name_plural = "Assignments"

    def __str__(self):
        return f"{self.title}"


class Ledger(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="course_ledger")
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    initial_balance = models.DecimalField(decimal_places=3, max_digits=10, default=0)
    saving = models.DecimalField(decimal_places=3, max_digits=10, null=True, blank=True)
    giving = models.DecimalField(decimal_places=3, max_digits=10, null=True, blank=True)
    housing = models.DecimalField(decimal_places=3, max_digits=10, null=True, blank=True)
    transportation = models.DecimalField(decimal_places=3, max_digits=10, null=True, blank=True)
    child_care = models.DecimalField(decimal_places=3, max_digits=10, null=True, blank=True)
    groceries = models.DecimalField(decimal_places=3, max_digits=10, null=True, blank=True)
    life_happens = models.DecimalField(decimal_places=3, max_digits=10, null=True, blank=True)
    dining_out = models.DecimalField(decimal_places=3, max_digits=10, null=True, blank=True)
    credit_card = models.DecimalField(decimal_places=3, max_digits=10, null=True, blank=True)
    electronics = models.DecimalField(decimal_places=3, max_digits=10, null=True, blank=True)
    # clothing = models.DecimalField(decimal_places=3, max_digits=10, null=True, blank=True)
    personal_care = models.DecimalField(decimal_places=3, max_digits=10, null=True, blank=True)
    home_furnishings = models.DecimalField(decimal_places=3, max_digits=10, null=True, blank=True)
    entertainment = models.DecimalField(decimal_places=3, max_digits=10, null=True, blank=True)
    is_completed = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.course.title}"

    class Meta:
        unique_together = ('user', 'course',)


class Enrollment(models.Model):
    """Enrollment Model"""
    user = models.ForeignKey(
        "users.User", on_delete=models.CASCADE, related_name="enrollment_user",
    )
    course = models.ForeignKey(
        "course.Course", on_delete=models.CASCADE, related_name="enrollment_course",
    )

    class Meta:
        verbose_name_plural = "Enrollments"
        unique_together = ('user', 'course',)

    def __str__(self):
        return u'%s' % self.course


class Subscription(models.Model):
    """Subscription Model"""
    subscription_type = models.ForeignKey(
        "course.SubscriptionType",
        on_delete=models.CASCADE,
        related_name="subscription_subscription_type",
    )
    user = models.ForeignKey(
        "users.User", on_delete=models.CASCADE, related_name="subscription_user",
    )

    class Meta:
        verbose_name_plural = "Subscriptions"

    def __str__(self):
        return u'%s' % self.subscription_type


class SubscriptionType(models.Model):
    """SubscriptionType Model"""
    name = models.CharField(max_length=256, )

    class Meta:
        verbose_name_plural = "Subscription Types"

    def __str__(self):
        return u'%s' % self.name


class Event(models.Model):
    """Event Model"""
    name = models.CharField(max_length=256, )
    user = models.ForeignKey(
        "users.User", on_delete=models.CASCADE, related_name="event_user",
    )
    date = models.DateTimeField()

    class Meta:
        verbose_name_plural = "Events"

    def __str__(self):
        return u'%s' % self.name


class Recording(models.Model):
    """Recording Model"""
    event = models.ForeignKey(
        "course.Event", on_delete=models.CASCADE, related_name="recording_event",
    )
    media = models.FileField()
    user = models.ForeignKey(
        "users.User", on_delete=models.CASCADE, related_name="recording_user",
    )
    published = models.DateTimeField()

    class Meta:
        verbose_name_plural = "Recordings"

    def __str__(self):
        return u'%s' % self.event


class LessonProgress(models.Model):
    lesson = models.ForeignKey(Lesson, on_delete=models.PROTECT, related_name="lesson_progress")
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    is_completed = models.BooleanField(default=False)
    is_opened = models.BooleanField(default=False)

    class Meta:
        verbose_name_plural = "Lesson Progress"

    def __str__(self):
        return u'%s' % self.lesson


class AssignmentProgress(models.Model):
    assignment = models.ForeignKey(Assignment, on_delete=models.PROTECT, related_name="assignment_progress")
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)

    class Meta:
        verbose_name_plural = "Assignment Progress"

    def __str__(self):
        return u'%s' % self.assignment
