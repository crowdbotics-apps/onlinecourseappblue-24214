import { StyleSheet } from 'react-native';

// styles
import colors from 'src/styles/colors';

export default StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: colors.whisper
    },

    heading: {
        marginTop: 46,
        flexDirection: 'row',
        paddingVertical: 18,
        paddingHorizontal: 35,
        backgroundColor: colors.white
    },

    title: {
        flex: 2,
        textAlign: 'left'
    },

    subscription: {
        flex: 1,
        textAlign: 'right'
    },

    button: {
        marginTop: 32,
        marginHorizontal: 49
    }
});
