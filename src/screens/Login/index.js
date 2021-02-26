import React from 'react';
import { connect } from 'react-redux';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import Clipboard from '@react-native-community/clipboard';

// components
import { Image, View, SafeAreaView } from 'react-native';
import { Content, Icon } from 'native-base';
import { Text, Input, Button, HorizontalRule } from 'src/components';

// hooks
import useForm from 'src/hooks/useForm';

// utils
import validator from 'src/utils/validation';

// actions
import {
    login as loginAction,
    facebookLogin as facebookLoginAction,
    appleLogin as appleLoginAction
} from './redux/actions';

// styles
import styles from './styles';
import commonStyles from 'src/styles/common';

const Login = props => {
    const {
        navigation: { navigate },
        requesting,
        requestingApple,
        requestingFacebook
    } = props;

    const stateSchema = {
        email: { value: '', error: '' },
        password: { value: '', error: '' }
    };

    const validationStateSchema = {
        email: {
            required: true,
            validator: validator.email,
        },
        password: {
            required: true,
        }
    };

    const { state, handleOnChange, disable } = useForm(
        stateSchema,
        validationStateSchema
    );

    const login = () => {
        const { email, password } = state;

        props.login({
            email: email.value,
            password: password.value,
        });
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
              Clipboard.setString(credential.authorizationCode);
        } catch(e) {
            if (e.code === '1001') {
                alert('Login was cancelled.');
            } else {
                alert('Login failed.');
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
                    console.log('data.accessToken.toString()', data.accessToken.toString());
                    props.facebookLogin(data.accessToken.toString());
                });
            }
        } catch (e) {
            alert(`Login failed with error: ${e}`);
        }
    };

    return (
        <View style={commonStyles.authBg}>
            <View style={commonStyles.authContainer}>
                <SafeAreaView>
                    <Image
                        style={commonStyles.logo}
                        source={require('../../assets/images/Crowdbotics.png')}
                    />
                </SafeAreaView>
                <Content showsVerticalScrollIndicator={false}>
                    <Input
                        value={state.email.value}
                        onChangeText={value => handleOnChange('email', value)}
                        placeholder="Email"
                        keyboardType="email-address"
                        error={state.email.error}
                    />
                    <Input
                        value={state.password.value}
                        onChangeText={value => handleOnChange('password', value)}
                        placeholder="Password"
                        secureTextEntry
                        error={state.password.error}
                    />

                    <Text
                        text="Forgot Password?"
                        color="primary"
                        underlined
                        center
                        onPress={
                            () => !requestingFacebook && !requestingApple && navigate('ForgotPassword')
                        }
                        style={styles.forgotText}
                    />

                    <Button
                        text="LOG IN"
                        color="secondary"
                        onPress={() => login()}
                        loading={requesting}
                        disabled={disable || requestingFacebook || requestingApple}
                        block
                    />

                    <Text
                        text="or"
                        color="primary"
                        style={styles.orText}
                        center
                    />

                    <Button
                        text="Sign in with Facebook"
                        color="facebook"
                        block
                        icon
                        loading={requestingFacebook}
                        disabled={requestingApple}
                        onPress={() => facebookLogin()}
                        left={
                            <Icon
                                type="FontAwesome"
                                name="facebook"
                                style={styles.socialIcon}
                            />
                        }
                    />
                    {/* <Button
                        text="Sign in with Apple"
                        color="apple"
                        block
                        icon
                        style={styles.appleBtn}
                        dis
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
                    /> */}

                    <HorizontalRule />

                    <Text
                        text="Not yet registered?"
                        color="primary"
                        style={styles.registerText}
                        center
                    />

                    <Button
                        text="CREATE ACCOUNT"
                        color="secondary"
                        block
                        disabled={requestingFacebook || requestingApple}
                        onPress={() => navigate('Registration')}
                        style={styles.register}
                    />
                    {/* <Image source={require('../../assets/images/truesky-logo.png')} style={styles.trueSkyLogo} /> */}
                </Content>
            </View>
        </View>
    );
};

const mapStateToProps = state => ({
    requesting: state.login.requesting,
    requestingApple: state.login.requestingApple,
    requestingFacebook: state.login.requestingFacebook,
    user: state.app.user,
    token: state.app.authToken,
});

const mapDispatchToProps = dispatch => ({
    login: data => dispatch(loginAction(data)),
    facebookLogin: accessToken => dispatch(facebookLoginAction(accessToken)),
    appleLogin: data => dispatch(appleLoginAction(data))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Login);
