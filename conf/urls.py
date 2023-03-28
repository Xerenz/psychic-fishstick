from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    # path('', include('social_django.urls', namespace='social')),
    path('api/users/', include('apps.users.urls')),
    path('api/hobbies/', include('apps.hobbies.urls')),
    path('api/links/', include('apps.links.urls')),
    path('api/schedule/', include('apps.schedule.urls')),
    path('admin/', admin.site.urls),
]
