import React from 'react';
import { connect } from 'react-redux';

// components
import { Container, Content } from 'native-base';
import { Header, Banner, BackIcon, Input, Button } from 'src/components';

// hooks
import useForm from 'src/hooks/useForm';

// actions
import { updateFullName as updateFullNameAction } from '../../redux/actions';

// utils
import validator from 'src/utils/validation';

// styles
import styles from '../../styles';

const UpdateFullName = props => {
    const {
        user,
        requestingFullName,
        backendErrors,
        navigation: { goBack },
    } = props;

    const stateSchema = {
        fullName: { value: user.name, error: '' },
    };

    const validationStateSchema = {
        fullName: {
            required: true,
            validator: validator.name,
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
                        value={state.fullName.value}
                        onChangeText={value => handleOnChange('fullName', value)}
                        placeholder="Full Name"
                        error={state.fullName.error || backendErrors.name}
                    />

                    <Button
                        text="Update"
                        color="primary"
                        block
                        disabled={disable}
                        loading={requestingFullName}
                        onPress={() =>
                            props.updateFullName({ id: user.id, name: state.fullName.value })
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
    requestingFullName: state.profile.requestingFullName,
    backendErrors: state.profile.backendErrors,
});

const mapDispatchToProps = dispatch => ({
    updateFullName: data => dispatch(updateFullNameAction(data)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(UpdateFullName);
