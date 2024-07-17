import Index from "@/app/(tabs)";
import '@testing-library/jest-native/extend-expect';
import { Drill, DrillContext } from "@/app/_layout";
import { useColours } from "@/constants/Colors";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

// Mock go to workout function
const mockGoToWorkout = jest.fn();


// Check that the componment renders correctly
const colours = useColours();
describe('Index', () => { }); {
    it('checks index screen renders correctly', async () => {
        const { toJSON } = render(
        <DrillContext.Provider value={{ drills: [], setDrills: () => {} }}>
            <Index />
        </DrillContext.Provider>);
        expect(toJSON()).toMatchSnapshot();
        });
}

// Test the handleClickGoToWorkout function does not work before any checkboxes are checked
describe('Index', () => {
    it('calls handleClickGoToWorkout function when Go to workout button is pressed', async () => {
        const { getByTestId } = render(
            <DrillContext.Provider value={{ drills: [], setDrills: () => {} }}>
                <Index />
            </DrillContext.Provider>
        );

        fireEvent.press(getByTestId('workoutButton'));
        expect(mockGoToWorkout).not.toHaveBeenCalled();
    });
});

// // Test the handleClickGoToWorkout function works after a checkbox has been checked
// describe('Index', () => {
//     it('calls handleClickGoToWorkout function when Go to workout button is pressed', async () => {
//         const { getByTestId } = render(
//             <DrillContext.Provider value={{ drills: [], setDrills: () => {} }}>
//                 <Index />
//             </DrillContext.Provider>
//         );

//         fireEvent.press(getByTestId('accordion'));
//         fireEvent.press(getByTestId('roundsCheckbox'));
//         fireEvent.press(getByTestId('workoutButton'));
//         expect(mockGoToWorkout).toHaveBeenCalled();
//     });
// });
