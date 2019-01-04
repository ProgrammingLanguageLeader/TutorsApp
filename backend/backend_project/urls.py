from django.contrib import admin
from django.urls import path, include
from django.views import generic

# from backend.urls import urlpatterns as backend_urls
from users.urls import urlpatterns as users_urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path(
        'api/',
        generic.RedirectView.as_view(
            url='/api/v1/',
            permanent=False
        )
    ),
    path('api/v1/users/', include(users_urls)),
]
