import { StyleSheet } from 'react-native';
import Colors from 'src/styles/colors';

export default StyleSheet.create({
    input: {
        backgroundColor: Colors.white,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 3,
        borderColor: Colors.white,
        height: 40,
    },
    text: {
        color: Colors.black,
        fontFamily: 'Gilroy-ExtraBold',
        height: 40,
    },
    transparentInput: {
        backgroundColor: 'transparent',
        borderColor: Colors.biscay,
        color: Colors.white,
        marginHorizontal: 0
    },
    transparentInputText: {
        color: Colors.white
    }
});
