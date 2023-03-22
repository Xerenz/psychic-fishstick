from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import SimpleRouter

from . import views


router = SimpleRouter()
router.register('', views.HobbyViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
