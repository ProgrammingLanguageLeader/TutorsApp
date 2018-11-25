#!/usr/bin/env bash
python manage.py migrate --noinput
gunicorn vktutor.wsgi:application -w 4 --bind 0.0.0.0:8000
