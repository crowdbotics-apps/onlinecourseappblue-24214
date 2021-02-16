import React from 'react';
import { connect } from 'react-redux';

// components
import { ActivityIndicator } from 'react-native';
import { Container } from 'native-base';
import {
    Header,
    Banner,
    BackIcon,
    Text,
    CodeVerificationInput
} from 'src/components';

// actions
import { verifyOTP as verifyOTPAction } from '../../redux/actions';

// styles
import styles from '../../styles';

const OTP = props => {
    const {
        user,
        requestingOTP,
        route: {
            params: { type, email_or_number }
        },
        navigation: { goBack, pop }
    } = props;

    return (
        <>
            <Header
                color="secondary"
                left={<BackIcon color="secondary" action={() => goBack()} />}
            />
            <Banner name={user.name} large />

            <Container style={[styles.container, { paddingHorizontal: 22 }]}>
                <Text
                    text={`Please enter the OTP that you will receive shortly over your ${type === 'email' ? 'email address.' : 'phone number.'
                        }.`}
                />
                <CodeVerificationInput
                    onFulfill={code =>
                        props.verifyOTP(
                            { key: code, id: user.id, [type]: email_or_number },
                            pop
                        )
                    }
                />
                {requestingOTP && <ActivityIndicator size="large" color="#95C4DB" />}
            </Container>
        </>
    );
};

const mapStateToProps = state => ({
    user: state.app.user,
    requestingOTP: state.profile.requestingOTP
});

const mapDispatchToProps = dispatch => ({
    verifyOTP: (data, callback) => dispatch(verifyOTPAction(data, callback))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OTP);
