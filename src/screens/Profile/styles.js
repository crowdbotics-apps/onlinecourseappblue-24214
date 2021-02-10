import { StyleSheet } from 'react-native';

// styles
import colors from 'src/styles/colors';

export default StyleSheet.create({
    container: {
        marginTop: 46,
        backgroundColor: colors.whisper,
    },

    heading: {
        marginTop: 10,
        marginBottom: 15,
        paddingHorizontal: 25
    },

    button: {
        paddingHorizontal: 35,
        marginTop: 'auto',
        marginBottom: 35,
    },

    updateContainer: {
        paddingHorizontal: 22
    },

    updateButton: {
        marginTop: 20
    }
});
