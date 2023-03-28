from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Schedule
from .serializers import ScheduleSerializer


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
