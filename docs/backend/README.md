# Backend settings

This directory contains an example of the configuration file __*settings.ini*__. Place it to the backend directory of the project and move your settings into it.

## Settings sections

### Email
This settings will be used for mailing
```ini
EMAIL=admin@tutors-app.ru
DOMAINS=tutors-app.ru
```

### Django
Basic django settings. Ensure that you have set DEBUG = False and truly private SECRET_KEY.
```ini
DJANGO_SETTINGS_MODULE=backend_project.settings
SECRET_KEY=<SECRET_KEY>
ALLOWED_HOSTS=localhost 127.0.0.1 tutors-app.ru www.tutors-app.ru
DEBUG=False
```

### PostgreSQL
This section contains PostgreSQL database settings which will be used to connect with the DMBS.
```ini
POSTGRES_USER=<POSTGRES_USER>
POSTGRES_PASSWORD=<POSTGRES_PASSWORD>
POSTGRES_DB=<POSTGRES_DB>
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
```

### VK App
This settings will be used to authenticate user of VK Apps client and to interact with VK API. You can copy it from your VK App settings page -> [VK applications management](https://vk.com/apps?act=manage).
```ini
VK_APP_ACCESS_TOKEN=VK_APP_ACCESS_TOKEN
VK_APP_SECRET=VK_APP_SECRET
VK_APP_ID=VK_APP_ID
```

### Google reCAPTCHA
This section will be used to interact with [Google reCAPTCHA](https://www.google.com/recaptcha/intro/v3.html). Copy your secret key from Google here.
```ini
DRF_RECAPTCHA_SECRET_KEY=<DRF_RECAPTCHA_SECRET_KEY>
```

### Redis
Settings to interact with Redis message broker. 
```ini
REDIS_HOST=localhost
REDIS_PORT=6379
```