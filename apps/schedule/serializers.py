from rest_framework import serializers

from .models import Schedule, Poll

from apps.users.serializers import ScheduleUserSerializer


class ScheduleSerializer(serializers.ModelSerializer):
    user = ScheduleUserSerializer(read_only=True)

    class Meta:
        model = Schedule
        fields = ['id', 'user', 'time_block', ]


class CreateScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = '__all__'


class SchedulePercentageSerializer(serializers.Serializer):
    time_block = serializers.DateTimeField()
    time_block_count = serializers.IntegerField()
    prev_votes_ratio = serializers.SerializerMethodField(
        '_time_block_choice_ratio'
    )

    def _time_block_choice_ratio(self, obj):
        num_participants = self.context['num_participants']
        return obj['time_block_count'] / num_participants


class PollSerializer(serializers.ModelSerializer):
    users = ScheduleUserSerializer(read_only=True, many=True)
    
    class Meta:
        model = Poll
        fields = '__all__'
