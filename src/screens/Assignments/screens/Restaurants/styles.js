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
    bold: {
        fontWeight: 'bold'
    },
    tableWrapper: {
        flex: 1,
        borderWidth: 2,
        marginTop: 40,
        marginBottom: 30,
        marginHorizontal: 40
    },
    sliderWrapper: {
        paddingHorizontal: 25
    },
    sliderStyle: {
        width: '100%'
    },
    steps: {
        marginLeft: 6
    },
    slider: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
});