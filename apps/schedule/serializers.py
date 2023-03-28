from rest_framework import serializers

from .models import Schedule

from apps.users.serializers import ScheduleUserSerializer


class ScheduleSerializer(serializers.ModelSerializer):
    user = ScheduleUserSerializer(read_only=True)

    class Meta:
        model = Schedule
        fields = ['id', 'user', 'time_block', ]
