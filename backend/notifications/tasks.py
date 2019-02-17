from backend_project.celery import app

from vk_apps_users.vk_api import API


@app.task
def send_vk_notification(user_ids):
    api = API()
    api.notifications.sendMessage(
        user_ids=user_ids,
        message='You have unread notifications'
    )
