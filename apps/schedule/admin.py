from django.contrib import admin

from .models import Schedule, Poll


class PollAdmin(admin.ModelAdmin):
    filter_horizontal = ['users', ]


admin.site.register(Schedule)
admin.site.register(Poll, PollAdmin)
