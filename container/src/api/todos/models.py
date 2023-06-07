from django.db import models

class Todo(models.Model):
    text = models.CharField(max_length=128)
    done = models.BooleanField(default=False)
