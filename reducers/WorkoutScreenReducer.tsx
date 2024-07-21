// Define the workout screen reducer
type ActionType = "SET_RESTING"
    | "SET_FINISHED"
    | "SET_NOT_FINISHED"
    | "SET_RESTING_FALSE"
    | "INCREMENT_DRILL"
    | "DECREMENT_DRILL"
    | "TOGGLE_VIDEO_MODAL";

interface WorkoutScreenState {
    isResting: boolean;
    finished: boolean;
    currentDrill: number;
    videoModalVisible: boolean;
}

interface WorkoutScreenAction {
    type: ActionType;
}


export const workoutScreenReducer = (state: WorkoutScreenState, action: WorkoutScreenAction): WorkoutScreenState => {
    switch (action.type) {
        case "SET_RESTING":
            return { ...state, isResting: !state.isResting };
        case "SET_RESTING_FALSE":
            return { ...state, isResting: false };
        case "SET_FINISHED":
            return { ...state, finished: true };
            case "SET_NOT_FINISHED":
            return { ...state, finished: false };
        case "INCREMENT_DRILL":
            return { ...state, currentDrill: state.currentDrill + 1 };
        case "DECREMENT_DRILL":
            return { ...state, currentDrill: state.currentDrill - 1 };
        case "TOGGLE_VIDEO_MODAL":
            return { ...state, videoModalVisible: !state.videoModalVisible };

    }
};