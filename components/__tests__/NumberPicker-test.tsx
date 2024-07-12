import { fireEvent, render } from "@testing-library/react-native";
import { NumberPicker } from "../NumberPicker";

const mockIncrement = jest.fn();
const mockDecrement = jest.fn();


// Test the NumberPicker component
describe('NumberPicker', () => {
    it('renders correctly', () => {
        const { toJSON } = render(
            <NumberPicker
                title="Test"
                num={1}
                decrement={mockDecrement}
                increment={mockIncrement}
            />
        );
        expect(toJSON()).toMatchSnapshot();
    });
});

// Test that the increment function is called when the increment button is pressed
describe('NumberPicker', () => {
    it('calls increment function when increment button is pressed', () => {
        const { getByTestId } = render(
            <NumberPicker
                title="Test"
                num={1}
                decrement={mockDecrement}
                increment={mockIncrement}
            />
        );
        fireEvent.press(getByTestId('increment'));
        expect(mockIncrement).toHaveBeenCalled();
    });
});

// Test that the decrement function is called when the decrement button is pressed
describe('NumberPicker', () => {
    it('calls increment function when increment button is pressed', () => {
        const { getByTestId } = render(
            <NumberPicker
                title="Test"
                num={1}
                decrement={mockDecrement}
                increment={mockIncrement}
            />
        );
        fireEvent.press(getByTestId('decrement'));
        expect(mockIncrement).toHaveBeenCalled();
    });
});