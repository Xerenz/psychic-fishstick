from rest_framework import serializers

from .models import Hobby

from apps.users.serializers import HobbyUserSerializer


class HobbyCreateSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = Hobby
        fields = ['id', 'creator', 'name', 'activity', 
        'duration', 'location', 'max_number_of_participants', ]


class HobbyListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hobby
        fields = ['id', 'name', 'duration', 'location',
        'max_number_of_participants', 'number_of_participants', ]


class HobbyRetrieveSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    participants = HobbyUserSerializer(many=True)

    class Meta:
        model = Hobby
        fields = ['id', 'name', 'activity', 'duration', 'location', 
        'max_number_of_participants', 'participants', 
        'number_of_participants', ]
