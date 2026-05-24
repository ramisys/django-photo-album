from django.contrib.auth.models import Group, Permission
from django.db.models.signals import post_migrate
from django.dispatch import receiver


ADMIN_GROUP_NAME = 'Album Administrators'


@receiver(post_migrate)
def ensure_album_admin_group(sender, **kwargs):
    if sender.name != 'albums':
        return

    group, _ = Group.objects.get_or_create(name=ADMIN_GROUP_NAME)
    permissions = Permission.objects.filter(
        content_type__app_label='albums',
        codename__in=[
            'add_album',
            'change_album',
            'delete_album',
            'view_album',
            'add_photo',
            'change_photo',
            'delete_photo',
            'view_photo',
        ],
    )
    group.permissions.set(permissions)