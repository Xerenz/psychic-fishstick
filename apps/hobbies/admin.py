from django.contrib import admin
from .models import Hobby


class HobbyAdmin(admin.ModelAdmin):
    filter_horizontal = ['participants', ]


admin.site.register(Hobby, HobbyAdmin)
