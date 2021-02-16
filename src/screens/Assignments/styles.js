import { StyleSheet } from 'react-native';

// styles
import colors from 'src/styles/colors';

export default StyleSheet.create({
    contentWrapper: {
        paddingVertical: 250
    },
    descriptionWrapper: {
        paddingTop: 20,
        paddingHorizontal: 12,
        alignItems: 'center'
    },
    rangeWrapper: {
        marginTop: 7,
        flexDirection: 'row'
    },
    rangeText: {
        marginLeft: 8
    },
    head: {
        borderBottomWidth: 2,
        backgroundColor: colors.pictonBlue
    },
    total: {
        borderTopWidth: 2,
        backgroundColor: colors.biscay
    },
    title: {
        marginLeft: 5
    },
    text: {
        margin: 5,
        color: colors.white
    },
    imageWrapper: {
        height: 200,
        borderRadius: 5
    },
    image: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain'
    },
    button: {
        paddingHorizontal: 35,
        marginTop: 'auto',
        marginBottom: 20
    }
});