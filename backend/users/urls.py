from django.urls import path

from users.views import RegisterUserView, UpdateUserView, GetUserView, \
    DeactivateUserView, DeleteUserView

urlpatterns = [
    path(
        'register/',
        RegisterUserView.as_view(),
        name='users-register'
    ),
    path(
        'update/',
        UpdateUserView.as_view(),
        name='users-update'
    ),
    path(
        'get/',
        GetUserView.as_view(),
        name='users-get'
    ),
    path(
        'deactivate/',
        DeactivateUserView.as_view(),
        name='users-deactivate'
    ),
    path(
        'delete/',
        DeleteUserView.as_view(),
        name='users-delete'
    )
]
