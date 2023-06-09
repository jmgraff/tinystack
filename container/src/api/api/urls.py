"""
URL configuration for api project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from ninja import NinjaAPI
from ninja.security import django_auth

from users.api import router as users_router
from todos.api import router as todos_router
from eventstest.api import router as eventstest_router

api = NinjaAPI(csrf=True, auth=django_auth)
api.add_router("/users/", users_router)
api.add_router("/todos/", todos_router)
api.add_router("/eventstest/", eventstest_router)

urlpatterns = [
    path(
        "api/",
        include(
            [
                path("admin/", admin.site.urls),
                path("", api.urls),
            ]
        ),
    )
]
