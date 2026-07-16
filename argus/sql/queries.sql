-- Find whether a specific plate passed camera A and camera B within 5 minutes.
WITH a_hits AS (
    SELECT timestamp_utc
    FROM detections
    WHERE plate = $1
      AND camera_id = $2
      AND event_type = 'plate_detection'
),
b_hits AS (
    SELECT timestamp_utc
    FROM detections
    WHERE plate = $1
      AND camera_id = $3
      AND event_type = 'plate_detection'
)
SELECT a.timestamp_utc AS camera_a_time,
       b.timestamp_utc AS camera_b_time,
       EXTRACT(EPOCH FROM (b.timestamp_utc - a.timestamp_utc)) AS seconds_between
FROM a_hits a
JOIN b_hits b
  ON b.timestamp_utc >= a.timestamp_utc
 AND b.timestamp_utc <= a.timestamp_utc + INTERVAL '5 minutes'
ORDER BY a.timestamp_utc, b.timestamp_utc;

-- Build route trail by plate over a time window.
SELECT plate,
       camera_id,
       timestamp_utc,
       ST_Y(location::geometry) AS lat,
       ST_X(location::geometry) AS lon
FROM detections
WHERE plate = $1
  AND event_type = 'plate_detection'
  AND timestamp_utc BETWEEN $2 AND $3
ORDER BY timestamp_utc;

-- Face watchlist proximity: events for matched face within a radius of a point.
SELECT id,
       face_id,
       camera_id,
       timestamp_utc,
       ST_Distance(
           location,
           ST_SetSRID(ST_MakePoint($2, $3), 4326)::geography
       ) AS distance_meters
FROM detections
WHERE face_id = $1
  AND event_type = 'face_detection'
  AND ST_DWithin(
      location,
      ST_SetSRID(ST_MakePoint($2, $3), 4326)::geography,
      $4
  )
ORDER BY timestamp_utc DESC;
