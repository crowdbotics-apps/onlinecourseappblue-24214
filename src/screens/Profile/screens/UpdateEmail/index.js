import React from 'react';
import { connect } from 'react-redux';

// components
import { Container } from 'native-base';
import { Header, Banner, BackIcon, Input, Button } from 'src/components';

// hooks
import useForm from 'src/hooks/useForm';

// actions
import { updateEmail as updateEmailAction } from '../../redux/actions';

// utils
import validator from 'src/utils/validation';

// styles
import styles from '../../styles';

const UpdateEmail = props => {
    const {
        user,
        requestingEmail,
        backendErrors,
        navigation: { goBack },
    } = props;

    const stateSchema = {
        email: { value: user.email, error: '' },
    };

    const validationStateSchema = {
        email: {
            required: true,
            validator: validator.email,
        },
    };

    const { state, handleOnChange, disable } = useForm(
        stateSchema,
        validationStateSchema,
    );

    return (
        <>
            <Header
                color="secondary"
                left={<BackIcon color="secondary" action={() => goBack()} />}
            />
            <Banner name={user.name} image={user.image} large />

            <Container style={[styles.container, styles.updateContainer]}>
                <Input
                    value={state.email.value}
                    onChangeText={value => handleOnChange('email', value)}
                    placeholder="Email"
                    keyboardType="email-address"
                    error={state.email.error || backendErrors.email}
                />

                <Button
                    text="Update"
                    color="primary"
                    block
                    disabled={disable}
                    loading={requestingEmail}
                    onPress={() =>
                        props.updateEmail({ id: user.id, email: state.email.value })
                    }
                    style={styles.updateButton}
                />
            </Container>
        </>
    );
};

const mapStateToProps = state => ({
    user: state.app.user,
    requestingEmail: state.profile.requestingEmail,
    backendErrors: state.profile.backendErrors,
});

const mapDispatchToProps = dispatch => ({
    updateEmail: data => dispatch(updateEmailAction(data)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(UpdateEmail);
