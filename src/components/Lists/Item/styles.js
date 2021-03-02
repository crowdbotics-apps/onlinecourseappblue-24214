import { StyleSheet } from 'react-native';

// styles
import colors from 'src/styles/colors';

export default StyleSheet.create({
    item: {
        marginBottom: 4,
        paddingVertical: 10,
        paddingHorizontal: 21,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
    },

    leftItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },

    leftIcon: {
        fontSize: 25,
        marginRight: 21,
        color: colors.morningGlory
    },

    rightItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },

    textStyle: {
        width: 120,
        textAlign: 'right',
        paddingTop: 3
    },

    rightIcon: {
        fontSize: 35,
        marginLeft: 10,
        color: colors.alto
    }
});
