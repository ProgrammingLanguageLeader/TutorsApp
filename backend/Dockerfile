FROM python:3-alpine

ENV PYTHONUNBUFFERED 1

RUN mkdir -p /opt/services/tutors-backend
WORKDIR /opt/services/tutors-backend

RUN apk add --no-cache postgresql-libs \ 
    && apk add --no-cache --virtual .build-deps gcc musl-dev postgresql-dev

RUN pip install --upgrade pip
RUN pip install pipenv
COPY Pipfile Pipfile.lock /opt/services/tutors-backend/
RUN pipenv install --deploy --system --dev

RUN apk --purge del .build-deps

COPY . /opt/services/tutors-backend/
RUN python manage.py collectstatic --no-input
