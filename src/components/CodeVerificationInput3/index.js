import React from 'react';
import { StyleSheet } from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';

// styles
import colors from 'src/styles/colors';

const CodeVerificationInput3 = ({ onFulfill }) => (
    <OTPInputView
        style={{ width: '100%', height: 50, marginTop: 20 }}
        pinCount={4}
        autoFocusOnLoad
        codeInputFieldStyle={styles.input}
        onCodeFilled={code => onFulfill(code)}
    />
);

const styles = StyleSheet.create({
    input: {
        color: '#000',
        backgroundColor: colors.white,
        fontSize: 25,
        width: 50,
        height: 50,
        borderRadius: 3,
    }
});

export default CodeVerificationInput3;
