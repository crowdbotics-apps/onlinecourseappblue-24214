import { StyleSheet, Platform } from 'react-native';
import colors from 'src/styles/colors';

export default StyleSheet.create({
    // fontFamily: { fontFamily: 'Gilroy-Light' },
    fontFamilyBold: {
        // fontFamily: 'Gilroy-ExtraBold',
        fontWeight: 'bold',
        ...Platform.select({
            ios: {
                fontWeight: 'bold',
            }
        })
    },
    fontSize: { fontSize: 14 },

    primary: { color: colors.white },
    secondary: { color: colors.morningGlory },
    tertiary: { color: colors.bismark },
    quaternary: { color: colors.wildWillow },
    quinary: { color: colors.cornflowerBlue },
    senary: { color: colors.jaggedIce },
    septenary: { color: colors.doveGray },
    octonary: { color: colors.alto },
    nonary: { color: colors.green },
    denary: { color: colors.deepBlush },
    undenary: { color: colors.pictonBlue },
    eleventh: { color: colors.biscay },

    underline: { textDecorationLine: 'underline' },

    alignLeft: { alignSelf: 'flex-start' },
    alignCenter: { textAlign: 'center' },
    alignRight: { alignSelf: 'flex-end' }
});
