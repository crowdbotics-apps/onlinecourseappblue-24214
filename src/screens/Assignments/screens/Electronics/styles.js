import { StyleSheet } from 'react-native';

// colors
import colors from 'src/styles/colors';

export default StyleSheet.create({
    container: {
        paddingHorizontal: 40,
        paddingVertical: 30
    },
    table: {
        flex: 1
    },
    item: {
        flexDirection: 'row',
        marginTop: 10,
        borderWidth: 1
    },
    position: {
        position: 'relative'
    },
    costColHead: {
        borderWidth: 1,
        backgroundColor: colors.linkWater
    },
    costColValue: {
        borderWidth: 1,
        backgroundColor: colors.biscay
    },
    costColText: {
        margin: 3,
        color: colors.white,
        fontWeight: 'bold'
    },
    costHeadText: {
        margin: 3,
        color: colors.doveGray
    },
    icon: {
        right: 3,
        zIndex: 1,
        bottom: 2,
        position: 'absolute'
    }
});