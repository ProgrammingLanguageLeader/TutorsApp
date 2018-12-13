# Tutors App
Приложение для удобного взаимодействия репетиторов и учеников на базе VK Apps.

## Установка без Docker

### frontend
Требуется установка Node.js и NPM для данного модуля. 
Для установки зависимостей используется следующая команда:
```bash
npm install
```

### backend
Требуется установка Python версии 3.5 или более свежей, а также pipenv.
Для установки зависимостей и настройке виртуального окружения используется следующая команда:
```bash
pipenv install
```

## Запуск без Docker

### frontend
```bash
npm start
```

### backend
```bash
pipenv shell
python manage.py migrate
python manage.py runserver
```
