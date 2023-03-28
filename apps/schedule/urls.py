from django.contrib import admin
from django.urls import path
from . import views


urlpatterns = [
    path('<uuid:hobby_id>/my', views.fetch_my_schedule),
    path('<uuid:hobby_id>/group', views.fetch_group_schedule),
    path('', views.create_schedule),
]
