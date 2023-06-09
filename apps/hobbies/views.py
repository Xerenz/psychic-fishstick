from django.core.files.temp import NamedTemporaryFile
from django.http import FileResponse
from django.utils import timezone

from datetime import timedelta

from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action

from .models import Hobby
from .serializers import HobbyCreateSerializer, HobbyListSerializer, \
    HobbyRetrieveSerializer
from .renderers import PassthroughRenderer
from .ics import ICS

from apps.schedule.models import Schedule


class HobbyViewSet(viewsets.ModelViewSet):
    queryset = Hobby.objects.all()
    
    def get_serializer(self, *args, **kwargs):
        if self.action == 'create':
            return HobbyCreateSerializer(*args, **kwargs)
        elif self.action == 'list':
            return HobbyListSerializer(*args, **kwargs)
        else:
            return HobbyRetrieveSerializer(*args, **kwargs)

    def create(self, request, *args, **kwargs):
        data = request.data
        data['creator'] = request.user.id
        
        serializer = self.get_serializer(data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

    def list(self, request, *args, **kwargs):
        creator_queryset = self.queryset.filter(creator=request.user)
        part_queryset = self.queryset.filter(participants=request.user)
        
        queryset = (creator_queryset | part_queryset).distinct()
        serializer = self.get_serializer(queryset, many=True, context={
                                            'user': request.user
                                        })
        
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        hobby = self.get_object()
        serializer = self.get_serializer(hobby)

        if (timezone.now() - hobby.created_on) < timedelta(hours=48):
            return Response(serializer.data)

        data = {
            'timeup': True
        }

        if hobby.final_date_time:
            data['valid_meeting'] = True
            data.update(serializer.data)
            return Response(data)
        
        data['valid_meeting'] = False
        data.update(serializer.data)
        return Response(data)

    @action(methods=['GET', ], detail=True)
    def quit(self, request, *args, **kwargs):
        hobby = self.get_object()
        hobby.participants.remove(request.user)

        # Remove the user's schedule
        Schedule.objects.filter(
            user=request.user.id, hobby=hobby.id
        ).delete()

        return Response(status=status.HTTP_202_ACCEPTED)

    @action(methods=['GET', ], detail=True, )
    def ics(self, request, *args, **kwargs):
        hobby = self.get_object()
        
        if not hobby.final_date_time:
            return Response({
                'detail': 'First finalize the event date'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        ics = ICS(hobby)
        cal = ics.create_ics_cal()

        print(cal.to_ical())
            
        return Response({
            'ics_string': cal.to_ical()
        })

