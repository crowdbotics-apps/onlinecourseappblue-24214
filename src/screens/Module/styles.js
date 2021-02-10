import { StyleSheet } from 'react-native';

import colors from 'src/styles/colors';

export default StyleSheet.create({
    container: {
        backgroundColor: colors.whisper
    },

    courseimage: {
        width: null,
        height: 156,
        resizeMode: 'stretch'
    },

    descriptionWrapper: {
        paddingHorizontal: 22
    },

    heading: {
        marginVertical: 17
    },

    button: {
        marginVertical: 22,
        marginHorizontal: 15
    },

    icon: {
        fontSize: 12,
        marginLeft: 10,
        marginRight: 0
    },

    courseDescription: {
        marginTop: 22,
        textAlign: 'left'
    },

    tabWrapper: {
        paddingVertical: 20
    },

    tabBg: {
        flex: 1,
        backgroundColor: colors.whisper
    },

    labelStyle: {
        fontSize: 11,
        color: colors.black,
        fontFamily: 'Gilroy-ExtraBold',
        ...Platform.select({
            ios: {
                fontWeight: 'bold'
            }
        })
    },
    indicatorStyle: {
        height: 4,
        backgroundColor: colors.black
    },
    tabBarStyle: {
        marginTop: 20,
        marginBottom: 10,
        backgroundColor: colors.primary
    }
});
