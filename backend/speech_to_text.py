import speech_recognition as sr

def process_audio(audio_data):
    recognizer = sr.Recognizer()
    with sr.AudioFile(audio_data) as source:
        audio = recognizer.record(source)
    return recognizer.recognize_google(audio, language="hi-IN")
