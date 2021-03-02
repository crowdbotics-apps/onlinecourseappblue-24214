import { StyleSheet, Platform } from 'react-native';
import colors from 'src/styles/colors';

export default StyleSheet.create({
    primary: { backgroundColor: colors.morningGlory },

    secondary: { backgroundColor: colors.white },

    primaryText: { color: colors.white },

    secondaryText: { color: colors.doveGray },

    header: {
        borderBottomWidth: 0,
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 0,
        elevation: 0,
        width: '100%'
    },

    titleText: {
        fontSize: 15,
        // fontFamily: 'Gilroy-Light'
    },

    leftStyle: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    textWrapper: {
        marginLeft: 16,
        flexDirection: 'column'
    },

    bodyStyle: {
        flex: 1,
        overflow: 'visible'
    },

    textTitle: {
        // fontFamily: 'Gilroy-ExtraBold',
        ...Platform.select({
            ios: {
                fontWeight: 'bold',
            },
        }),
    }
});