import sqlite3
import sys

try:
    conn = sqlite3.connect('db.sqlite3')
    cur = conn.cursor()
    cur.execute("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name")
    rows = cur.fetchall()
    for r in rows:
        print(r[0])
except Exception as e:
    print('ERROR:', e)
    sys.exit(1)
