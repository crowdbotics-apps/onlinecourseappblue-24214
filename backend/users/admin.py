from django.contrib import admin
from django.contrib.auth import admin as auth_admin
from django.contrib.auth import get_user_model

from users.forms import UserChangeForm, UserCreationForm

User = get_user_model()


@admin.register(User)
class UserAdmin(auth_admin.UserAdmin):

    form = UserChangeForm
    add_form = UserCreationForm
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2',)
        }),
    )
    fieldsets = (("User", {"fields": ("name", "image", 'phone_number', 'role', 'country_dial_code', 'country_code')}),) \
                + auth_admin.UserAdmin.fieldsets
    list_display = ["username", "name", "is_superuser",'phone_number', 'role', 'country_dial_code', 'country_code']
    search_fields = ["name"]
