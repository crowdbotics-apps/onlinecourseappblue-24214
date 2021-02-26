import { StyleSheet } from 'react-native';
import colors from 'src/styles/colors';

export default StyleSheet.create({
    footer: {
        backgroundColor: colors.doveGray
    },

    touch: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    icon: {
        color: colors.white
    },
    active: {
        color: colors.morningGlory
    },
});