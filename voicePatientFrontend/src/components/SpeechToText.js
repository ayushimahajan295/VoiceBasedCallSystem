import React, { useState } from "react";
import { View, Button, Text } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import api from "../services/api";

const SpeechToText = ({ onTextGenerated }) => {
    const [processing, setProcessing] = useState(false);

    const pickAudioFile = async () => {
        let result = await DocumentPicker.getDocumentAsync({ type: "audio/*" });

        if (result.canceled) return;

        const formData = new FormData();
        formData.append("audio", {
            uri: result.uri,
            name: result.name,
            type: "audio/mpeg",
        });

        setProcessing(true);
        try {
            const response = await api.post("/process_request/", formData);
            onTextGenerated(response.data);
        } catch (error) {
            console.error("Speech processing error:", error);
        } finally {
            setProcessing(false);
        }
    };

    return (
        <View>
            <Button title="Upload Audio" onPress={pickAudioFile} disabled={processing} />
            {processing && <Text>Processing audio...</Text>}
        </View>
    );
};

export default SpeechToText;
