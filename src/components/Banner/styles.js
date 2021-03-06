import { StyleSheet } from 'react-native';

// styles
import colors from 'src/styles/colors';

export default StyleSheet.create({
    primary: { backgroundColor: colors.morningGlory },

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

    text: {
        fontSize: 20,
        marginTop: 17
    }
});
