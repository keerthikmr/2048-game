from fastapi import APIRouter
from app.schemas import StartRequest, MoveRequest
from app.game_logic import process_move, create_initial_board, is_game_over, is_game_won

router = APIRouter()

@router.get("/ping")
async def ping():
    return {"status": "ok"}

@router.post("/start")
async def start(req: StartRequest):
    board = create_initial_board(req.size)
    return {"board": board}

@router.post("/move")
async def move(req: MoveRequest):
    updated_board, valid_move = process_move(req.game_id, req.board, req.direction)
    game_over = is_game_over(updated_board)
    game_won = is_game_won(updated_board)
    return {
        "board": updated_board,
        "valid_move": valid_move,
        "game_over": game_over,
        "game_won": game_won,
    }
