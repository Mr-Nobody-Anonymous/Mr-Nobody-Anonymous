# Argus Architecture

## Repository strategy

- Use a GitHub organization named `Argus`.
- Fork these repositories into the `Argus` organization as separate projects:
  - `Shenoy37/ANPR-Facial-Recognition-System`
  - `ahmedshafiq12/License-Plate-Recognition-System`
  - `maheshmb13/Traffic-Management`
  - `Kernic/License_plate_detection_and_image_enhancement`
  - `ageitgey/face_recognition`
  - `deepinsight/insightface`
  - `yogesh43221/SentinelSight_AI_Video_Analytics`
  - `ultralytics/ultralytics`

## Logical system layers

1. **Ingestion**
   - Camera stream adapters (RTSP/CCTV feeds)
   - Frame extraction and buffering
2. **AI pipelines**
   - ANPR: plate detection + OCR
   - Facial recognition: face detection + embedding + match
   - Movement analytics: object/person tracking and trajectory
3. **Integration API**
   - FastAPI service receives normalized detection events
   - Persists events to PostgreSQL + PostGIS
4. **Storage and analytics**
   - Camera metadata with geolocation (lat/lon)
   - Event tables for plate/face/track history
   - Geospatial and temporal queries
5. **Application layer**
   - Alerting for watchlists
   - Route reconstruction across camera network
   - Dashboard and historical analytics

## Canonical event contract

- Input: video-derived detections from upstream model services
- Output: normalized event record with:
  - `event_type`
  - `camera_id`
  - `timestamp`
  - `plate`
  - `face_id`
  - `track_id`
  - `lat`
  - `lon`
  - `confidence`

See `/home/runner/work/Mr-Nobody-Anonymous/Mr-Nobody-Anonymous/argus/interfaces/detection-event.schema.json`.
