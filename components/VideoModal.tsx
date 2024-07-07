import { Portal, Text, Modal, Button, Card } from "react-native-paper";
import { StyleSheet } from "react-native";

type VideoModalProps = {
    visible: boolean;
    onDismiss: () => void;
    title: string;
    videoURL: string;
};

export const VideoModal = (props: VideoModalProps) => {
    return (
        <Portal>
            <Modal style={styles.modal} visible={props.visible} onDismiss={props.onDismiss}>
                <Card>
                    <Card.Content>
                        <Card.Title title={props.title} />
                    </Card.Content>
                    <Card.Cover style={styles.video} source={{ uri: props.videoURL }} />
                    <Card.Actions>
                        <Button onPress={props.onDismiss}>Close</Button>
                    </Card.Actions>
                </Card>
            </Modal>
        </Portal>
    );
}

const styles = StyleSheet.create({
    modal: {
        padding: 5,
    },
    video: {
        padding: 5,
    }
});