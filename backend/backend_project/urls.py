from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from django.views import generic

from rest_framework.documentation import include_docs_urls

from rest_framework_simplejwt.views import TokenObtainPairView, \
    TokenRefreshView

from backend_project.settings import DEBUG, MEDIA_URL, MEDIA_ROOT

api_urlpatterns = [
    path('', include_docs_urls(title='Tutors App API Documentation')),
    path('users/', include('users.urls')),
    path('vk_apps_users/', include('vk_apps_users.urls')),
    path('vacancies/', include('vacancies.urls')),
    path('notifications/', include('notifications.urls')),
    path('tutors/', include('tutors.urls')),
    path('lessons/', include('lessons.urls')),

    path('token/', TokenObtainPairView.as_view()),
    path('token/obtain/', TokenRefreshView.as_view()),
]

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
    path('api/', include(api_urlpatterns)),
    path('i18n/', include('django.conf.urls.i18n')),
]

if DEBUG:
    urlpatterns += static(MEDIA_URL, document_root=MEDIA_ROOT)
