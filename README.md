# Tutors App
Приложение для удобного взаимодействия репетиторов и учеников

## Структура
- backend - Django-приложение, отвечающее за взаимодействие с базой данных и 
поставляющее серверный API, с которым взаимодействуют клиентские модули
- frontend (в будущем название может измениться) - модуль, отвечающий за 
клиентское представление приложения в платформе VK Apps

## Настройка проекта
Для конфигурации работы модуля необходимо создать __*.env*__ файл в папке с этим модулем. Наиболее удобен способ создания данного файла в корне проекта и размещение ссылок на него в каждом из модулей. 

Примерное содержание файла __*.env*__:
```
# certbot settings
EMAIL=admin@tutors-app.ru
DOMAINS=tutors-app.ru

# django settings
DJANGO_SETTINGS_MODULE=vktutor.settings
SECRET_KEY=<YOUR_SECRET_KEY>
ALLOWED_HOSTS=localhost tutors-app.ru
# DEBUG=true

# postgres settings
POSTGRES_USER=<POSTGRES USER NAME>
POSTGRES_PASSWORD=<POSTGRES PASSWORD>
POSTGRES_DB=<POSTGRES DATABASE NAME>

# VK app settings
VK_APP_SECRET=<VK application secret key>
VK_APP_ID=<VK application ID>

# react settings
REACT_APP_ID=$VK_APP_ID
# REACT_APP_DEBUG=True
```
Для запуска модуля достаточно указать только необходимые ему переменные.

Установка переменной __*DEBUG*__ приведёт к запуску backend в режиме отладки.

Установка переменной __*REACT_APP_DEBUG*__ приведёт к запуску frontend в режиме отладки, где взаимодействие с сетью будет имитироваться заглушками.

## Развертывание приложения с помощью Docker Compose
Для развертывания всего приложения существуют 2 конфигурации:
    
- docker-compose.yml - отладочная версия, предназначенная для локального запуска. В качестве базы данных используется Sqlite. 
- docker-compose.prod.yml - боевая версия, предназначенная для запуска на сервере. В качестве базы данных используется Postgres.

Для развертывания боевой версии необходимо выполнить следующие команды:
```bash
docker-compose -f docker-compose.prod.yml down -v
docker-compose -f docker-compose.prod.yml up -d
docker-compose -f docker-compose.prod.yml exec tutors-nginx chmod 777 /etc/nginx/ssl/certbot.sh 
docker-compose -f docker-compose.prod.yml exec tutors-nginx /etc/nginx/ssl/certbot.sh -v
```

## Установка и запуск без Docker

### frontend
Требуется установка Node.js и NPM для данного модуля. 

Для установки зависимостей используется следующая команда:
```bash
npm install
```

Для запуска выполнить следующую команду:
```bash
npm start
```

Сборка модуля:
```bash
npm run build
```

В модуле предусмотрена возможность использования Github Pages как хостинга (что весьма полезно при отладке). Для этого необходимо в файле __*package.json*__ назначить свойство __*homepage*__, указав адрес Github Pages, на котором будет размещен модуль. После этого выполнить команду:
```bash
npm run deploy
```

### backend
Требуется установка Python версии 3.5 или более свежей, а также pipenv.

Для установки зависимостей и настройке виртуального окружения используется следующая команда:
```bash
pipenv install
```

После установки необходимо выполнить миграцию базы данных, поэтому перед запуском нужно выполнить цепочку инструкций:
```bash
pipenv shell
python manage.py migrate
python manage.py runserver
```

Для запуска тестов (smoke testing) выполнить команды:
```bash
pipenv shell
python manage.py test
```
