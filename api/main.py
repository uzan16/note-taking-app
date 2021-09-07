from typing import List

import requests
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from starlette.requests import Request
from starlette.responses import JSONResponse
from starlette.status import HTTP_404_NOT_FOUND, HTTP_204_NO_CONTENT

from db import database
from db.repositories import note_repository
from models import NoteNotFound, Note, InsertNote, UpdateNote

app = FastAPI(
    title="Note Taking App Backend",
    description="This is a REST API built to work together with a Note Taking UI App",
    version="1.0.0",
)

origins = ["*"]

app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=True, allow_methods=["*"],
                   allow_headers=["*"])


@app.on_event("startup")
async def startup():
    await database.connect()


@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()


def _error_response(status_code, exc):
    return JSONResponse(
        status_code=status_code,
        content={'message': exc.__str__()})


@app.exception_handler(NoteNotFound)
async def video_not_found_handler(request: Request, exc: NoteNotFound):
    """
    Returns 404 when we can't find a note in our database
    :param request:
    :param exc:
    :return:
    """

    return JSONResponse(
        status_code=HTTP_404_NOT_FOUND,
        content={"message": str(exc), "id": exc.id})


@app.post("/v1/note/funny", response_model=Note)
async def funny_note():
    user_response = requests.get("https://randomuser.me/api/")
    user_json = user_response.json()
    name = user_json["results"][0]["name"]
    fact_response = requests.get("http://api.icndb.com/jokes/random",
                                 params={"firstName": name["first"], "lastName": name["last"]})
    fact_json = fact_response.json()
    return await insert(InsertNote(content=fact_json["value"]["joke"], tags=["funny"]))


@app.post("/v1/note", response_model=Note)
async def insert(model: InsertNote):
    id_ = await note_repository.insert(model)
    return await note_repository.select(id_)


@app.get("/v1/note/{id_}", response_model=Note)
async def get(id_: int):
    return await note_repository.select(id_)


@app.get("/v1/note", response_model=List[Note])
async def get_all():
    return await note_repository.select_all()


@app.get("/v1/note/tag/{tag}", response_model=List[Note])
async def get_by_tag(tag: str):
    return await note_repository.select_by_tag(tag)


@app.get("/v1/tags", response_model=List[str])
async def get_all_tags():
    return await note_repository.select_all_tags()


@app.delete("/v1/note/{id_}", status_code=HTTP_204_NO_CONTENT)
async def delete(id_: int):
    return await note_repository.delete(id_)


@app.delete("/v1/note", status_code=HTTP_204_NO_CONTENT)
async def delete_all():
    return await note_repository.delete_all()


@app.put("/v1/note/{id_}", response_model=Note)
async def update(id_: int, model: UpdateNote):
    return await note_repository.update(id_, model)
