import { StyleSheet } from 'react-native';

// styles
import colors from 'src/styles/colors';

export default StyleSheet.create({
    course: {
        borderRadius: 8,
        marginBottom: 16,
        paddingVertical: 8,
        flexDirection: 'row',
        overflow: 'hidden'
    },

    iconWrapper: {
        width: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },

    icon: {
        color: colors.black,
        fontSize: 22
    },

    courseText: {
        flex: 1,
        justifyContent: 'center',
        paddingVertical: 10,
        paddingLeft: 12
    }
});