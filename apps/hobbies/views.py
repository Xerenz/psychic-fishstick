from rest_framework import viewsets
from rest_framework.response import Response

from .models import Hobby
from .serializers import HobbyCreateSerializer, HobbyListSerializer, \
    HobbyRetrieveSerializer


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
