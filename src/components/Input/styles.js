import { StyleSheet, Platform } from 'react-native';
import Colors from 'src/styles/colors';

export default StyleSheet.create({
    input: {
        backgroundColor: Colors.white,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 3,
        borderColor: Colors.white
    },
    text: {
        color: Colors.black,
        // fontFamily: 'Gilroy-ExtraBold',
        ...Platform.select({
            ios: {
                fontWeight: 'bold',
            },
        }),
    },
    height: {
        height: 40
    },
    transparentInput: {
        backgroundColor: 'transparent',
        borderColor: Colors.morningGlory,
        color: Colors.white,
        marginHorizontal: 0
    },
    transparentInputText: {
        color: Colors.white
    },
    multilineInput: {
        minHeight: 120
    }
});
