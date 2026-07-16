CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TABLE IF NOT EXISTS cameras (
    camera_id TEXT PRIMARY KEY,
    name TEXT,
    location GEOGRAPHY(POINT, 4326) NOT NULL
);

CREATE TABLE IF NOT EXISTS detections (
    id BIGSERIAL PRIMARY KEY,
    event_type TEXT NOT NULL CHECK (event_type IN ('plate_detection', 'face_detection', 'movement_detection')),
    camera_id TEXT NOT NULL REFERENCES cameras(camera_id),
    timestamp_utc TIMESTAMPTZ NOT NULL,
    plate TEXT,
    face_id TEXT,
    track_id TEXT,
    confidence DOUBLE PRECISION,
    location GEOGRAPHY(POINT, 4326) NOT NULL,
    raw_payload JSONB
);

CREATE INDEX IF NOT EXISTS idx_detections_timestamp ON detections(timestamp_utc);
CREATE INDEX IF NOT EXISTS idx_detections_camera ON detections(camera_id);
CREATE INDEX IF NOT EXISTS idx_detections_plate ON detections(plate) WHERE plate IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_detections_face ON detections(face_id) WHERE face_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_detections_location ON detections USING GIST(location);
