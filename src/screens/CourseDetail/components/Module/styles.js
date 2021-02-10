import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    card: {
        flexDirection: 'row',
        height: 75,
        paddingHorizontal: 22,
        paddingVertical: 15,
        borderRadius: 8,
        marginBottom: 15
    },
    icon: {
        alignSelf: 'flex-end',
        fontSize: 36
    },
    text: {
        flex: 1,
        marginRight: 12
    }
});
