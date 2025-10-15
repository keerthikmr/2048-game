from fastapi import APIRouter
from app.schemas import StartRequest, MoveRequest

router = APIRouter()

@router.get("/ping")
async def ping():
    return {"status": "ok"}

# get from game logic after creation
@router.post("/start")
async def start(req: StartRequest):
    return {"board"}

@router.post("/move")
async def move(req: MoveRequest):
    board = req.board
    return {"board"}
