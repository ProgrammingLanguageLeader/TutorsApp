from django.urls import path, include

from rest_framework.routers import DefaultRouter

from vk_apps_users.views import VkAppsUsersViewSet

router = DefaultRouter()
router.register(r'', VkAppsUsersViewSet)

urlpatterns = [
    path('', include(router.urls))
]
