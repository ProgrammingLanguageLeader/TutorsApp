[![Build Status](https://travis-ci.com/ProgrammingLanguageLeader/TutorsApp.svg?token=NAXdZ3urs2rzWv4x9zhq&branch=master)](https://travis-ci.com/ProgrammingLanguageLeader/TutorsApp)

# Tutors App
An application for convinient interaction between tutors and students

## Structure
- backend - Django project that provides server API
- vk-apps-frontend - module for the client view of the application in "VK Apps" platform

## Deploying the application using Docker Compose

You need to create a file __*.env*__ to configure a Postgres database. 

Example configuration file:
```
# postgres settings
POSTGRES_USER=<POSTGRES USER NAME>
POSTGRES_PASSWORD=<POSTGRES PASSWORD>
POSTGRES_DB=<POSTGRES DATABASE NAME>
```

Running service:
```bash
docker-compose up -d
```

Stopping service:
```bash
docker-compose down
```

## Running project without Docker

### vk-apps-frontend
Node.js and NPM is required. 

Installation of dependencies:
```bash
npm install
```

Running locally a development mode:
```bash
npm start
```

Build the module:
```bash
npm run build
```

This module has an apportunity of using Github Pages as a hosting. 
Set a property __*homepage*__ in a file __*package.json*__ to an address on Github Pages.
Use the following command to deploy the module to Github Pages:
```bash
npm run deploy
```

### backend
Python 3.5 or higher and pipenv is required.

Run the following command to install dependencies and configure virtual environment:
```bash
pipenv install
```

After the installation you need to run database migrations:
```bash
pipenv shell
python manage.py migrate
python manage.py runserver
```
Running tests:
```bash
pipenv shell
python manage.py test
```
