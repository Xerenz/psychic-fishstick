from django.db import models
from django.contrib.auth.models import User

from apps.hobbies.models import Hobby


class Schedule(models.Model):
    time_block = models.DateTimeField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    hobby = models.ForeignKey(Hobby, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.user.first_name} - {self.hobby.name} - {self.time_block}'


class Poll(models.Model):
    time_block = models.DateTimeField()
    votes = models.IntegerField(default=0)
    hobby = models.ForeignKey(Hobby, on_delete=models.CASCADE)
    prev_votes = models.IntegerField(default=0)
