import json
from typing import Mapping, List

from databases import Database

from db import database
from models import InsertNote, Note, NoteNotFound, UpdateNote


class BaseRepository:
    def __init__(self, db: Database):
        self.database = db


def _row_to_note(row: Mapping) -> Note:
    return Note(id=row["id"], content=row["content"], tags=json.loads(row["tags"]))


class NoteRepository(BaseRepository):

    async def insert(self, model: InsertNote) -> int:
        return await self.database.execute("insert into notes(content, tags) "
                                           "values (:content, :tags) returning id",
                                           {"content": model.content, "tags": json.dumps(model.tags)})

    async def select(self, id_: int) -> Note:
        row = await self.database.fetch_one("select * from notes where id = :id", {"id": id_})
        if row is None:
            raise NoteNotFound(id_, f"Note with ID {id_} not found")
        else:
            return _row_to_note(row)

    async def select_all(self) -> List[Note]:
        rows = await self.database.fetch_all("select * from notes")
        return [_row_to_note(row) for row in rows]

    async def select_by_tag(self, tag: str) -> List[Note]:
        rows = await self.database.fetch_all(
            "select * from notes, json_array_elements_text(tags) as tag where tag = :tag", {"tag": tag})
        return [_row_to_note(row) for row in rows]

    async def select_all_tags(self) -> List[str]:
        rows = await self.database.fetch_all("select distinct json_array_elements_text(tags) as tag from notes")
        return [str(row["tag"]) for row in rows]

    async def update(self, id_: int, model: UpdateNote) -> Note:
        await self.database.execute("update notes set content = :content, tags = :tags where id = :id",
                                    {"id": id_, "content": model.content, "tags": json.dumps(model.tags)})
        return await self.select(id_)

    async def delete(self, id_: int):
        await self.database.execute("delete from notes where id = :id", {"id": id_})

    async def delete_all(self):
        await self.database.execute("delete from notes")


note_repository = NoteRepository(database)
