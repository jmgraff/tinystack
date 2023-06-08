from ninja import Schema, ModelSchema

from todos.models import Todo


class TodoSchema(ModelSchema):
    class Config:
        model = Todo
        model_fields = ["id", "text", "done"]


class TodoInSchema(Schema):
    text: str


class TodoUpdateSchema(Schema):
    text: str
    done: bool
