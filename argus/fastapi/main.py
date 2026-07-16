import os
from datetime import datetime
from typing import Any, Literal

import asyncpg
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field


DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://localhost:5432/argus")


class DetectionEvent(BaseModel):
    event_type: Literal["plate_detection", "face_detection", "movement_detection"]
    camera_id: str = Field(min_length=1)
    timestamp: datetime
    plate: str | None = None
    face_id: str | None = None
    track_id: str | None = None
    lat: float = Field(ge=-90, le=90)
    lon: float = Field(ge=-180, le=180)
    confidence: float | None = Field(default=None, ge=0, le=1)
    raw_payload: dict[str, Any] | None = None


app = FastAPI(title="Argus Integration Service")
pool: asyncpg.Pool | None = None


@app.on_event("startup")
async def startup() -> None:
    global pool
    pool = await asyncpg.create_pool(DATABASE_URL)


@app.on_event("shutdown")
async def shutdown() -> None:
    if pool is not None:
        await pool.close()


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/events")
async def ingest_event(event: DetectionEvent) -> dict[str, str]:
    if pool is None:
        raise HTTPException(status_code=503, detail="Database pool not initialized")

    query = """
        INSERT INTO detections (
            event_type, camera_id, timestamp_utc, plate, face_id, track_id,
            confidence, location, raw_payload
        )
        VALUES (
            $1, $2, $3, $4, $5, $6, $7,
            ST_SetSRID(ST_MakePoint($8, $9), 4326)::geography,
            $10
        )
    """
    async with pool.acquire() as connection:
        await connection.execute(
            query,
            event.event_type,
            event.camera_id,
            event.timestamp,
            event.plate,
            event.face_id,
            event.track_id,
            event.confidence,
            event.lon,
            event.lat,
            event.raw_payload,
        )

    return {"status": "stored"}
