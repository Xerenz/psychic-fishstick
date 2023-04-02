from django.db.models import Count, Sum
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Schedule, Poll
from .serializers import ScheduleSerializer, CreateScheduleSerializer, \
SchedulePercentageSerializer, PollSerializer

from apps.hobbies.models import Hobby


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
        
        # Add this user as participant
        hobby = Hobby.objects.get(pk=hobby_id)
        hobby.participants.add(request.user)
        
        return Response(status=status.HTTP_201_CREATED)


@api_view(['GET', ])
def get_or_create_poll(request, *args, **kwargs):
    hobby_id = kwargs.get('hobby_id')
    hobby = Hobby.objects.get(pk=hobby_id)
    num_participants = hobby.number_of_participants

    # If there 1 or less participants then there is no point
    if num_participants <= 1:
        return Response({
            'detail': 'Oops... Seems like no one joined this event'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    
    # Since polls for the hobby exists we are going to fetch that
    polls = Poll.objects.filter(hobby=hobby_id)
    if polls:
        poll_serializer = PollSerializer(polls, many=True)
        return Response(poll_serializer.data)
    
    
    # Since polls do not exist we create new
    queryset = Schedule.objects.filter(hobby=hobby_id)
    time_block_counts = queryset.values('time_block').annotate(
        time_block_count=Count('time_block')
    ).order_by('-time_block_count', 'time_block')

    # Top 4 of time_block_counts
    top_time_block_counts = time_block_counts[:4]

    serializer = SchedulePercentageSerializer(top_time_block_counts,
    many=True, context={'num_participants': num_participants})

    for obj in serializer.data:
        obj['hobby'] = hobby_id

    poll_serializer = PollSerializer(data=serializer.data, many=True)
    if poll_serializer.is_valid(raise_exception=True):
        poll_serializer.save()
        return Response(poll_serializer.data)


@api_view(['GET', ])
def vote(request, *args, **kwargs):
    poll_id = kwargs.get('poll_id')
    hobby_id = kwargs.get('hobby_id')
    poll = Poll.objects.get(pk=poll_id)

    check_queryset = Poll.objects.filter(users__id=request.user.id, 
                                hobby=hobby_id)

    if check_queryset:
        return Response({
            'detail': 'Your vote has already been submitted'
        }, status=status.HTTP_400_BAD_REQUEST)

    # Increment vote
    poll.votes = poll.votes + 1
    poll.users.add(request.user)
    poll.save()

    max_vote_polls = Poll.objects.filter(hobby=hobby_id) \
                    .order_by('-votes')
    total_votes = max_vote_polls.aggregate(total_votes=Sum('votes'))
    print(total_votes)

    # Check for top
    max_vote_poll = max_vote_polls[:1].get()
    hobby = Hobby.objects.get(pk=hobby_id)
    if (max_vote_poll.votes / hobby.number_of_participants) > 0.5:
        hobby.final_date_time = max_vote_poll.time_block
        hobby.save()

    # Check if all users have casted their vote
    if total_votes['total_votes'] == hobby.num_participants:
        # Check for top 2
        max_vote_polls_2 = max_vote_polls[:2]
        if (max_vote_polls_2[0].votes / hobby.number_of_participants) == \
        (max_vote_polls_2[1].votes / hobby.number_of_participants):
            hobby.final_date_time = max_vote_poll_2[0].time_block
            hobby.save()
        else:
            # Select the max voted time
            hobby.final_date_time = max_vote_poll.time_block
            hobby.save()

    return Response(status=status.HTTP_202_ACCEPTED)


@api_view(['GET', ])
def finish(request, *args, **kwargs):
    hobby_id = kwargs.get('hobby_id')
    hobby = Hobby.objects.get(pk=hobby_id)

    if request.user != hobby.creator:
        return Response({
            'detail': 'Only creator can finish the event'
        }, status=status.HTTP_400_BAD_REQUEST)

    max_vote_poll = Poll.objects.filter(hobby=hobby_id) \
    .order_by('-votes')[:1].get()

    print(max_vote_poll.time_block)

    hobby.final_date_time = max_vote_poll.time_block
    hobby.save()

    return Response(status=status.HTTP_202_ACCEPTED)
