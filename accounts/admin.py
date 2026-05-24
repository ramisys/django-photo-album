from django.contrib import admin
# Register your models here.
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser


@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
	model = CustomUser
	fieldsets = UserAdmin.fieldsets + (("Additional", {"fields": ("full_name",)}),)
	add_fieldsets = UserAdmin.add_fieldsets
	list_display = ("username", "email", "full_name", "is_staff")

# Register your models here.
