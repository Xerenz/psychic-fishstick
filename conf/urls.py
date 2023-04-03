from django.contrib import admin
from django.urls import path, re_path, include
from django.views.generic import TemplateView

urlpatterns = [
    path('api/users/', include('apps.users.urls')),
    path('api/hobbies/', include('apps.hobbies.urls')),
    path('api/links/', include('apps.links.urls')),
    path('api/schedule/', include('apps.schedule.urls')),
    path('admin/', admin.site.urls),
    path('', TemplateView.as_view(template_name='index.html')),
]
