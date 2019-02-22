from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from django.views import generic

from rest_framework_swagger.views import get_swagger_view

from rest_framework_simplejwt.views import TokenObtainPairView, \
    TokenRefreshView

from backend_project.settings import DEBUG, MEDIA_URL, MEDIA_ROOT

api_urlpatterns = [
    path('users/', include('users.urls')),
    path('vk_apps_users/', include('vk_apps_users.urls')),
    path('vacancies/', include('vacancies.urls')),
    path('notifications/', include('notifications.urls')),
    path('tutors/', include('tutors.urls')),
    path('lessons/', include('lessons.urls')),

    path('token/', TokenObtainPairView.as_view()),
    path('token/obtain/', TokenRefreshView.as_view()),
]

swagger_schema_view = get_swagger_view(
    title='Tutors app API',
    patterns=api_urlpatterns,
    url='/api/'
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('rest-auth/', include('rest_framework.urls')),
    path(
        '',
        generic.RedirectView.as_view(
            url='/api/',
            permanent=False
        ),
    ),
    path('api/', swagger_schema_view),
    path('api/', include(api_urlpatterns)),
    path('i18n/', include('django.conf.urls.i18n')),
]

if DEBUG:
    urlpatterns += static(MEDIA_URL, document_root=MEDIA_ROOT)
