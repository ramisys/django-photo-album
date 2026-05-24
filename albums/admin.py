from django.contrib import admin
from .models import Album, Photo



@admin.register(Album)
class AlbumAdmin(admin.ModelAdmin):
	list_display = ('title', 'owner', 'created_at')
	list_filter = ('created_at', 'owner')
	search_fields = ('title', 'description', 'owner__username')


@admin.register(Photo)
class PhotoAdmin(admin.ModelAdmin):
	list_display = ('caption', 'album', 'uploaded_at')
	list_filter = ('uploaded_at', 'album')
	search_fields = ('caption', 'album__title')