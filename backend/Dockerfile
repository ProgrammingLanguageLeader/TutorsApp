FROM python:3

ENV PYTHONUNBUFFERED 1

RUN mkdir -p /opt/services/tutors-backend/src
WORKDIR /opt/services/tutors-backend/src

RUN pip install --upgrade pip
RUN pip install pipenv
COPY Pipfile Pipfile.lock /opt/services/tutors-backend/src/
RUN pipenv install --deploy --system --dev

COPY . /opt/services/tutors-backend/src/
RUN python manage.py collectstatic --no-input
