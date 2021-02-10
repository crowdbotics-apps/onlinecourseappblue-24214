import { StyleSheet, Platform } from 'react-native';
import colors from 'src/styles/colors';

export default StyleSheet.create({
    primary: { backgroundColor: colors.biscay },

    secondary: { backgroundColor: colors.white },

    transparent: { backgroundColor: 'transparent' },

    primaryText: { color: colors.white },

    secondaryText: { color: colors.doveGray },

    header: {
        borderBottomWidth: 0,
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 0,
        elevation: 0,
        width: '100%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 13
    },

    titleText: {
        fontSize: 18,
        fontFamily: 'Gilroy-Light',
        ...Platform.select({
            android: {
                paddingLeft: 18
            }
        })
    },

    textWrapper: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: 16,
        marginRight: 46
    },

    leftStyle: {
        flexDirection: 'row',
        width: 30
    },

    bodyStyle: {
        flex: 1,
        marginHorizontal: 16
    },

    rightStyle: {
        width: 30
    }
});