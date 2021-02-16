import { StyleSheet } from "react-native";

// colors
import colors from 'src/styles/colors';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    heading: {
        paddingHorizontal: 25,
        paddingVertical: 5
    },
    description: {
        flexDirection: 'row',
        marginHorizontal: 10,
        paddingVertical: 15,
        paddingHorizontal: 30,
        backgroundColor: 'white',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageWrapper: {
        height: 300,
        paddingVertical: 20,
        borderRadius: 5
    },
    textWrapper: {
        flex: 1,
        paddingHorizontal: 22
    },
    content: {
        paddingHorizontal: 22,
        backgroundColor: colors.whisper
    },
    heading: {
        marginVertical: 17
    },
    lessonDescription: {
        textAlign: 'left'
    },
    buttonWrapper: {
        paddingVertical: 20,
        flexDirection: 'row',
        paddingHorizontal: 35,
    },
    buttonStyle: {
        flex: 1,
        marginHorizontal: 2
    },
    icon: {
        fontSize: 12,
        marginLeft: 10,
        marginRight: 0
    }
});