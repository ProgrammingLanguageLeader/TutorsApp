from django.contrib import admin
from django.urls import path, include
from django.views import generic

from backend.urls import urlpatterns as backend_urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path(
        'api/',
        generic.RedirectView.as_view(
            url='/api/v1/',
            permanent=False
        )
    ),
    path('api/v1/', include(backend_urls)),
]
