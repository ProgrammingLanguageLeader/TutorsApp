from django.urls import path, include, re_path

from rest_framework.routers import DefaultRouter

from vk_apps_users.views import VkAppsUsersViewSet, GetVkAppsUserByUserIdView

router = DefaultRouter()
router.register(r'', VkAppsUsersViewSet)

urlpatterns = [
    path('', include(router.urls)),
    re_path(
        '^by_user_id/(?P<user_id>[^/.]+)/$',
        GetVkAppsUserByUserIdView.as_view()
    ),
]
