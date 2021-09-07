from typing import List

from pydantic.main import BaseModel


class Note(BaseModel):
    id: int
    content: str
    tags: List[str]


class ModifyNote(BaseModel):
    content: str
    tags: List[str]


class InsertNote(ModifyNote):
    pass


class UpdateNote(ModifyNote):
    pass


class NoteNotFound(LookupError):

    def __init__(self, id_: int, *args: object) -> None:
        super().__init__(*args)
        self.id = id_
