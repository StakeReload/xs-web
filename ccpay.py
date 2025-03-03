# Python FastAPI
import hashlib
import hmac
import json
import binascii
from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
from fastapi.responses import PlainTextResponse
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

app = FastAPI()

def verify_signature(content: str, signature: str, app_id: str, app_secret: str, timestamp: str):
    if content == '':
        sign_text = f"{app_id}{timestamp}"
    else:
        sign_text = f"{app_id}{timestamp}{content}"
    h = hmac.new(app_secret.encode('utf-8'), sign_text.encode('utf-8'), hashlib.sha256)
    server_sign = binascii.hexlify(h.digest()).decode('utf-8')
    if signature == server_sign:
        return True
    else:
        return False

@app.post("/webhook", response_class=PlainTextResponse)
async def process_webhook(request: Request):
    body = await request.body()
    content = body.decode('utf-8')
    signature = request.headers.get('X-Signature')
    app_id = os.getenv('APP_ID')
    app_secret = os.getenv('APP_SECRET')
    timestamp = request.headers.get('X-Timestamp')

    if not verify_signature(content, signature, app_id, app_secret, timestamp):
        raise HTTPException(status_code=400, detail="Invalid signature")

    # Process the webhook content
    return "Webhook received"