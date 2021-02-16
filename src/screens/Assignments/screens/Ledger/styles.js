import { StyleSheet } from 'react-native';

// colors
import colors from 'src/styles/colors';

export default StyleSheet.create({
    contentWrapper: {
        marginVertical: 5
    },
    heading: {
        backgroundColor: colors.biscay
    },
    table: {
        borderWidth: 1
    },
    wrapper: {
        flexDirection: 'row',
        backgroundColor: colors.linkWater
    },
    text: {
        margin: 5,
        color: colors.biscay,
        fontWeight: 'bold'
    },
    tableHeadText: {
        margin: 5,
        color: colors.biscay,
        fontWeight: 'bold'
    }
});