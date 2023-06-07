from django.contrib.auth import authenticate, login, logout

from ninja import Router
from ninja.security import django_auth

from users.schema import UserSchema, LoginSchema

router = Router()

LOGIN_BACKEND = "django.contrib.auth.backends.ModelBackend"

@router.get("me/", auth=django_auth, response=UserSchema)
def me(request):
    return request.user

@router.post("login/", response={200: None, 403: None})
def do_login(request, creds: LoginSchema):
    user = authenticate(request, username=creds.username, password=creds.password)
    if user is not None and user.is_active:
        login(request, user, backend=LOGIN_BACKEND)
    else:
        return 403, None

@router.post("logout/", auth=django_auth)
def do_logout(request):
    logout(request)
