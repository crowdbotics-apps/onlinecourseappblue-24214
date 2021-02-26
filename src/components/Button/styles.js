import { StyleSheet, Platform } from 'react-native';

// styles
import Colors from 'src/styles/colors';

export default StyleSheet.create({
    primaryText: {
        color: Colors.white,
    },
    primaryBg: { backgroundColor: Colors.morningGlory },
    secondaryText: {
        color: Colors.cornflowerBlue,
    },
    secondaryBg: { backgroundColor: Colors.white },
    facebookText: {
        color: Colors.white,
        fontSize: 12,
    },
    facebookBg: { backgroundColor: Colors.sanMarino },
    appleText: {
        color: Colors.black,
        fontSize: 12,
    },
    appleBg: { backgroundColor: Colors.white },
    button: { borderRadius: 7 },
    buttonText: {
        fontSize: 12,
        fontWeight: 'bold',
        // fontFamily: 'Gilroy-ExtraBold',
        ...Platform.select({
            ios: {
                fontWeight: 'bold',
            },
        }),
    },
    halfWidth: { width: '50%', alignSelf: 'center' },
    alignEnd: { alignSelf: 'flex-end' },
    disabledStyle: { opacity: 0.7 },
});
