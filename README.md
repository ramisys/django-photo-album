# Photo Album Management System

A production-oriented Django photo album app with class-based CRUD views, role-based access control, Cloudinary-backed image storage, and Render-friendly deployment settings.

## Features

- Django CBVs for album and photo create, read, update, and delete flows.
- Authenticated access with a standard user flow and an Album Administrators group for broader management access.
- Cloudinary storage for uploaded images.
- PostgreSQL support through `DATABASE_URL` for Render.
- WhiteNoise static handling and Render deployment config.

## Local Setup

1. Create and activate a virtual environment.
2. Install dependencies with `pip install -r requirements.txt`.
3. Copy `.env.example` to `.env` and fill in the values.
4. Run `python manage.py migrate`.
5. Start the app with `python manage.py runserver`.

## Environment Variables

- `SECRET_KEY`
- `DEBUG`
- `ALLOWED_HOSTS`
- `DATABASE_URL`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `RENDER_EXTERNAL_HOSTNAME`

## RBAC Model

- Standard users can sign up, log in, and manage their own albums and photos.
- Album administrators and superusers can manage all albums and photos.
- The `Album Administrators` group is created automatically after migrations.

## Deployment to Render

1. Create a new Render web service from this repository.
2. Add a PostgreSQL database and set `DATABASE_URL` from Render.
3. Set the Cloudinary credentials and Django secret key in Render environment variables.
4. Leave `DEBUG` set to `false` in production.
5. Use the provided `render.yaml` or the `gunicorn config.wsgi:application` start command.

## Verification

Run the Django system check with the project venv:

```powershell
.\.venv\Scripts\python.exe manage.py check
```