from django.apps import AppConfig


class AlbumsConfig(AppConfig):
    name = 'albums'

    def ready(self):
        from . import signals  # noqa: F401
