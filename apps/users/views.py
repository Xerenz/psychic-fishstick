from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes 
from rest_framework.authtoken.models import Token 
from rest_framework.response import Response
from rest_framework import status


@api_view(['POST', ])
def register(request):
    first_name = request.data.get('first_name')
    last_name = request.data.get('last_name')
    email = request.data.get('email')
    password = request.data.get('password')

    user = User.objects.create_user(first_name=first_name, 
    last_name=last_name, email=email, username=email)
    user.set_password(password)

    user.save()

    token, _ = Token.objects.get_or_create(user=user)

    return Response({
        'access_token': token.key
    }, status=status.HTTP_200_OK)


@api_view(['POST', ])
def login(request):
    return 'test'

