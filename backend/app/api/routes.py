from fastapi import APIRouter
from app.schemas import StartRequest, MoveRequest
from app.game_logic import process_move

router = APIRouter()

@router.get("/ping")
async def ping():
    return {"status": "ok"}

# get from game logic after creation
@router.post("/start")
async def start(req: StartRequest):
    # Return a static 4x4 board for now
    board = [
        [2, 0, 0, 2],
        [0, 4, 0, 0],
        [0, 0, 8, 0],
        [2, 0, 0, 4],
    ]
    return {"board": board}


@router.post("/move")
async def move(req: MoveRequest):
    updated_board, valid_move = process_move(req.game_id, req.board, req.direction)
    return {"board": updated_board, "valid_move": valid_move}
