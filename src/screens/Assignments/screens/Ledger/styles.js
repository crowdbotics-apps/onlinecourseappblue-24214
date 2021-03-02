import { StyleSheet } from 'react-native';

// colors
import colors from 'src/styles/colors';

export default StyleSheet.create({
    contentWrapper: {
        marginVertical: 5
    },
    heading: {
        backgroundColor: colors.morningGlory
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
        color: colors.morningGlory,
        fontWeight: 'bold'
    },
    tableHeadText: {
        margin: 5,
        color: colors.morningGlory,
        fontWeight: 'bold'
    }
});