from django.db import models
from django.contrib.auth.models import User


class Todo(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.CharField(max_length=128)
    done = models.BooleanField(default=False)
