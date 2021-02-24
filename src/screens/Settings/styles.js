import { StyleSheet } from 'react-native';

// styles
import colors from 'src/styles/colors';

export default StyleSheet.create({
    container: {
        height: 603,
        backgroundColor: colors.whisper
    },

    heading: {
        marginTop: 46,
        marginBottom: 4,
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
        marginVertical: 32,
        marginHorizontal: 49
    },
    
    updateContainer: {
        paddingHorizontal: 22
    },

    dataWrapper: {
        paddingVertical: 100
    }
});
