from dotenv import load_dotenv
import os
load_dotenv()

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
import django
import sys
# Ensure project root is on path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
django.setup()

from django.db import connection
from django.core.management import call_command
from django.db.migrations.recorder import MigrationRecorder

print('Connected DB engine:', connection.settings_dict.get('ENGINE'))
print('Listing tables (first 50):')
print(connection.introspection.table_names()[:50])

migs = list(MigrationRecorder.Migration.objects.filter(app='accounts').values_list('id','app','name'))
print('accounts migration records in DB:', migs)

admin_migs = list(MigrationRecorder.Migration.objects.filter(app='admin').values_list('id','app','name'))
print('admin migration records in DB (sample):', admin_migs[:5])

if 'accounts_customuser' not in connection.introspection.table_names():
    print('accounts_customuser table missing. Preparing to reset migration records.')
    # Backup existing migration records then delete them all so we can re-run migrations
    all_migs = list(MigrationRecorder.Migration.objects.all().values_list('id','app','name'))
    print(f'Existing migration records count: {len(all_migs)}')
    print('Deleting all migration records to allow a fresh migration run')
    MigrationRecorder.Migration.objects.all().delete()

    print('Running full migrate with --fake-initial to create missing tables and mark existing ones')
    call_command('migrate', fake_initial=True, verbosity=2)
    print('Migration run complete')
else:
    print('accounts_customuser table already exists — nothing to do')
