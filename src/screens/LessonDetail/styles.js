import { StyleSheet } from 'react-native';

import colors from 'src/styles/colors';

export default StyleSheet.create({
    buttonWrapper: {
        flexDirection: 'row'
    },

    buttonStyle: {
        flex: 1,
        marginHorizontal: 2
    },

    icon: {
        fontSize: 12,
        marginLeft: 10,
        marginRight: 0
    },

    container: {
        paddingHorizontal: 22,
        backgroundColor: colors.whisper
    },

    image: {
        width: null,
        height: 187,
        resizeMode: 'cover'
    },

    completed: {
        marginBottom: 10
    },

    heading: {
        marginVertical: 17
    },

    lessonDescription: {
        textAlign: 'left'
    },

    button: {
        paddingHorizontal: 35,
        marginTop: 'auto',
        marginBottom: 20
    }
});
