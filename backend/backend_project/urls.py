from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from django.views import generic

from rest_framework.permissions import AllowAny
from rest_framework.schemas import get_schema_view

from backend_project.settings.base import DEBUG
from backend_project.settings.static import MEDIA_URL, MEDIA_ROOT

schema_view = get_schema_view(
    title='Schema',
    permission_classes=[AllowAny]
)

api_urls = [
    path('', schema_view),
    path('users/', include('users.urls')),
    path('vk_apps_users/', include('vk_apps_users.urls')),
    path('vacancies/', include('vacancies.urls')),
    path('notifications/', include('notifications.urls')),
]

urlpatterns = [
    path('admin/', admin.site.urls),
    path(
        'api/',
        generic.RedirectView.as_view(
            url='/api/v1/',
            permanent=False
        ),
    ),
    path('api/v1/', include(api_urls)),
    path('rest-auth/', include('rest_framework.urls'))
]

if DEBUG:
    urlpatterns += static(MEDIA_URL, document_root=MEDIA_ROOT)
