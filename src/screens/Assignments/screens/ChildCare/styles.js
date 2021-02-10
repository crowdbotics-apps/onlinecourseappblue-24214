import { StyleSheet } from 'react-native';

// colors
import colors from 'src/styles/colors';

export default StyleSheet.create({
    flex: {
        flex: 1
    },
    container: {
        paddingHorizontal: 40,
        paddingVertical: 30
    },
    viewStyle: {
        padding: 5,
        borderWidth: 1,
        paddingRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.pictonBlue
    },
    iconWrapper: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    head: {
        borderWidth: 1,
        backgroundColor: colors.pictonBlue
    },
    icon: {
        fontSize: 20,
        color: colors.white
    },
    table: {
        flex: 1,
        marginTop: 50
    },
    wrapper: {
        flexDirection: 'row'
    },
    adsOnWrapper: {
        flexDirection: 'row',
        marginTop: 10,
        borderWidth: 1
    },
    headText: {
        margin: 5,
        color: colors.white,
        fontWeight: 'bold'
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
    addOnCheck: {
        right: 3,
        zIndex: 1,
        bottom: 2,
        position: 'absolute'
    }
});