from django.urls import path, include

from rest_framework.routers import DefaultRouter

from vk_apps_users.views import VkAppsUsersViewSet, GetVkAppsUserByUserIdView

router = DefaultRouter()
router.register(r'', VkAppsUsersViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('by_user_id/<int:user_id>/', GetVkAppsUserByUserIdView.as_view())
]
