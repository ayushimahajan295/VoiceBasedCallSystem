from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
from database import requests_collection
from speech_to_text import process_audio
from translation import translate_text
from intent_classifier import classify_intent
from text_to_speech import generate_speech

app = FastAPI()

# Enable CORS middleware to allow cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins; restrict if needed for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB Connection URI (Only AI/ML Related)
MONGO_URI = "mongodb://localhost:27017"
client = MongoClient(MONGO_URI)
db = client["voice_patient_call_system"]

@app.on_event("startup")
async def startup_db_client():
    """Check MongoDB connection on startup."""
    try:
        client.admin.command('ping')  # Ping MongoDB
        print("✅ Successfully connected to MongoDB")
    except ConnectionFailure:
        print("❌ Failed to connect to MongoDB. Exiting...")
        exit(1)

@app.on_event("shutdown")
async def shutdown_db_client():
    """Close MongoDB connection on shutdown."""
    client.close()
    print("🔌 MongoDB connection closed.")

@app.get("/")
def root():
    """API Root Check"""
    return {"message": "Voice Patient Call System AI/ML API is Running 🚀"}

@app.post("/process_request/")
async def process_request(audio: UploadFile = File(...), language: str = "hi"):
    """Process the patient’s voice request."""
    text = process_audio(await audio.read())  # Convert speech to text
    translated_text = translate_text(text, "en")  # Translate text to English
    intent, urgency = classify_intent(translated_text)  # Classify intent

    request_data = {
        "original_text": text,
        "translated_text": translated_text,
        "intent": intent,
        "urgency": urgency
    }
    request_id = requests_collection.insert_one(request_data).inserted_id  # Store request in DB

    return {
        "request_id": str(request_id),
        "original_text": text,
        "translated_text": translated_text,
        "intent": intent,
        "urgency": urgency
    }

@app.get("/response/{request_id}")
async def get_response(request_id: str):
    """Retrieve the response and generate speech output."""
    request = requests_collection.find_one({"_id": request_id})
    
    if not request:
        return {"error": "Request not found"}
    
    speech = generate_speech(request["translated_text"], request.get("language", "en"))
    return {"response_audio": speech}
