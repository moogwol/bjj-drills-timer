import { View, StyleSheet } from "react-native";
import { Text, IconButton } from "react-native-paper";

type NumberPickerProps = {
    title: string;
    minusDisabled?: boolean;
    num: number;
    decrement: () => void;
    increment: () => void;
};

export const NumberPicker = (props: NumberPickerProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text} variant="headlineSmall" >{props.title}</Text>
            <View style={styles.numberPicker}>
                <IconButton testID="decrement" icon="minus-thick" size={30} disabled={props.minusDisabled} onPress={props.decrement} />
                <Text variant="displaySmall" >{props.num}</Text>
                <IconButton testID="increment" icon="plus-thick" onPress={props.increment} />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        margin: 10,
    },
    numberPicker: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
})