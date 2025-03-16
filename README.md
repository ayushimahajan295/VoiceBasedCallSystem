# Voice Patient AI System

This project is a **voice-enabled AI system** that processes patient requests using speech-to-text, translation, intent classification, and text-to-speech. The backend is built using **FastAPI** and integrates **MongoDB** for storing interactions.

## Features
1. **Speech-to-Text:** Converts voice into text  
2. **Translation:** Supports multiple languages (default: Hindi to English)  
3. **Intent Classification:** Identifies the patient's request type  
4. **Text-to-Speech:** Reads the response aloud  

## Tech Stack
### **Backend**
- FastAPI
- MongoDB
- Google Translate API
- Transformers (NLP)
- gTTS (Text-to-Speech)

### **Frontend**
- React Native (Expo)
- Axios (API Calls)

### **1. Install Backend Dependencies**
```sh
cd backend
python -m venv venv   
venv\Scripts\activate 
pip install -r requirements.txt
```
### **2. Start MongoDB**
```sh
mongod --dbpath "D:\data\db"
```
### **3. Run Backend**
```sh
uvicorn main:app --reload
```
### **4. Install Frontend Dependencies**
```sh
cd frontend
npm install
```
### **5. Start Frontend**
```sh
npx expo start
```
