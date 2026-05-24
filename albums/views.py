from django.contrib.auth.mixins import LoginRequiredMixin
from django.db.models import Count
from django.shortcuts import get_object_or_404
from django.urls import reverse_lazy
from django.utils.timezone import localtime
from django.views.generic import CreateView, DeleteView, DetailView, ListView, UpdateView

from .forms import AlbumForm, PhotoForm
from .models import Album, Photo


class AlbumOwnershipMixin(LoginRequiredMixin):
    admin_group_name = 'Album Administrators'

    def user_is_album_admin(self):
        user = self.request.user
        return user.is_authenticated and (
            user.is_superuser or user.groups.filter(name=self.admin_group_name).exists()
        )

    def get_album_queryset(self):
        queryset = Album.objects.select_related('owner').prefetch_related('photos')
        if self.user_is_album_admin():
            return queryset
        return queryset.filter(owner=self.request.user)


class AlbumListView(AlbumOwnershipMixin, ListView):
    model = Album
    template_name = 'albums/album_list.html'
    context_object_name = 'albums'

    def get_queryset(self):
        return self.get_album_queryset().annotate(photo_count=Count('photos'))

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['albums_payload'] = [
            {
                'id': album.pk,
                'title': album.title,
                'description': album.description,
                'photo_count': album.photo_count,
                'latest_photo_url': album.photos.all()[0].image.url if album.photo_count else '',
                'created_at': localtime(album.created_at).isoformat(),
                'detail_url': album.get_absolute_url(),
            }
            for album in context['albums']
        ]
        return context


class AlbumDetailView(AlbumOwnershipMixin, DetailView):
    model = Album
    template_name = 'albums/album_detail.html'
    context_object_name = 'album'

    def get_queryset(self):
        return self.get_album_queryset()


class AlbumCreateView(AlbumOwnershipMixin, CreateView):
    model = Album
    form_class = AlbumForm
    template_name = 'albums/album_form.html'

    def form_valid(self, form):
        form.instance.owner = self.request.user
        return super().form_valid(form)


class AlbumUpdateView(AlbumOwnershipMixin, UpdateView):
    model = Album
    form_class = AlbumForm
    template_name = 'albums/album_form.html'

    def get_queryset(self):
        return self.get_album_queryset()


class AlbumDeleteView(AlbumOwnershipMixin, DeleteView):
    model = Album
    success_url = reverse_lazy('album-list')

    def get_queryset(self):
        return self.get_album_queryset()


class PhotoCreateView(AlbumOwnershipMixin, CreateView):
    model = Photo
    form_class = PhotoForm
    template_name = 'albums/photo_form.html'

    def dispatch(self, request, *args, **kwargs):
        self.album = get_object_or_404(self.get_album_queryset(), pk=self.kwargs['album_pk'])
        return super().dispatch(request, *args, **kwargs)

    def form_valid(self, form):
        form.instance.album = self.album
        return super().form_valid(form)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['album'] = self.album
        return context

    def get_success_url(self):
        return self.album.get_absolute_url()


class PhotoUpdateView(AlbumOwnershipMixin, UpdateView):
    model = Photo
    form_class = PhotoForm
    template_name = 'albums/photo_form.html'

    def get_queryset(self):
        queryset = Photo.objects.select_related('album', 'album__owner')
        if self.user_is_album_admin():
            return queryset
        return queryset.filter(album__owner=self.request.user)

    def get_success_url(self):
        return self.object.album.get_absolute_url()


class PhotoDeleteView(AlbumOwnershipMixin, DeleteView):
    model = Photo
    template_name = 'albums/photo_confirm_delete.html'

    def get_queryset(self):
        queryset = Photo.objects.select_related('album', 'album__owner')
        if self.user_is_album_admin():
            return queryset
        return queryset.filter(album__owner=self.request.user)

    def get_success_url(self):
        return self.object.album.get_absolute_url()