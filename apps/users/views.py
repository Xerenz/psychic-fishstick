from django.contrib.auth.models import User
from django.contrib.auth import authenticate 
from rest_framework.decorators import api_view, permission_classes 
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token 
from rest_framework.response import Response
from rest_framework import status


@api_view(['POST', ])
@permission_classes([AllowAny, ])
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
@permission_classes([AllowAny, ])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if email is None or password is None:
        return Response({
            'detail': 'Please provide both username and password'
        }, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(username=email, password=password)
    if not user:
        return Response({
            'detail': 'Invalid credentials'
        }, status=status.HTTP_400_BAD_REQUEST)

    token, _ = Token.objects.get_or_create(user=user)

    return Response({
        'access_token': token.key
    }, status=status.HTTP_200_OK)


@api_view(['GET', ])
def logout(request):
    token = request.user.auth_token
    token.delete()
    return Response({
        'detail': 'See ya later!'
    }, status=status.HTTP_200_OK)
