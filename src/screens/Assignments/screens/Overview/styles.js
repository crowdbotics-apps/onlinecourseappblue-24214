import { StyleSheet } from 'react-native';

// colors
import colors from 'src/styles/colors';

export default StyleSheet.create({
    container: {
        backgroundColor: colors.whisper
    },
    heading: {
        paddingHorizontal: 25,
        paddingVertical: 5
    },
    description: {
        marginHorizontal: 10,
        paddingVertical: 15,
        paddingHorizontal: 30,
        backgroundColor: 'white',
        borderRadius: 5
    },
    image: {
        width: '100%',
        height: 500,
        resizeMode: 'contain'
    },
    pdf: {
        flex: 1
    }
});