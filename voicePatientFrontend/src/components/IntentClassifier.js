import React from "react";
import { View, Text } from "react-native";

const IntentClassifier = ({ intent, urgency }) => {
    return (
        <View>
            <Text style={{ fontWeight: "bold" }}>Intent:</Text>
            <Text>{intent}</Text>
            <Text style={{ fontWeight: "bold" }}>Urgency:</Text>
            <Text>{urgency}</Text>
        </View>
    );
};

export default IntentClassifier;
