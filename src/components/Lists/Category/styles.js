import { StyleSheet } from 'react-native';
import colors from 'src/styles/colors';

export default StyleSheet.create({
    card: {
        flexDirection: 'row',
        paddingHorizontal: 22,
        paddingVertical: 10,
        borderRadius: 8,
        marginBottom: 15
    },
    icon: {
        width: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    categoryIcon: {
        fontSize: 36,
        color: colors.morningGlory
    },
    categoryText: {
        flex: 1,
        marginLeft: 12,
        justifyContent: 'center'
    }
});
