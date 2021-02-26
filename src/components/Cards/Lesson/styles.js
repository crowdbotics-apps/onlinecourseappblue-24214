import { StyleSheet } from 'react-native';

// styles
import colors from 'src/styles/colors';

export default StyleSheet.create({
    course: {
        borderRadius: 8,
        marginBottom: 16,
        flexDirection: 'row',
        overflow: 'hidden',
        alignItems: 'center'
    },

    courseImage: {
        width: 86,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.black
    },

    iconWrapper: {
        width: 26,
        height: 26,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.doveGray
    },

    icon: {
        fontSize: 12,
        color: colors.white
    },

    courseText: {
        flex: 1,
        paddingHorizontal: 12,
        justifyContent: 'center'
    }
});