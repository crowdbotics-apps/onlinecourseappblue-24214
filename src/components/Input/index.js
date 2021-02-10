import React from 'react';

// components
import { Input as UIKInput } from 'react-native-ui-kitten';
import Error from 'src/components/Error';

// styles
import Colors from 'src/styles/colors';
import Styles from './styles';

const Input = ({
    value,
    onChangeText,
    placeholder,
    secureTextEntry,
    keyboardType = 'default',
    onSubmitEditing,
    returnKeyType,
    maxLength,
    style,
    error,
    transparent,
    autoFocus,
    multiline
}) => {

    const { input, text, height, transparentInput, transparentInputText, multilineInput } = Styles;
    return (
        <>
            <UIKInput
                value={value}
                secureTextEntry={secureTextEntry}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={Colors.doveGray}
                size="small"
                style={[
                    input,
                    !multiline && height,
                    style,
                    transparent && transparentInput]}
                keyboardType={keyboardType}
                textStyle={[
                    text,
                    !multiline && height,
                    transparent && transparentInputText,
                    multiline && multilineInput
                ]}
                autoCapitalize="none"
                autoFocus={autoFocus}
                maxLength={maxLength}
                onSubmitEditing={() => onSubmitEditing && onSubmitEditing()}
                returnKeyType={returnKeyType}
                multiline={multiline}
            />
            <Error errors={error} />
        </>
    );
};

export default Input;
