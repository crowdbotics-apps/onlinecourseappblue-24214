import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    position: {
        position: 'relative'
    },
    tableWrapper: {
        marginTop: 20,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    wrapper: {
        width: 150,
        marginHorizontal: 5,
        marginBottom: 20,
        borderWidth: 2
    },
    check: {
        right: 3,
        zIndex: 1,
        top: 35,
        position: 'absolute'
    },
    bold: {
        fontWeight: 'bold'
    }
});