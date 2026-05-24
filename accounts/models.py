from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
	"""Custom user model that stores a full_name and enforces unique email.

	We subclass `AbstractUser` to preserve Django's standard behavior while
	adding the `full_name` attribute used by the signup form. Email is set
	to be unique at the DB level which works well on Postgres.
	"""

	full_name = models.CharField(max_length=150, blank=True)
	email = models.EmailField('email address', unique=True)

	def __str__(self) -> str:  # pragma: no cover - trivial
		return self.username
    
	# Note: we previously mapped this model to the existing `auth_user` table
	# to preserve local SQLite data during development. That mapping has been
	# removed so Django will manage the `accounts_customuser` table normally
	# (recommended for production Postgres deployments).
