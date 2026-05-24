from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import redirect
from django.urls import reverse_lazy
from django.views.generic import CreateView


class SignUpView(CreateView):
	form_class = UserCreationForm
	template_name = 'registration/signup.html'
	success_url = reverse_lazy('login')

	def dispatch(self, request, *args, **kwargs):
		if request.user.is_authenticated:
			return redirect('album-list')
		return super().dispatch(request, *args, **kwargs)
