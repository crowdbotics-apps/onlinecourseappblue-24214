import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    small: {
        width: 23,
        height: 23
    },

    medium: {
        width: 45,
        height: 45
    },

    large: {
        width: 96,
        height: 96
    },

    imageWrapper: {
        position: 'relative'
    },

    image: {
        borderRadius: 50
    },

    editIconWrapper: {
        borderRadius: 50,
        backgroundColor: '#8B8B8B',
        position: 'absolute',
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
    },

    editIcon: { fontSize: 20, color: '#fff' }
});
