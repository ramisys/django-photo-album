from django import forms

from .models import Album, Photo


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
        model = Photo
        fields = ['image', 'caption']
        widgets = {
            'image': forms.ClearableFileInput(
                attrs={
                    'accept': 'image/*',
                }
            ),
            'caption': forms.Textarea(
                attrs={
                    'placeholder': 'Write a description for your photo...',
                    'rows': 5,
                }
            ),
        }