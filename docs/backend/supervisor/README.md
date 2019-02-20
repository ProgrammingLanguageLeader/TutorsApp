# Supervisor installation and configuration
This utility is used for management of backend processes such as gunicorn and celery.

## Installation
```bash
sudo apt-get install supervisor
```

## Service autostart enabling
```bash
sudo systemctl enable supervisor
```

## Configuration
You need to know a location of your Python virtual environment. This command may be helpful:
```bash
pipenv --venv
```

### Gunicorn
Create a file __*/etc/supervisor/conf.d/gunicorn.conf*__ and fill it with the following string:
```ini
[program:gunicorn] 
directory=/home/tutors-app/TutorsApp/backend

command=<VIRTUAL ENVIRONMENT LOCATION>/bin/gunicorn --workers 4 --bind unix:/home/tutors-app/TutorsApp/backend/backend.sock backend_project.wsgi:application 

autostart=true 
autorestart=true 

stderr_logfile=/var/log/gunicorn/gunicorn.out.log 
stdout_logfile=/var/log/gunicorn/gunicorn.err.log 

user=tutors-app
group=www-data 

environment=LANG=en_US.UTF-8,LC_ALL=en_US.UTF-8

[group:guni]
programs:gunicorn
```

### Celery
Create a file __*/etc/supervisor/conf.d/celery.conf*__ and fill it with the folloing strings:
```ini
[program:celery]
directory=/home/tutors-app/TutorsApp/backend

command=<VIRTUAL ENVIRONMENT LOCATION>/bin/celery -A backend_project worker -l info -B

autostart=true
autorestart=true

stderr_logfile=/var/log/gunicorn/celery.out.log
stdout_logfile=/var/log/gunicorn/celery.err.log

user=tutors-app
group=www-data

environment=LANG=en_US.UTF-8,LC_ALL=en_US.UTF-8
```

## Restarting
```bash
sudo systemctl restart supervisor
```