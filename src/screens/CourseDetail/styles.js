import { StyleSheet } from 'react-native';

import colors from 'src/styles/colors';

export default StyleSheet.create({
    container: {
        paddingHorizontal: 22,
        backgroundColor: colors.whisper
    },

    courseimage: {
        width: null,
        height: 156,
        resizeMode: 'cover'
    },

    heading: {
        marginVertical: 17
    },

    contentWrapper: {
        paddingVertical: 20
    },

    button: {
        marginTop: 32,
        marginBottom: 15,
        marginHorizontal: 27
    },

    courseDescription: {
        marginTop: 22,
        textAlign: 'left'
    }
});
