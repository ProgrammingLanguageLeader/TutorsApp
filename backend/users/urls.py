from django.urls import path, include

# from users.views import CreateUserView, UpdateUserView, GetUserView, \
#     DeactivateUserView, DeleteUserView
from rest_framework.routers import DefaultRouter

from users.views import UsersViewSet

router = DefaultRouter()
router.register(r'', UsersViewSet)

urlpatterns = [
    path('', include(router.urls))
]

# urlpatterns = [
#     path(
#         'create/',
#         CreateUserView.as_view(),
#         name='users-create'
#     ),
#     path(
#         'update/',
#         UpdateUserView.as_view(),
#         name='users-update'
#     ),
#     path(
#         'get/',
#         GetUserView.as_view(),
#         name='users-get'
#     ),
#     path(
#         'deactivate/',
#         DeactivateUserView.as_view(),
#         name='users-deactivate'
#     ),
#     path(
#         'delete/',
#         DeleteUserView.as_view(),
#         name='users-delete'
#     ),
# ]
