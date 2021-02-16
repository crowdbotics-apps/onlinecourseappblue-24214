import { StyleSheet } from 'react-native';
import colors from 'src/styles/colors';


export default StyleSheet.create({
    sliderWrapper: {
        marginTop: 20,
        paddingHorizontal: 25
    },
    slider: {
        width: '100%'
    },
    sliderInfo: {
        flexDirection: 'row',
        paddingHorizontal: 15
    },
    minValue: {
        flex: 1,
        alignItems: 'flex-start'
    },
    maxValue: {
        flex: 1,
        alignItems: 'flex-end'
    },
    contentWrapper: {
        marginVertical: 5,
        paddingHorizontal: 15
    },
    tableWrapper: {
        marginTop: 10,
        paddingHorizontal: 20
    },
    heading: {
        backgroundColor: colors.biscay
    },
    table: {
        borderWidth: 1
    },
    head: {
        backgroundColor: '#f1f8ff'
    },
    wrapper: {
        flexDirection: 'row',
        backgroundColor: colors.linkWater
    },
    title: {
        backgroundColor: '#f6f8fa'
    },
    text: {
        margin: 5,
        color: colors.biscay
    },
    tableHeadText: {
        margin: 5,
        color: colors.biscay,
        fontWeight: 'bold'
    }
});