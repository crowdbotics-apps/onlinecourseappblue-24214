import { Alert } from 'react-native';

export const errorAlert = (err, header = 'Error') => {
    Alert.alert(header, err, [{ text: 'OK' }], {
        cancelable: false
    });
};

export const successAlert = msg => {
    Alert.alert('Congratulations!', msg, [{ text: 'OK' }], {
        cancelable: false
    });
};
