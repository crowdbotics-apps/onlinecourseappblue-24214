import { StyleSheet } from 'react-native';


// colors
import colors from 'src/styles/colors';

export default StyleSheet.create({
    buttonTabs: {
        flex: 1,
        flexDirection: 'row',
        marginVertical: 40,
        paddingHorizontal: 30
    },
    tab: {
        flex: 1,
        marginHorizontal: 20,
        backgroundColor: colors.pictonBlue
    },
    active: {
        backgroundColor: colors.morningGlory
    },
    head: {
        backgroundColor: colors.pictonBlue
    },
    wrapper: {
        flexDirection: 'row'
    },
    headText: {
        margin: 5,
        color: colors.white,
        fontWeight: 'bold'
    },
    colHead: {},
    colHeadText: {
        margin: 3,
        color: colors.doveGray
    },
    colValue: {
        backgroundColor: colors.morningGlory
    },
    colValueText: {
        margin: 3,
        fontWeight: 'bold',
        color: colors.white
    },
    colText: {
        margin: 3
    },
    table: {
        borderWidth: 2
    },
    tableWrapper: {
        marginHorizontal: 10,
        paddingHorizontal: 10,
        paddingTop: 30,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        backgroundColor: colors.linkWater
    },
    tableWrapperStyle: {
        width: '45%',
        marginBottom: 40
    },
    check: {
        right: 3,
        zIndex: 1,
        top: 3,
        position: 'absolute'
    }
});