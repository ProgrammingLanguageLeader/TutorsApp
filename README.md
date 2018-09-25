# Tutor App
Приложение для удобного взаимодействия репетиторов и учеников

## Установка
```bash
git clone https://github.com/ProgrammingLanguageLeader/TutorsApp
cd TutorsApp
```

### frontend
Требуется установка Node.js
```bash
cd frontend
npm install
```

### backend
Требуется установка Python версии 3.5 или более свежей

#### Создание виртуального окружения и его активация
##### Windows
```bash
cd backend
virtualenv venv # или virtualenv -p python3 venv
venv\Scripts\activate
```

##### Linux
```bash
cd backend
virtualenv -p python3 venv
source venv/bin/activate
```

##### Установка зависимостей
Действия выполняются после активации виртуального окружения
```bash
pip install -r requirements.txt
```

## Запуск

### frontend
```bash
cd frontend
npm start
```

### backend
Действия выполняются после активации виртуального окружения
```bash
cd backend
python manage.py runserver
```

## Развертка фронтэнда
Для того, чтобы залить приложение VK Apps используем [CodeSandbox](https://codesandbox.io).
Для удобства делаем следующее.
1) Устанавливаем CodeSandbox CLI:
```bash
npm install -g codesandbox
```
2) Идем в папку с фронтэдом
```bash
cd <папка проекта>\frontend # или для Unix-like систем cd <папка проекта>/frontend
```
3) Загружаем приложение в песочницу:
```bash
codesandbox ./
```
Подробнее на этом [сайте](https://codesandbox.io/s/cli)