# LPR API (image → vehicle bbox + plate bbox + plate text + color)

This is a **ready-to-start FastAPI** project for:
- **Vehicle bounding box** (generic detector)
- **License plate bounding box** (model if available; otherwise a heuristic fallback)
- **Plate OCR** (Arabic-capable OCR with normalization)
- **Vehicle color** (simple heuristic classifier)

It’s structured so you can later drop in a **GCC fine-tuned plate detector** weight file without changing the API.

## Requirements
- Python 3.10+ recommended
- Linux (works best)

## Setup

```bash
cd /workspace/lpr_api
python -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
```

## Run

```bash
cd /workspace/lpr_api
source .venv/bin/activate
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

Health check:
```bash
curl -s http://localhost:8000/health
```

## Test with Postman
- Method: **POST**
- URL: `http://localhost:8000/analyze`
- Body: **form-data**
  - Key: `file` (type **File**) → select your image (jpg/png)

## Response fields (summary)
- `vehicle.bbox_xyxy`: `[x1,y1,x2,y2]` in image pixels
- `plate.bbox_xyxy`: `[x1,y1,x2,y2]` in image pixels (best-effort if no plate model)
- `plate.text`: normalized plate text (Arabic digits converted to Western digits)
- `attributes.color`: a simple color label

## Models / weights
### Vehicle detection
By default, the API uses Ultralytics `yolov8n.pt` (downloaded automatically on first run).

You can override with an env var:
```bash
export VEHICLE_MODEL="yolov8n.pt"
```

### Plate detection (recommended)
If you have a plate detector weight file, put it here:
- `lpr_api/weights/plate.pt`

Or set:
```bash
export PLATE_MODEL="/absolute/path/to/plate.pt"
```

If no `plate.pt` exists, the API will fall back to a simple contour-based heuristic (works sometimes, not production-grade).

## Notes for GCC accuracy
To make this accurate for GCC, the biggest win is to **fine-tune the plate detector** on GCC plate bounding boxes and replace `weights/plate.pt`.
