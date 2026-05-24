from django.shortcuts import redirect
from django.urls import reverse_lazy
from django.views.generic import CreateView

from .forms import SignUpForm


class SignUpView(CreateView):
	form_class = SignUpForm
	template_name = 'registration/signup.html'
	success_url = reverse_lazy('login')

	def dispatch(self, request, *args, **kwargs):
		if request.user.is_authenticated:
			return redirect('album-list')
		return super().dispatch(request, *args, **kwargs)
