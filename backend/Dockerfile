FROM python:3-alpine

ENV PYTHONUNBUFFERED 1

RUN mkdir -p /opt/services/backend
WORKDIR /opt/services/backend

RUN apk add --no-cache \ 
        postgresql-libs \ 
        python-dev \ 
        py-pip \ 
        jpeg-dev \ 
        zlib-dev \ 
        gcc \ 
        musl-dev \ 
        postgresql-dev

RUN pip install --upgrade pip
RUN pip install pipenv
COPY Pipfile Pipfile.lock /opt/services/backend/
RUN pipenv install --system

COPY . /opt/services/backend/
RUN python manage.py collectstatic --no-input
