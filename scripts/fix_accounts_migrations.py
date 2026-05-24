import shutil
import sqlite3

shutil.copyfile('db.sqlite3', 'db.sqlite3.bak')
print('Backup created: db.sqlite3.bak')
conn = sqlite3.connect('db.sqlite3')
cur = conn.cursor()
print('Existing accounts migrations:')
for row in cur.execute("SELECT id, app, name FROM django_migrations WHERE app='accounts'"):
    print(row)

cur.execute("DELETE FROM django_migrations WHERE app='accounts'")
conn.commit()
print('Deleted accounts migration records')
print('Remaining accounts migrations:')
for row in cur.execute("SELECT id, app, name FROM django_migrations WHERE app='accounts'"):
    print(row)

conn.close()
