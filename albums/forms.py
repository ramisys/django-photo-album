from django import forms

from .models import Album


class AlbumForm(forms.ModelForm):
    class Meta:
        model = Album
        fields = ['title', 'description']
        widgets = {
            'title': forms.TextInput(
                attrs={
                    'placeholder': 'e.g., Summer Vacation 2024',
                    'autocomplete': 'off',
                    'autofocus': True,
                }
            ),
            'description': forms.Textarea(
                attrs={'placeholder': 'Write a description for your album...', 'rows': 6}
            ),
        }


class PhotoForm(forms.ModelForm):
    class Meta:
        model = Album._meta.get_field('photos').related_model
        fields = ['image', 'caption']
        widgets = {
            'image': forms.ClearableFileInput(
                attrs={
                    'accept': 'image/*',
                    'data-photo-input': 'true',
                }
            ),
            'caption': forms.TextInput(
                attrs={
                    'placeholder': 'e.g., Sunset at the beach',
                    'autocomplete': 'off',
                }
            ),
        }