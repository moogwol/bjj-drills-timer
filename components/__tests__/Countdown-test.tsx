import { render } from "@testing-library/react-native";
import Countdown from "../Countdown";

// Test the Countdown component renders correctly
describe('Countdown', () => {
    it('renders correctly', () => {
        const { toJSON } = render(
            <Countdown
                seconds="60"
                minutes="1"
            />
        );
        expect(toJSON()).toMatchSnapshot();
    });
});