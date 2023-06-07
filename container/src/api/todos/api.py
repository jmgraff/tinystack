from typing import List

from django.shortcuts import get_object_or_404
from ninja import Router

from todos.schema import TodoSchema, TodoInSchema, TodoUpdateSchema
from todos.models import Todo

router = Router()

@router.get("", response=List[TodoSchema])
def get_todos(request):
    return Todo.objects.all()

@router.post("")
def post_todo(request, payload: TodoInSchema):
    Todo.objects.create(**payload.dict())

@router.put("{id}/")
def put_todo(request, id: int, payload: TodoUpdateSchema):
    todo = get_object_or_404(Todo, id=id)
    for attr, value in payload.dict().items():
        setattr(todo, attr, value)
    todo.save()

@router.delete("{id}/")
def delete_todo(request, id: int):
    get_object_or_404(Todo, id=id).delete()
