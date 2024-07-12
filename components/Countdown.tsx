import { View, StyleSheet } from "react-native";
import { Text, IconButton } from "react-native-paper";
import { useState, useEffect } from "react";
import { formattedTime } from "@/libraries/utility";


type CountdownProps = {
    seconds: string;
    minutes: string;
};



export default function Countdown(props: CountdownProps) {

    return (
        <View style={styles.buttonContainer} >
            <Text variant="displayLarge">{formattedTime(parseInt(props.seconds))}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
});