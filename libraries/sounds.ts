import { Audio } from "expo-av";

// Sounds
const singleBell = require("@/assets/sounds/single-bell.mp3");
const tripleBell = require("@/assets/sounds/triple-bell.mp3");
const alarm = require("@/assets/sounds/biohazard-alarm.mp3");


// Function to play a sound
const playSound = async (sound: any) => {
    const soundObject = new Audio.Sound();
    try {
        await soundObject.loadAsync(sound);
        await soundObject.playAsync();
        console.log("Sound played");
    } catch (error) {
        console.error("Error playing sound: ", error);
    }
};


export const playSingleBell = async () => {
    await playSound(singleBell);
};

export const playTripleBell = async () => {
    await playSound(tripleBell);
}

export const playAlarm = async () => {
    await playSound(alarm);
}