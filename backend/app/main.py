from fastapi import FastAPI
from app.api.routes import router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.include_router(router)

@app.get("/")
async def root():
    return {"message": "Backend running!"}
