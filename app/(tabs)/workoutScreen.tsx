import { View, StyleSheet, Dimensions, FlatList, Animated } from 'react-native';
import { useState, useRef, useEffect, useContext, useCallback, useReducer } from 'react';
import { IconButton, Button, Text } from 'react-native-paper';
import Countdown from '@/components/Countdown';
import { useColours } from '@/constants/Colors';
import { playSingleBell, playAlarm } from '@/libraries/sounds';
import { DrillContext } from '@/app/_layout';
import { formattedTime } from '@/libraries/utility';
import DrillCard from '../../components/DrillCard';
import { useFocusEffect } from 'expo-router';
import { useKeepAwake } from 'expo-keep-awake';
import { VideoModal } from '@/components/VideoModal';
import { workoutScreenReducer } from '@/reducers/WorkoutScreenReducer';
import { CountdownReducer } from '@/reducers/CountdownReducer';


const colours = useColours();



export default function workoutScreen() {

    // States
    const [state, dispatch] = useReducer(workoutScreenReducer, {
        isResting: false,
        finished: false,
        currentDrill: 0,
        videoModalVisible: false,
    });

    const [countdownState, countdownDispatch] = useReducer(CountdownReducer, {
        // seconds: "0",
        workoutTime: "0",
        restTime: "0",
        // isResting: false,
        // finished: false,
        // isRunning: false,
    });


    // const [workoutTime, setWorkoutTime] = useState("0");
    // const [restTime, setRestTime] = useState("0");
    const [seconds, setSeconds] = useState("0");
    const [isRunning, setIsRunning] = useState(false);

    useKeepAwake(); // Prevent the screen from sleeping

    // Contexts
    const drillContext = useContext(DrillContext);
    if (!drillContext) {
        throw new Error("DrillContext is not defined");
    }
    const { drills, setDrills } = drillContext;



    // Constants
    const windowWidth = Dimensions.get('window').width;
    const drillCount = drills ? drills.length : 0;
    const DATA = drills
    const colours = useColours();



    // refs
    const listRef = useRef<FlatList>(null); // a ref to the FlatList component
    const isRunningRef = useRef(isRunning); // a ref to store the isRunning state
    const initialRender = useRef(true); // a ref to store the initial render state

    // useEffect to update the isRunningRef.current value when the isRunning state changes
    useEffect(() => {
        isRunningRef.current = isRunning;
    }, [isRunning]);


    // useEffect to reset isResting and finished states to false when the screen is focused
    useFocusEffect(
        useCallback(() => {
            // This code runs when the screen is focused
            dispatch({ type: "SET_RESTING_FALSE" });
            // setFinished(false);
            dispatch({ type: "SET_NOT_FINISHED" });

            return () => {
                // This code runs when the screen goes out of focus
                // Optional: Reset any states if needed when leaving the screen
                dispatch({ type: "SET_NOT_FINISHED" });
            };
        }, [])
    );


    // a function which counts down the seconds to zero
    const doCountDown = (seconds: string) => {

        // if the isRunning state is false, return
        if (!isRunningRef.current) {
            return;
        }

        const interval = setInterval(() => {
            setSeconds(prevSeconds => {

                // if the seconds are zero, clear the interval and return zero
                if (prevSeconds === "0") {
                    clearInterval(interval);
                    return "0";
                }

                // if the ifRunning state is false, clear the interval
                if (!isRunningRef.current) {
                    clearInterval(interval);
                    return prevSeconds;
                }

                // if the seconds are greater than zero, decrement the seconds by one
                return (parseInt(prevSeconds) - 1).toString();
            });
        }, 1000);
        return () => clearInterval(interval);
    };






    // a function to render the slide deck of drills
    const renderSlideDeck = () => {
        return (
            <Animated.FlatList style={{ flex: 1 }}
                data={DATA}
                ref={listRef}
                keyExtractor={(_, index) => index.toString()}
                horizontal
                getItemLayout={(data, index) => (
                    { length: windowWidth, offset: windowWidth * index, index }
                )}
                renderItem={({ item }) => <View style={{ width: windowWidth }} ><DrillCard style={styles.card}
                    title={!state.isResting ? item.name : "Rest"}
                    nextDrill={state.isResting ? getNextDrill() : undefined}
                /></View>}
            />)
    }

    // A function to render the 'workout finished' message
    const renderFinished = () => {
        return (
            <View style={{ flex: 1, width: windowWidth }} >
                <DrillCard style={styles.card}
                    title="Workout Finished!" />
            </View>
        )
    }


    // Start the countdown when the isRunning state is true
    useEffect(() => {
        // doCountDown(seconds);
        if (isRunning) {
            doCountDown(seconds);
        }
    }, [isRunning]);


    const goToNextDrill = () => {
        listRef.current?.scrollToIndex({ index: state.currentDrill + 1 });
        dispatch({ type: "INCREMENT_DRILL" });
    }

    const goToPreviousDrill = () => {
        listRef.current?.scrollToIndex({ index: state.currentDrill - 1 });
        dispatch({ type: "DECREMENT_DRILL" });
    }

    // Get the name of next drill
    const getNextDrill = () => {
        if (state.currentDrill === drillCount - 1) {
            return "End of workout";
        } else {
            return drills[state.currentDrill + 1].name;
        }
    }

    // Increment and decrement the workout and rest times
    const incrementWorkSeconds = () => {
        dispatch({ type: "SET_RESTING_FALSE" });
        countdownDispatch({
            type: "SET_WORKOUT_TIME",
            timeValue: (parseInt(countdownState.workoutTime) + 30).toString()
        });
    }

    const decrementWorkSeconds = () => {
        parseInt(countdownState.workoutTime) >= 30 &&
            // setWorkoutTime((parseInt(workoutTime) - 30).toString());
            countdownDispatch({
                type: "SET_WORKOUT_TIME",
                timeValue: (parseInt(countdownState.workoutTime) - 30).toString()
            });
    }

    const incrementRestSeconds = () => {
        // setRestTime((parseInt(restTime) + 10).toString());
        countdownDispatch({
            type: "SET_REST_TIME",
            timeValue: (parseInt(countdownState.restTime) + 10).toString()
        });
    }

    const decrementRestSeconds = () => {
        // parseInt(restTime) >= 10 && setRestTime((parseInt(restTime) - 10).toString());
        parseInt(countdownState.restTime) >= 10 &&
            countdownDispatch({
                type: "SET_REST_TIME",
                timeValue: (parseInt(countdownState.restTime) - 10).toString()
            });
    };

    // Logic for switching between rest, workout and finished states

    useEffect(() => {
        // if the seconds are zero and the current drill is less than the drill count and the isResting state is false
        // ie the drill has finished and it's time to rest
        if (seconds === "0" && state.currentDrill < drillCount - 1 && !state.isResting) {
            console.log("Resting");
            dispatch({ type: "SET_RESTING" });
            setSeconds(countdownState.restTime);

        }
        // }, [seconds, state.currentDrill, drillCount, state.isResting]);
    }, [seconds]);

    // if the seconds are zero and the current drill is less than the drill count and the isResting state is true
    // go to the next drill and set the seconds to the workout time
    // ie the rest time has finished and it's time to start the next drill
    useEffect(() => {
        if (seconds === "0" && state.currentDrill < drillCount - 1 && state.isResting) {
            // setIsResting(false);
            console.log("Drill time");
            dispatch({ type: "SET_RESTING_FALSE" });
            goToNextDrill();
            setSeconds(countdownState.workoutTime);
        }
    }, [seconds]);


    // if the seconds are zero and the current drill is equal to the drill count and the isResting state is false
    // ie the workout has finished
    useEffect(() => {
        if (seconds === "0" && state.currentDrill === drillCount - 1 && !state.isResting) {
            console.log("Workout finished");
            setIsRunning(false);
            dispatch({ type: "SET_FINISHED" });
        }
    }, [seconds]);



    // Play a sound when the seconds are zero except on the initial render 
    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
        } else if (seconds === "0" && isRunning && state.currentDrill < drillCount - 1) {
            playSingleBell();
            console.log("Sound played");
        } else if (state.finished) {
            playAlarm();
        }
    }, [seconds, state.finished]);


    // User input and button functions

    // Set the time to the round time when the workout time is changed
    useEffect(() => {
        if (!state.isResting) {
            setSeconds(countdownState.workoutTime);
        }
    }, [countdownState.workoutTime]);


    const handleClickNext = () => {
        goToNextDrill();
    }

    const handleClickPrevious = () => {
        goToPreviousDrill();
    }


    // Start or stop the countdown when the start / stop button is clicked
    const handleClickStartStop = () => {
        setIsRunning(!isRunning);
    }

    const handleClickReset = () => {
        // setSeconds(workoutTime);
        countdownDispatch({
            type: "SET_WORKOUT_TIME",
            timeValue: countdownState.workoutTime
        });
        dispatch({ type: "SET_NOT_FINISHED" });
    }

    // Disable the next and previous buttons when the current drill is at the beginning or end of the drill list
    const nextButtonDisabled = () => {
        return state.currentDrill === drillCount - 1;
    }

    const previousButtonDisabled = () => {
        return state.currentDrill === 0;
    }


    return (
        <View style={styles.container} >
            <VideoModal title={drills.length > 0 ? drills[state.currentDrill].name : "No drills"}
                videoURL={drills.length > 0 ? drills[state.currentDrill].video_url : "https://bjj-world.com/wp-content/uploads/2018/06/Turtle-roll-escape.gif"}
                visible={state.videoModalVisible}
                onDismiss={() => dispatch({ type: "TOGGLE_VIDEO_MODAL" })}
            />
            <View style={styles.slideContainer}>
                {!state.finished ? renderSlideDeck() : renderFinished()}
            </View>
            <View style={styles.buttonContainer}>
                <IconButton disabled={previousButtonDisabled()} size={30} style={styles.button} rippleColor={colours.light} icon={'arrow-left-bold-outline'} iconColor={colours.light} containerColor={colours.accent} onPress={handleClickPrevious} />
                <IconButton disabled={nextButtonDisabled()} size={30} mode='contained-tonal' style={styles.button} rippleColor={colours.light} icon={'arrow-right-bold-outline'} iconColor={colours.light} containerColor={colours.accent} onPress={handleClickNext} />
            </View>
            <View style={styles.countdown}>
                <Countdown minutes='00' seconds={seconds} />
            </View>


            <View style={styles.timeInputContainer}>
                <View style={styles.timeInput} >
                    <Text>Round</Text>
                    <IconButton size={30} icon={'minus-thick'} onPress={decrementWorkSeconds} disabled={parseInt(countdownState.workoutTime) < 30} />
                    <Text >{formattedTime(parseInt(countdownState.workoutTime))}</Text>
                    <IconButton size={30} icon={'plus-thick'} onPress={incrementWorkSeconds} />
                </View>
                <View style={styles.timeInput}>
                    <Text>Rest</Text>
                    <IconButton size={30}
                        icon={'minus-thick'}
                        onPress={decrementRestSeconds}
                        disabled={parseInt(countdownState.restTime) < 10}
                    />
                    <Text >{formattedTime(parseInt(countdownState.restTime))}</Text>
                    <IconButton size={30} icon={'plus-thick'} onPress={incrementRestSeconds} />
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <View style={styles.button}>
                    <Button buttonColor={colours.primary} onPress={handleClickStartStop} mode='contained' >{isRunning ? "Stop" : "Start"}</Button>
                </View>
                <View style={styles.button}>
                    <Button buttonColor={colours.primary} onPress={handleClickReset} mode='contained' >Reset</Button>
                </View>
                <View style={styles.button}>
                    <Button buttonColor={colours.primary} onPress={() => dispatch({ type: "TOGGLE_VIDEO_MODAL" })} mode='contained' >Video</Button>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colours.secondary,
        flex: 1,
        justifyContent: "flex-start",
    },
    slideContainer: {
        flex: 3,
    },
    card: {
        flex: 2,
        backgroundColor: colours.primary,
        borderColor: colours.light,
        borderWidth: 5,
    },
    buttonContainer: {
        // flex: 1,
        flexDirection: "row",
        justifyContent: "center",
    },
    button: {
        margin: 10,
        padding: 10,
        color: colours.secondary,
    },
    timeInputContainer: {
        alignItems: "center",
    },
    timeInput: {
        flexDirection: "row",
        alignItems: "center",
    },
    countdown: {
        justifyContent: "center",
        alignItems: "center",
    },
});