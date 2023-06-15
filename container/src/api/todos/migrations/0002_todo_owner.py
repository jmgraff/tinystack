# Generated by Django 4.2.2 on 2023-06-14 00:37

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("todos", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="todo",
            name="owner",
            field=models.ForeignKey(
                default=None, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL
            ),
            preserve_default=False,
        ),
    ]