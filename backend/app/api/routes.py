from fastapi import APIRouter
from app.schemas import StartRequest, MoveRequest
from app.game_logic import process_move, create_initial_board

router = APIRouter()

@router.get("/ping")
async def ping():
    return {"status": "ok"}

@router.post("/start")
async def start(req: StartRequest):
    # Return a static 4x4 board for now
    board = create_initial_board(4)
    return {"board": board}

@router.post("/move")
async def move(req: MoveRequest):
    updated_board, valid_move = process_move(req.game_id, req.board, req.direction)
    return {"board": updated_board, "valid_move": valid_move}
