[![Build Status](https://travis-ci.com/ProgrammingLanguageLeader/TutorsApp.svg?token=NAXdZ3urs2rzWv4x9zhq&branch=master)](https://travis-ci.com/ProgrammingLanguageLeader/TutorsApp)

# Tutors App
An application for convinient interaction between tutors and students

## Structure
- backend - Django project that provides server API
- vk-apps-frontend - module for the client view of the application in "VK Apps" platform
- docs - the project documentation
- docker - files used by Docker

## Running locally using Docker Compose

Running service:
```bash
docker-compose up -d
```

Stopping service:
```bash
docker-compose down
```

## Running locally without Docker

### vk-apps-frontend
Node.js and NPM are required. 

Installation of dependencies:
```bash
npm install
```

Running locally in a development mode:
```bash
npm start
```

Building the module:
```bash
npm run build
```

This module has an apportunity of using Github Pages as a hosting. 
Set a property __*homepage*__ in a file __*package.json*__ to an address on Github Pages.
Use the following command to deploy the module via this service:
```bash
npm run deploy
```

### backend
Python 3.6 or higher and pipenv are required.

Run the following command to install dependencies and configure virtual environment:
```bash
pipenv install
```

After the installation you need to run database migrations:
```bash
pipenv shell
python manage.py migrate
```

Finally, you are able to launch the backend server:
```bash
pipenv shell
python manage.py runserver
```

If you need to run tests, use these commands:
```bash
pipenv shell
python manage.py test
```

## Deployment
Use instructions from a __*docs/*__ folder.

## License
This project is licensed under the MIT License - see the LICENSE file for details
