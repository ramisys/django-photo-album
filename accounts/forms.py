from django import forms
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserCreationForm


User = get_user_model()


class SignUpForm(UserCreationForm):
    username = forms.CharField(max_length=150)
    full_name = forms.CharField(max_length=150)
    email = forms.EmailField()

    class Meta(UserCreationForm.Meta):
        model = User
        fields = ('username', 'full_name', 'email', 'password1', 'password2')

    def clean_username(self):
        username = self.cleaned_data['username'].strip()

        if User.objects.filter(username__iexact=username).exists():
            raise forms.ValidationError('A user with that username already exists.')

        return username

    def save(self, commit=True):
        user = super().save(commit=False)
        username = self.cleaned_data['username'].strip()
        full_name = self.cleaned_data['full_name'].strip()
        email = self.cleaned_data['email'].strip()

        user.username = username
        user.email = email
        user.full_name = full_name

        parts = full_name.split()
        user.first_name = parts[0] if parts else ''
        user.last_name = ' '.join(parts[1:]) if len(parts) > 1 else ''

        if commit:
            user.save()
            self.save_m2m()

        return user