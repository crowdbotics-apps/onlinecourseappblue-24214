from django_filters import Filter
from django_filters.rest_framework import FilterSet
from course.models import Course, Category


class ListFilter(Filter):
    def filter(self, qs, value):
        if not value:
            return qs

        # For django-filter versions < 0.13, use lookup_type instead of lookup_expr
        self.lookup_expr = 'in'
        values = value.split(',')
        return super(ListFilter, self).filter(qs, values)


class CourseFilter(FilterSet):

    class Meta:
        model = Course
        fields = {'categories': ['exact'], 'categories__name': ['icontains']}


class CategoryFilter(FilterSet):

    class Meta:
        model = Category
        fields = ['name']
