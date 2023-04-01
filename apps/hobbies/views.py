from django.core.files.temp import NamedTemporaryFile
from django.http import FileResponse

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
        creator_queryset = self.queryset.filter(creator=request.user.id)
        part_queryset = self.queryset.filter(participants=request.user.id)
        
        queryset = (creator_queryset | part_queryset).distinct()
        serializer = self.get_serializer(queryset, many=True, context={
                                            'user': request.user
                                        })
        
        return Response(serializer.data)

    @action(methods=['GET', ], detail=True)
    def quit(self, request, *args, **kwargs):
        hobby = self.get_object()
        hobby.participants.remove(request.user)

        # Remove the user's schedule
        Schedule.objects.filter(
            user=request.user.id, hobby=hobby.id
        ).delete()

        return Response(status=status.HTTP_202_ACCEPTED)

    @action(methods=['GET', ], detail=True, 
    renderer_classes=[PassthroughRenderer, ])
    def ics(self, request, *args, **kwargs):
        hobby = self.get_object()
        
        if not hobby.final_date_time:
            return Response({
                'detail': 'First finalize the event date'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        ics = ICS(hobby)
        cal = ics.create_ics_cal()

        print(cal)

        f = open('cal.ics', 'wb')
        f.write(cal.to_ical())
        f.close()

        f = open('cal.ics', 'rb')
        response = FileResponse(f)
        response['Content-Length'] = f.tell()
        response['Content-Disposition'] = 'attachment; filename="%s"' % f.name
            
        return response

