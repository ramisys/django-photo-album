import sqlite3
conn=sqlite3.connect('db.sqlite3')
cur=conn.cursor()
for row in cur.execute("SELECT id, app, name FROM django_migrations ORDER BY app, name"):
    print(row)
conn.close()
