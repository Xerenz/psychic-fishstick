from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Link

from apps.hobbies.models import Hobby


@api_view(['POST', ])
def create_link(request):
    hobby_id = request.data['hobby']
    expires_on = request.data['expires_on']

    hobby = get_object_or_404(Hobby, pk=hobby_id)

    link = Link.objects.create(hobby=hobby, expires_on=expires_on)
    link.save()
    
    return Response({
        'id': link.id,
        'created_on': link.created_on,
        'expires_on': link.expires_on
    })


@api_view(['POST', ])
def verify_link(request):
    link_id = request.data['link_id']
    link = get_object_or_404(Link, pk=link_id)
    
    if link.expires_on < timezone.now():
        return Response({
            'detail': 'Oops... the link has expired!'
        }, status.HTTP_400_BAD_REQUEST)
    
    total_participants = link.hobby.participants.all().count()
    max_participants = link.hobby.max_number_of_participants
    
    if total_participants == max_participants:
        return Response({
            'detail': 'Seems like there is no space left for you, sorry.'
        }, status.HTTP_400_BAD_REQUEST)

    return Response({
        'valid': True,
        'hobby': link.hobby.id
    })
