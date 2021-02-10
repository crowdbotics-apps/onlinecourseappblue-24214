import React from 'react';
import { connect } from 'react-redux';

// components
import { Container } from 'native-base';
import { Header, Banner, BackIcon, PhoneInput, Button } from 'src/components';

// hooks
import useForm from 'src/hooks/useForm';

// actions
import { updatePhoneNumber as updatePhoneNumberAction } from '../../redux/actions';

// utils
import validator from 'src/utils/validation';

// styles
import styles from '../../styles';

const UpdatePhoneNumber = props => {
    const {
        user,
        requestingPhoneNumber,
        backendErrors,
        navigation: { goBack }
    } = props;

    const stateSchema = {
        phoneNumber: {
            value: user.phone_number
                ? user.phone_number.substring(user.country_dial_code.length + 1)
                : '',
            countryCode: user.country_code,
            countryDialCode: user.country_dial_code,
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

    return (
        <>
            <Header
                color="secondary"
                left={<BackIcon color="secondary" action={() => goBack()} />}
            />
            <Banner name={user.name} image={user.image} large />

            <Container style={[styles.container, styles.updateContainer]}>
                <PhoneInput
                    countryCode={state.phoneNumber.countryCode}
                    value={state.phoneNumber.value}
                    onChangeText={handlePhoneNumberChange}
                    error={state.phoneNumber.error || backendErrors.phone_number}
                />
                <Button
                    text="Update"
                    color="primary"
                    block
                    disabled={disable}
                    loading={requestingPhoneNumber}
                    onPress={() =>
                        props.updatePhoneNumber({
                            id: user.id,
                            phone_number: `+${state.phoneNumber.countryDialCode}${state.phoneNumber.value
                                }`,
                            country_code: state.phoneNumber.countryCode,
                            country_dial_code: state.phoneNumber.countryDialCode
                        })
                    }
                    style={styles.updateButton}
                />
            </Container>
        </>
    );
};

const mapStateToProps = state => ({
    user: state.app.user,
    requestingPhoneNumber: state.profile.requestingPhoneNumber,
    backendErrors: state.profile.backendErrors
});

const mapDispatchToProps = dispatch => ({
    updatePhoneNumber: data => dispatch(updatePhoneNumberAction(data))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UpdatePhoneNumber);
