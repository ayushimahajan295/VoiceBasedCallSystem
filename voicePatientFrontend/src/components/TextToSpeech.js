import React from "react";
import { View, Button } from "react-native";
import * as Speech from "expo-speech";

const TextToSpeech = ({ text }) => {
    const speak = () => {
        Speech.speak(text);
    };

    return (
        <View>
            <Button title="Listen to Response" onPress={speak} />
        </View>
    );
};

export default TextToSpeech;
