from typing import List

from django.shortcuts import get_object_or_404
from ninja import Router

from todos.schema import TodoSchema, TodoInSchema, TodoUpdateSchema
from todos.models import Todo

router = Router()

def get_todo(request, id):
    if request.user.is_staff:
        return get_object_or_404(Todo, id=id)
    return get_object_or_404(Todo.objects.filter(owner=request.user), id=id)

@router.get("", response=list[TodoSchema])
def get_todos(request):
    if request.user.is_staff:
        return Todo.objects.all()
    return Todo.objects.filter(owner=request.user)


@router.post("")
def post_todo(request, payload: TodoInSchema):
    Todo.objects.create(**payload.dict(), owner=request.user)


@router.put("{id}/")
def put_todo(request, id: int, payload: TodoUpdateSchema):
    todo = get_todo(request, id)
    for attr, value in payload.dict().items():
        setattr(todo, attr, value)
    todo.save()


@router.delete("{id}/")
def delete_todo(request, id: int):
    get_todo(request, id).delete()
