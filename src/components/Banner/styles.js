import { StyleSheet } from 'react-native';

// styles
import colors from 'src/styles/colors';

export default StyleSheet.create({
    primary: { backgroundColor: colors.biscay },

    info: {
        alignItems: 'center',
        paddingBottom: 20,
        backgroundColor: colors.white,
        paddingHorizontal: 15,
        justifyContent: 'center'
    },

    infoWrapper: {
        flexDirection: 'row',
        marginTop: 7
    },

    authorText: {
        marginLeft: 5
    },

    rangeText: {
        marginLeft: 8
    },

    text: {
        fontSize: 20,
        marginTop: 17
    },

    balance: {
        width: '100%',
        alignItems: 'flex-end'
    },

    balanceText: {
        paddingHorizontal: 10,
        paddingVertical: 2,
        backgroundColor: 'white'
    }
});
