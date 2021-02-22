from django.contrib import admin
from django import forms

from payments.models import StripeCustomer


class StripeCustomerAdminForm(forms.ModelForm):

    class Meta:
        model = StripeCustomer
        fields = '__all__'


class StripeCustomerAdmin(admin.ModelAdmin):
    form = StripeCustomerAdminForm
    list_display = ['email', 'user', 'external_id', 'plan_id', 'plan_name', 'subscription_id',
                    'updated_at', 'created_at']


admin.site.register(StripeCustomer, StripeCustomerAdmin)
