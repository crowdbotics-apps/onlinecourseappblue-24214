import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    imageWrapper: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center',
        alignItems: 'center'
    },

    content: {
        paddingHorizontal: 32,
        paddingBottom: 20
    },

    logo: {
        height: 140,
        width: '100%',
        resizeMode: 'contain'
    },

    title: {
        marginBottom: 5
    },

    button: {
        marginVertical: 35
    }
});