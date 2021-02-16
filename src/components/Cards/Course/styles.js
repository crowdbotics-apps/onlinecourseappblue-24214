import { StyleSheet } from 'react-native';
import colors from 'src/styles/colors';

export default StyleSheet.create({
    card: {
        borderRadius: 8
    },

    largeCard: {
        flex: 1,
        width: 150,
        marginRight: 0,
        marginBottom: 18
    },

    largeImageWrapper: {
        width: 150,
        height: 121
    },

    largeImage: {
        width: 150
    },

    smallCard: {
        flex: 1,
        width: 135,
        marginRight: 12,
        marginBottom: 1
    },

    smallImageWrapper: {
        width: 135,
        height: 121
    },

    smallImage: {
        width: 135
    },

    progressText: {
        marginBottom: 9
    },

    progressStyle: {
        width: '100%'
    },

    imageWrapper: {
        overflow: 'hidden',
        position: 'relative',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },

    tagText: {
        top: 23,
        right: 0,
        zIndex: 10,
        lineHeight: 30,
        paddingHorizontal: 7,
        position: 'absolute',
        backgroundColor: colors.white
    },

    image: {
        flex: 1,
        resizeMode: 'stretch'
    },

    description: {
        alignItems: 'stretch',
        paddingTop: 5,
        paddingBottom: 13,
        paddingHorizontal: 6
    },

    text: {
        marginBottom: 3
    }
});