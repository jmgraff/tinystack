from django.contrib.auth.models import User
from ninja import Schema, ModelSchema


class UserSchema(ModelSchema):
    class Config:
        model = User
        model_fields = ["id", "username", "is_staff"]


class LoginSchema(Schema):
    username: str
    password: str
