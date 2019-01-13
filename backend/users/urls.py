from django.urls import path, include

from rest_framework.routers import DefaultRouter

from users.views import UsersViewSet

router = DefaultRouter()
router.register(r'', UsersViewSet)

urlpatterns = [
    path('', include(router.urls))
]
