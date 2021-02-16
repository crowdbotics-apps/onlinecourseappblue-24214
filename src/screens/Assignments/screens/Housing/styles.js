import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    position: {
        position: 'relative'
    },
    wrapper: {
        width: 150,
        marginHorizontal: 5,
        marginTop: 20,
        borderWidth: 2
    },
    bold: {
        fontWeight: 'bold'
    },
    tableWrapper: {
        marginTop: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    check: {
        right: 3,
        zIndex: 1,
        top: 35,
        position: 'absolute'
    }
});