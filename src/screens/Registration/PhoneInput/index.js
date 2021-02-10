import React from 'react';
import { connect } from 'react-redux';

// components
import { Image, ImageBackground, View, Platform, StyleSheet } from 'react-native';
import { Content } from 'native-base';
import {
    Text,
    Header,
    BackIcon,
    PhoneInput as RNPhoneInput,
    Button
} from 'src/components';

// hooks
import useForm from 'src/hooks/useForm';

// actions
import { register as registerAction } from '../redux/actions';

// utils
import validator from 'src/utils/validation';

// styles
import commonStyles from 'src/styles/common';

const PhoneInput = props => {
    const {
        requesting,
        serverErrors,
        navigation: { goBack }
    } = props;

    const stateSchema = {
        phoneNumber: {
            value: '',
            countryCode: '',
            countryDialCode: '',
            error: ''
        }
    };

    const validationStateSchema = {
        phoneNumber: {
            required: true,
            validator: validator.phone
        }
    };

    const { state, handlePhoneNumberChange, disable } = useForm(
        stateSchema,
        validationStateSchema
    );

    const register = () => {
        const { phoneNumber } = state;

        props.register({
            name: props.userData.name,
            email: props.userData.email,
            phone_number: `+${phoneNumber.countryDialCode}${phoneNumber.value}`,
            country_code: phoneNumber.countryCode,
            country_dial_code: phoneNumber.countryDialCode,
            password1: props.userData.password,
            image: null,
        });
    };

    return (
        <ImageBackground
            source={require('../../../assets/images/authBg.png')}
            style={commonStyles.authBgImage}
        >
            {Platform.OS === 'ios' && (
                <Header color="transparent" left={<BackIcon color="tertiary" action={() => goBack()} />} />
            )}
            <View style={commonStyles.authContainer}>
                <Content showsVerticalScrollIndicator={false}>
                    <Image
                        style={[commonStyles.logo, { marginTop: 0 }]}
                        source={require('../../../assets/images/Elevate.png')}
                    />

                    <Text
                        text="Please enter your phone number."
                        color="primary"
                        category="p1"
                    />

                    <RNPhoneInput
                        value={state.phoneNumber.value}
                        onChangeText={handlePhoneNumberChange}
                        error={state.phoneNumber.error || serverErrors.phone_number}
                    />

                    <Button
                        text="Continue"
                        color="secondary"
                        block
                        disabled={disable}
                        loading={requesting}
                        onPress={() => register()}
                        style={styles.button}
                    />
                </Content>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    button: {
        marginTop: 20
    }
});

const mapStateToProps = state => ({
    requesting: state.registration.requesting,
    serverErrors: state.registration.serverErrors,
    userData: state.registration.userData
});

const mapDispatchToProps = dispatch => ({
    register: data => dispatch(registerAction(data))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PhoneInput);
