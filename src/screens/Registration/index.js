import React from 'react';
import { connect } from 'react-redux';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { LoginManager, AccessToken } from 'react-native-fbsdk';

// hooks
import useForm from 'src/hooks/useForm';

// components
import { View, Image, ImageBackground, Linking, Platform } from 'react-native';
import { Content, Icon } from 'native-base';
import { Header, Text, Input, Button, BackIcon } from 'src/components';

// actions
import { verifyUser } from './redux/actions';
import {
    facebookLogin as facebookLoginAction,
    appleLogin as appleLoginAction
} from 'src/screens/Login/redux/actions';

//utils
import validator from 'src/utils/validation';

// styles
import styles from './styles';
import commonStyles from 'src/styles/common';

const Registration = props => {
    const {
        navigation: { navigate, goBack },
        requesting,
        requestingApple,
        requestingFacebook,
        serverErrors
    } = props;

    const stateSchema = {
        name: { value: '', error: '' },
        email: { value: '', error: '' },
        password: { value: '', error: '' },
        confirmPassword: { value: '', error: '' }
    };

    const validationStateSchema = {
        name: {
            required: true,
            validator: validator.name
        },
        email: {
            required: true,
            validator: validator.email
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

    const { state, handleOnChange, disable } = useForm(
        stateSchema,
        validationStateSchema
    );

    const renderImage = () => {
        return (
            <Image
                style={commonStyles.logo}
                source={require('../../assets/images/Elevate.png')}
            />
        );
    };

    const appleLogin = async () => {
        try {
            const credential = await appleAuth.performRequest({
                requestedOperation: appleAuth.Operation.LOGIN,
                requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME]
              });

              let name;
              if (credential.fullName) {
                if (credential.fullName.givenName || credential.fullName.familyName) {
                  name = '';
                  if (credential.fullName.givenName) {
                    name = name + credential.fullName.givenName;
                  }
                  if (credential.fullName.familyName) {
                    name = name + ' ' + credential.fullName.familyName;
                  }
                }
              }

              const data = {
                access_token: credential.authorizationCode
              }
              if (name) {
                data.name = name;
              }
              props.appleLogin(data);
        } catch(e) {
            if (e.code === '1001') {
                alert('Sign up was cancelled.');
            } else {
                alert('Sign up failed.');
            }
        }
    }

    const facebookLogin = async () => {
        try {
            const result = await LoginManager.logInWithPermissions([
                'public_profile',
                'email'
            ]);
            if (result.isCancelled) {
                alert('Login was cancelled');
            } else {
                AccessToken.getCurrentAccessToken().then(data => {
                    props.facebookLogin(data.accessToken.toString());
                });
            }
        } catch (error) {
            alert(`Login failed with error: ${error}`);
        }
    };

    const handleVerifyUser = () => {
        const { name, email, password } = state;

        props.verifyUser({
            name: name.value,
            email: email.value,
            password: password.value
        });
    };

    return (
        <ImageBackground
            source={require('../../assets/images/authBg.png')}
            style={commonStyles.authBgImage}
        >
            {Platform.OS === 'ios' && (
                <Header
                    color='transparent'
                    left={
                        <BackIcon color='tertiary' action={() => goBack()} />
                    }
                />
            )}
            <View style={commonStyles.authContainer}>
                {renderImage()}
                <Content showsVerticalScrollIndicator={false}>
                    <Input
                        value={state.name.value}
                        onChangeText={value => handleOnChange('name', value)}
                        placeholder="Full Name"
                        error={state.name.error || serverErrors.name}
                    />
                    <Input
                        value={state.email.value}
                        onChangeText={value => handleOnChange('email', value)}
                        placeholder="Email"
                        keyboardType="email-address"
                        error={state.email.error || serverErrors.email}
                    />
                    <Input
                        value={state.password.value}
                        onChangeText={value => handleOnChange('password', value)}
                        placeholder="Password"
                        secureTextEntry
                        error={state.password.error || serverErrors.password}
                    />
                    <Input
                        value={state.confirmPassword.value}
                        onChangeText={value => handleOnChange('confirmPassword', value)}
                        placeholder="Confirm Password"
                        secureTextEntry
                        error={state.confirmPassword.error}
                    />

                    <Button
                        text="SIGN UP"
                        color="secondary"
                        onPress={() => handleVerifyUser()}
                        disabled={disable || requestingFacebook || requestingApple}
                        loading={requesting}
                        block
                        style={styles.signUp}
                    />

                    <Text
                        text="or"
                        color="primary"
                        style={styles.orText}
                        center
                    />

                    <Button
                        text="SIGN UP WITH FACEBOOK"
                        color="facebook"
                        block
                        icon
                        loading={requestingFacebook}
                        disabled={requestingApple}
                        left={
                            <Icon
                                type="FontAwesome"
                                name="facebook"
                                style={styles.socialIcon}
                            />
                        }
                        onPress={() => facebookLogin()}
                    />

                    <Button
                        text="SIGN UP WITH APPLE"
                        color="apple"
                        block
                        icon
                        style={styles.appleBtn}
                        loading={requestingApple}
                        disabled={requestingFacebook}
                        onPress={() => appleLogin()}
                        left={
                            <Icon
                                type="FontAwesome"
                                name="apple"
                                style={[styles.socialIcon, styles.appleIcon]}
                            />
                        }
                    />

                    <Text
                        text="Already have an account?"
                        color="primary"
                        style={styles.alreadyText}
                        center
                    />

                    <Button
                        text="SIGN IN"
                        color="secondary"
                        block
                        disabled={requestingFacebook || requestingApple}
                        onPress={() => navigate('Login')}
                        style={styles.signIn}
                    />

                    <Text color="primary" style={styles.privacy} center>
                        By continuing, you agree to Elevate's{' '}
                        <Text
                            text="Privacy Policy."
                            color="primary"
                            underlined
                            onPress={() =>
                                Linking.openURL(
                                    'http://trueskycu.org/wp-content/uploads/2020/08/Privacy_Notice_tscu.pdf'
                                )
                            }
                            bold
                            style={styles.privacy}
                        />
                    </Text>
                </Content>
            </View>
        </ImageBackground>
    );
};

const mapStateToProps = state => ({
    requesting: state.registration.requesting,
    requestingApple: state.login.requestingApple,
    requestingFacebook: state.login.requestingFacebook,
    serverErrors: state.registration.serverErrors
});

const mapDispatchToProps = dispatch => ({
    verifyUser: data => dispatch(verifyUser(data)),
    facebookLogin: accessToken => dispatch(facebookLoginAction(accessToken)),
    appleLogin: data => dispatch(appleLoginAction(data))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Registration);
