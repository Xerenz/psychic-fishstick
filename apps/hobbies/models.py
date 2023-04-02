from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator

import uuid


class Hobby(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    creator = models.ForeignKey(User, 
                related_name='created_hobbies', 
                on_delete=models.CASCADE)
    name = models.CharField(max_length=254)
    activity = models.CharField(max_length=254)
    duration = models.DurationField()
    location = models.CharField(max_length=254)
    max_number_of_participants = models.PositiveIntegerField(
        default=1,
        validators=[
            MinValueValidator(2),
            MaxValueValidator(30),
        ]
    )
    participants = models.ManyToManyField(User, 
                    related_name='my_hobbies')
    
    RECURRENCE_CHOICES = [
        (0, 'one time'),
        (1, 'daily'),
        (2, 'weekly'),
        (3, 'monthly'),
    ]
    recurrence = models.IntegerField(default=0, 
                    choices=RECURRENCE_CHOICES)

    final_date_time = models.DateTimeField(null=True)
    
    created_on = models.DateTimeField(default=timezone.now)

    @property
    def number_of_participants(self):
        return self.participants.count()
    
    def __str__(self):
        return self.name
