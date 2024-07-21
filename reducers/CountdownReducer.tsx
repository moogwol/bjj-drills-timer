type ActionType =
//  "SET_SECONDS"
     "SET_WORKOUT_TIME"
    | "SET_REST_TIME";

interface CountdownState {
    // seconds: string;
    workoutTime: string;
    restTime: string;
    // isResting: boolean;
    // finished: boolean;
    // isRunning: boolean;
}

interface CountdownAction {
    type: ActionType;
    timeValue: string;
}

export const CountdownReducer = (state: CountdownState, action: CountdownAction): CountdownState => {
    switch (action.type) {
        // case "SET_SECONDS":
        //     return { ...state, seconds: action.timeValue };
        case "SET_WORKOUT_TIME":
            return { ...state, workoutTime: action.timeValue };
        case "SET_REST_TIME":
            return { ...state, restTime: action.timeValue };        
        default:
            return state;
    }
}