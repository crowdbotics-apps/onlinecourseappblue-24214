import { StyleSheet } from 'react-native';
import colors from 'src/styles/colors';

export default StyleSheet.create({
    container: {
        backgroundColor: colors.whisper
    },
    content: {
        paddingHorizontal: 22
    },
    courseWrapper: {
        paddingVertical: 30
    },
    categoryData: {
        paddingVertical: 30
    },
    input: {
        marginTop: 0
    },
    heading: {
        marginVertical: 17
    },
    scroll: {
        flexGrow: 0
    },
    categoryWrapper: {
        flexDirection: 'row',
        marginTop: 30,
        marginBottom: 25
    },
    categoryHeading: {
        flex: 3
    },
    filterIcon: {
        flex: 0,
        alignSelf: 'flex-end',
        backgroundColor: colors.biscay,
        padding: 8,
        borderRadius: 8
    },
    icon: {
        fontSize: 16,
        color: colors.white
    },
});
