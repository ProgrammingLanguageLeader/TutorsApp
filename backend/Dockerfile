FROM python:3.6-slim

ENV PYTHONUNBUFFERED 1

COPY . /backend/
WORKDIR /backend
RUN pip install pipenv
RUN pipenv install --system

CMD python manage.py collectstatic --no-input; \
    echo "Sleeping 10 seconds..."; \
    sleep 10s; \
    python manage.py migrate --no-input; \
    gunicorn \
        backend_project.wsgi:application \ 
        -w 4 \
        --bind unix:/backend/backend.sock \
    & celery -A backend_project worker -l info -B