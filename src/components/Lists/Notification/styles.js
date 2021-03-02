import { StyleSheet } from 'react-native';

// styles
import colors from 'src/styles/colors';

export default StyleSheet.create({
    primary: { color: colors.morningGlory },
    secondary: { color: colors.deco },
    tertiary: { color: colors.deepBlush },

    item: {
        marginBottom: 4,
        paddingVertical: 10,
        paddingHorizontal: 21,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
    },

    leftIcon: {
        fontSize: 30,
        marginRight: 21
    },

    textStyle: {
        lineHeight: 20
    },

    wrapper: {
        flex: 1
    }
});
