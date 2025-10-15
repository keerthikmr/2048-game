from pydantic import BaseModel
from typing import List

class StartRequest(BaseModel):
    size: int

class MoveRequest(BaseModel):
    game_id: str | None = None
    direction: str
    board: List[List[int]]
