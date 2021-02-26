import React from 'react';
import { connect } from 'react-redux';

// components
import {
  Image,
  ActivityIndicator,
  StyleSheet,
  View,
  SafeAreaView
} from 'react-native';
import { Content } from 'native-base';
import { Text, CodeVerificationInput3, Button } from 'src/components';

// actions
import { verifyPhone as verifyPhoneAction, resendOTP } from '../redux/actions';

// styles
import commonStyles from 'src/styles/common';

const OTP = props => {
  const verifyPhone = code => {
    props.verifyPhone({
      email_or_number: props.userData.phone_number,
      key: code
    });
  };

  return (
    <View style={commonStyles.authBg}>
      <View style={commonStyles.authContainer}>
        <SafeAreaView>
          <Image
            style={commonStyles.logo}
            source={require('../../../assets/images/Crowdbotics.png')}
          />
        </SafeAreaView>

        <Content showsVerticalScrollIndicator={false}>
          <Text
            text="Mobile Verification"
            category="h3"
            color="primary"
            center
            style={styles.text}
          />
          <Text
            text="Enter your OTP code that you will receive shortly as a SMS:"
            category="p2"
            color="primary"
            style={styles.description}
          />

          <CodeVerificationInput3 onFulfill={code => verifyPhone(code)} />
          {props.requesting && (
            <ActivityIndicator
              size="large"
              color="#fff"
              style={styles.loader}
            />
          )}
        </Content>
        <Button
          text="Resend OTP"
          color="secondary"
          block
          disabled={props.requesting}
          loading={props.requestingOTP}
          onPress={() =>
            props.resendOTP({
              email_or_number: props.userData.phone_number
            })
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    marginTop: 10
  },
  description: {
    marginVertical: 10
  },
  loader: {
    marginTop: 15
  }
});

const mapStateToProps = state => ({
  requesting: state.registration.requesting,
  requestingOTP: state.registration.requestingOTP,
  serverErrors: state.registration.serverErrors,
  userData: state.registration.userData
});

const mapDispatchToProps = dispatch => ({
  verifyPhone: data => dispatch(verifyPhoneAction(data)),
  resendOTP: phoneNumber => dispatch(resendOTP(phoneNumber))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OTP);
