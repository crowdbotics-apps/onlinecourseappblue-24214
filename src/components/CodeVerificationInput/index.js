import React from 'react';
import { StyleSheet } from 'react-native';

// components
import Input from 'react-native-confirmation-code-input';

// styles
import colors from 'src/styles/colors';

const CodeVerificationInput = ({ onFulfill }) => {
    return (
        <Input
            keyboardType="number-pad"
            space={20}
            size={50}
            cellBorderWidth={5}
            codeLength={4}
            codeInputStyle={styles.codeInput}
            activeColor={colors.black}
            inactiveColor="#A0A0A0"
            onFulfill={code => onFulfill(code)}
        />
    )
};

const styles = StyleSheet.create({
    codeInput: {
        fontSize: 28,
        backgroundColor: colors.white,
        borderRadius: 3,
        borderColor: colors.white,
    }
});

export default CodeVerificationInput;
