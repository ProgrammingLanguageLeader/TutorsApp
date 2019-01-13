from django.urls import path, include

from rest_framework.routers import DefaultRouter

from notifications.views import NotificationsViewSet

router = DefaultRouter()
router.register(r'', NotificationsViewSet)

urlpatterns = [
    path('', include(router.urls))
]
