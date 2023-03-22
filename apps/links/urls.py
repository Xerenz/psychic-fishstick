from django.contrib import admin
from django.urls import path
from . import views


urlpatterns = [
    path('create', views.create_link),
    path('verify', views.verify_link),
]
