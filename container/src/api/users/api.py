from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import ensure_csrf_cookie
from django.middleware import csrf

from ninja import Router
from ninja.security import django_auth

from users.schema import UserSchema, LoginSchema

router = Router()

LOGIN_BACKEND = "django.contrib.auth.backends.ModelBackend"


@router.get("csrf/", auth=None)
def session(request):
    csrf.get_token(request)


@router.get("me/", response=UserSchema)
def me(request):
    return request.user


@router.post("login/", response={200: None, 403: None}, auth=None)
def do_login(request, creds: LoginSchema):
    user = authenticate(request, username=creds.username, password=creds.password)
    if user is not None and user.is_active:
        login(request, user, backend=LOGIN_BACKEND)
    else:
        return 403, None


@router.post("logout/")
def do_logout(request):
    logout(request)
