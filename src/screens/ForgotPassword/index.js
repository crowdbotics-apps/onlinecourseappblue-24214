import React from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';

// components
import { Image, View, Platform } from 'react-native';
import { Content } from 'native-base';
import {
    Text,
    Input,
    Header,
    BackIcon,
    PhoneInput as RNPhoneInput,
    Button
} from 'src/components';

// hooks
import useForm from 'src/hooks/useForm';

// actions
import { requestPasswordReset as requestPasswordResetAction } from './redux/actions';

// utils
import validator from 'src/utils/validation';

// styles
import commonStyles from 'src/styles/common';

const ForgotPassword = props => {
    const { requesting, backendErrors, navigation: { goBack } } = props;

    const stateSchema = {
        phoneNumber: { value: '', countryCode: '', countryDialCode: '', error: '' },
        password: { value: '', error: '' },
        confirmPassword: { value: '', error: '' }
    };

    const validationStateSchema = {
        phoneNumber: {
            required: true,
            validator: validator.phone
        },
        password: {
            required: true,
            validator: validator.password
        },
        confirmPassword: {
            required: true,
            validator: {
                compare: value => value !== state.password.value,
                error: "Your passwords didn't match."
            }
        }
    };

    const { state, handleOnChange, handlePhoneNumberChange, disable } = useForm(
        stateSchema,
        validationStateSchema
    );

    const requestPasswordReset = () => {
        const { phoneNumber, password } = state;

        props.requestPasswordReset(
            {
                phone_number: `+${phoneNumber.countryDialCode}${phoneNumber.value}`
            },
            password.value
        );
    };

    return (
        <View style={commonStyles.authBg}>
            {Platform.OS === 'ios' && (
                <Header
                    color='transparent'
                    left={
                        <BackIcon color='tertiary' action={() => goBack()} />
                    }
                />
            )}
            <View style={commonStyles.authContainer}>
                <Content showsVerticalScrollIndicator={false}>
                    <Image
                        style={[commonStyles.logo, { marginTop: 0 }]}
                        source={require('../../assets/images/Crowdbotics.png')}
                    />

                    <Text
                        text="Please enter your phone number and new password."
                        color="primary"
                        category="p1"
                    />

                    <RNPhoneInput
                        value={state.phoneNumber.value}
                        onChangeText={handlePhoneNumberChange}
                        error={state.phoneNumber.error || backendErrors.phone_number}
                    />

                    <Input
                        value={state.password.value}
                        onChangeText={value => handleOnChange('password', value)}
                        placeholder="New Password"
                        secureTextEntry
                        error={state.password.error}
                    />
                    <Input
                        value={state.confirmPassword.value}
                        onChangeText={value => handleOnChange('confirmPassword', value)}
                        placeholder="Confirm Password"
                        secureTextEntry
                        error={state.confirmPassword.error}
                    />

                    <Button
                        text="Continue"
                        color="secondary"
                        block
                        disabled={disable}
                        loading={requesting}
                        onPress={() => requestPasswordReset()}
                        style={styles.button}
                    />
                </Content>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        marginTop: 20
    }
});

const mapStateToProps = state => ({
    requesting: state.forgotPassword.requesting,
    backendErrors: state.forgotPassword.backendErrors
});

const mapDispatchToProps = dispatch => ({
    requestPasswordReset: (phoneNumber, password) =>
        dispatch(requestPasswordResetAction(phoneNumber, password))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ForgotPassword);
