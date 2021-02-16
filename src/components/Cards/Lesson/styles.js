import { StyleSheet } from 'react-native';

// styles
import colors from 'src/styles/colors';

export default StyleSheet.create({
    course: {
        borderRadius: 8,
        marginBottom: 16,
        paddingVertical: 10,
        flexDirection: 'row',
        overflow: 'hidden'
    },

    courseImage: {
        width: 86,
        justifyContent: 'center',
        alignItems: 'center'
    },

    iconWrapper: {
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 18,
        backgroundColor: colors.persianRed,
    },

    icon: {
        color: colors.white,
        fontSize: 20
    },

    courseText: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 12
    }
});