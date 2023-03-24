from django.db import models
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
    
    def __str__(self):
        return self.name
