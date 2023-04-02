from django.contrib import admin
from django.urls import path
from . import views


urlpatterns = [
    path('<uuid:hobby_id>/my', views.fetch_my_schedule),
    path('<uuid:hobby_id>/group', views.fetch_group_schedule),
    path('<uuid:hobby_id>/create', views.create_schedule),
    path('<uuid:hobby_id>/poll', views.get_or_create_poll),
    path('<uuid:hobby_id>/finish', views.finish),
    path('poll/<int:poll_id>/vote', views.vote),
]
