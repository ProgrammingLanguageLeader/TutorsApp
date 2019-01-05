from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from django.views import generic

from rest_framework.schemas import get_schema_view

from backend_project.settings.base import DEBUG
from backend_project.settings.static import MEDIA_URL, MEDIA_ROOT

urlpatterns = [
    path('admin/', admin.site.urls),
    path(
        'api/',
        generic.RedirectView.as_view(
            url='/api/v1/',
            permanent=False
        )
    ),
    path('api/v1/', get_schema_view()),
    path('api/v1/users/', include('users.urls')),
    path('api/v1/vk_apps_users/', include('vk_apps_users.urls')),
    path('rest-auth/', include('rest_framework.urls'))
]

if DEBUG:
    urlpatterns += static(MEDIA_URL, document_root=MEDIA_ROOT)
