import { StyleSheet } from 'react-native';

// colors
import colors from 'src/styles/colors';

export default StyleSheet.create({
    flex: {
        flex: 1
    },
    container: {
        marginTop: 40,
        paddingHorizontal: 40
    },
    buttonTabs: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 40,
        paddingHorizontal: 30
    },
    tab: {
        flex: 1,
        marginHorizontal: 20,
        backgroundColor: colors.pictonBlue
    },
    active: {
        backgroundColor: colors.biscay
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
        flex: 1
    },
    wrapper: {
        flexDirection: 'row'
    },
    item: {
        flexDirection: 'row',
        marginTop: 20,
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
    icon: {
        right: 3,
        zIndex: 1,
        bottom: 2,
        position: 'absolute'
    },
    clothingWrapper: {
        width: 150,
        marginHorizontal: 5,
        marginTop: 20,
        borderWidth: 2
    },
    bold: {
        fontWeight: 'bold'
    },
    tableWrapper: {
        marginTop: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    clothingIcon: {
        right: 3,
        zIndex: 1,
        top: 35,
        position: 'absolute'
    }
});