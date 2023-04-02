from django.db import models
from django.utils import timezone 

import uuid

from apps.hobbies.models import Hobby


class Link(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    hobby = models.ForeignKey(Hobby, on_delete=models.CASCADE,
            related_name='links')
    created_on = models.DateTimeField(default=timezone.now)
    expires_on = models.DateTimeField()

    def __str__(self):
        return f'{self.hobby.name} - {self.id}'
