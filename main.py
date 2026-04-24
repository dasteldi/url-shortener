from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from pydantic import BaseModel, HttpUrl
from database import get_db, engine, Base
from models import URL
from config import settings
import random
import string

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class URLRequest(BaseModel):
    url: HttpUrl

def generate_code():
    return ''.join(random.choices(string.ascii_letters + string.digits, k=6))

@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

@app.post("/api/reduce")
async def reduce_url(request: URLRequest, db: AsyncSession = Depends(get_db)):
    code = generate_code()
    
    while True:
        existing = await db.execute(select(URL).where(URL.short_code == code))
        if not existing.scalar_one_or_none():
            break
        code = generate_code()
    
    new_url = URL(original_url=str(request.url), short_code=code)
    db.add(new_url)
    await db.commit()
    
    return {"shortUrl": f"{settings.base_url}/{code}"}

@app.get("/{short_code}")
async def redirect(short_code: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(URL).where(URL.short_code == short_code))
    url_entry = result.scalar_one_or_none()
    
    if not url_entry:
        raise HTTPException(status_code=404, detail="Not found")
    
    return RedirectResponse(url=url_entry.original_url)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
