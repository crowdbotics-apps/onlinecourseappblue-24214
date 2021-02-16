import React from 'react';
import { connect } from 'react-redux';

// components
import { Container, Content } from 'native-base';
import { Header, Banner, BackIcon, Input, Button } from 'src/components';

// hooks
import useForm from 'src/hooks/useForm';

// actions
import { updatePassword as updatePasswordAction } from '../../redux/actions';

// utils
import validator from 'src/utils/validation';

// styles
import styles from '../../styles';

const UpdatePassword = props => {
    const {
        user,
        requestingPassword,
        backendErrors,
        navigation: { goBack },
    } = props;

    const stateSchema = {
        oldPassword: { value: '', error: '' },
        newPassword: { value: '', error: '' },
        confirmNewPassword: { value: '', error: '' },
    };

    const validationStateSchema = {
        oldPassword: {
            required: true,
            validator: validator.password,
        },
        newPassword: {
            required: true,
            validator: validator.password,
        },
        confirmNewPassword: {
            required: true,
            validator: {
                compare: value => value !== state.newPassword.value,
                error: "Your passwords didn't match.",
            },
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
                <Content showsVerticalScrollIndicator={false}>
                    <Input
                        value={state.oldPassword.value}
                        onChangeText={value => handleOnChange('oldPassword', value)}
                        placeholder="Old Password"
                        secureTextEntry
                        error={state.oldPassword.error || backendErrors.old_password}
                    />
                    <Input
                        value={state.newPassword.value}
                        onChangeText={value => handleOnChange('newPassword', value)}
                        placeholder="New Password"
                        secureTextEntry
                        error={state.newPassword.error || backendErrors.new_password1}
                    />
                    <Input
                        value={state.confirmNewPassword.value}
                        onChangeText={value => handleOnChange('confirmNewPassword', value)}
                        placeholder="Confirm New Password"
                        secureTextEntry
                        error={
                            state.confirmNewPassword.error || backendErrors.new_password2
                        }
                    />

                    <Button
                        text="Next"
                        color="primary"
                        block
                        disabled={disable}
                        loading={requestingPassword}
                        onPress={() =>
                            props.updatePassword({
                                old_password: state.oldPassword.value,
                                new_password1: state.newPassword.value,
                                new_password2: state.confirmNewPassword.value,
                            })
                        }
                        style={styles.updateButton}
                    />
                </Content>
            </Container>
        </>
    );
};

const mapStateToProps = state => ({
    user: state.app.user,
    requestingPassword: state.profile.requestingPassword,
    backendErrors: state.profile.backendErrors,
});

const mapDispatchToProps = dispatch => ({
    updatePassword: data => dispatch(updatePasswordAction(data)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(UpdatePassword);
