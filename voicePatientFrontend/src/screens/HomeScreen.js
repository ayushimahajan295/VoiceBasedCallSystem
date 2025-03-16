import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import SpeechToText from "../components/SpeechToText";
import Translation from "../components/Translation";
import IntentClassifier from "../components/IntentClassifier";
import TextToSpeech from "../components/TextToSpeech";

const HomeScreen = () => {
    const [data, setData] = useState(null);

    return (
        <ScrollView style={{ padding: 20 }}>
            <SpeechToText onTextGenerated={setData} />
            {data && (
                <>
                    <Translation translatedText={data.translated_text} />
                    <IntentClassifier intent={data.intent} urgency={data.urgency} />
                    <TextToSpeech text={data.translated_text} />
                </>
            )}
        </ScrollView>
    );
};

export default HomeScreen;
