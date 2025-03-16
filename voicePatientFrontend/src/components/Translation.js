import React from "react";
import { View, Text } from "react-native";

const Translation = ({ translatedText }) => {
    return (
        <View>
            <Text style={{ fontWeight: "bold" }}>Translated Text:</Text>
            <Text>{translatedText}</Text>
        </View>
    );
};

export default Translation;
