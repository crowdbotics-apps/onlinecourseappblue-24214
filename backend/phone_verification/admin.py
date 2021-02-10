from django.contrib import admin
from phone_verification.models import PhoneVerification, PhoneVerificationKey


class PhoneVerificationAdmin(admin.ModelAdmin):
    list_display = (
        'user', 'phone', 'verified', 'created')
    readonly_fields = ['created']
    list_per_page = 50
    search_fields = ('phone',)


class PhoneVerificationKeyAdmin(admin.ModelAdmin):
    list_display = (
        'user', 'key', 'created')
    readonly_fields = ['created']
    list_per_page = 50
    search_fields = ('key',)


admin.site.register(PhoneVerification, PhoneVerificationAdmin)
admin.site.register(PhoneVerificationKey, PhoneVerificationKeyAdmin)
