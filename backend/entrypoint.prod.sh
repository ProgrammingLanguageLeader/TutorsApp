#!/usr/bin/env bash
python wait-for-postgres.py
python manage.py migrate --noinput
gunicorn vktutor.wsgi:application -w 4 --bind 0.0.0.0:8000
