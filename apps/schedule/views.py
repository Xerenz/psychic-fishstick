from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Schedule
from .serializers import ScheduleSerializer, CreateScheduleSerializer


@api_view(['GET', ])
def fetch_my_schedule(request, *args, **kwargs):
    user_id = request.user.id
    hobby_id = kwargs.get('hobby_id')
    queryset = Schedule.objects.filter(
        user=user_id, hobby=hobby_id 
    )
    serializer = ScheduleSerializer(queryset, many=True)

    return Response(serializer.data)


@api_view(['GET', ])
def fetch_group_schedule(request, *args, **kwargs):
    hobby_id = kwargs.get('hobby_id')
    queryset = Schedule.objects.filter(hobby=hobby_id) \
                .exclude(user=request.user.id)

    serializer = ScheduleSerializer(queryset, many=True)

    return Response(serializer.data)


@api_view(['POST', ])
def create_schedule(request, *args, **kwargs):
    # First drop all objects for user and hobby
    hobby_id = kwargs.get('hobby_id')
    Schedule.objects.filter(
        user=request.user.id,
        hobby=hobby_id
    ).delete()

    # Then recreate objects
    for obj in request.data:
        obj.update({
            'user': request.user.id,
            'hobby': hobby_id
        })

    serializer = CreateScheduleSerializer(
        data=request.data, many=True
    )

    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response(status=status.HTTP_201_CREATED)

