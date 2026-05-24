from django.urls import path

from .views import (
    AlbumCreateView,
    AlbumDeleteView,
    AlbumDetailView,
    AlbumListView,
    AlbumUpdateView,
    PhotoCreateView,
    PhotoDeleteView,
    PhotoUpdateView,
)

urlpatterns = [
    path('', AlbumListView.as_view(), name='album-list'),
    path('albums/new/', AlbumCreateView.as_view(), name='album-create'),
    path('albums/<int:pk>/', AlbumDetailView.as_view(), name='album-detail'),
    path('albums/<int:pk>/edit/', AlbumUpdateView.as_view(), name='album-update'),
    path('albums/<int:pk>/delete/', AlbumDeleteView.as_view(), name='album-delete'),
    path('albums/<int:album_pk>/photos/new/', PhotoCreateView.as_view(), name='photo-create'),
    path('albums/<int:album_pk>/photos/<int:pk>/edit/', PhotoUpdateView.as_view(), name='photo-update'),
    path('albums/<int:album_pk>/photos/<int:pk>/delete/', PhotoDeleteView.as_view(), name='photo-delete'),
]