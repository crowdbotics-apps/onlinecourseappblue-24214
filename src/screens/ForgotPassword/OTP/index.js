import React from 'react';
import { connect } from 'react-redux';

// components
import { Image, View, ActivityIndicator, SafeAreaView } from 'react-native';
import { Content } from 'native-base';
import { Text, CodeVerificationInput3 } from 'src/components';

// actions
import { verifyPasswordReset as verifyPasswordResetAction } from '../redux/actions';

// styles
import styles from './styles';
import commonStyles from 'src/styles/common';

const OTP = props => {
  const verifyPasswordReset = code => {
    props.verifyPasswordReset({
      password: props.route.params,
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
          style={styles.otpText}
        />
        <Text
          text="Enter your OTP code that you will receive shortly as a SMS:"
          category="p2"
          color="primary"
          style={styles.otpDescription}
        />

        <CodeVerificationInput3 onFulfill={code => verifyPasswordReset(code)} />
        {props.requesting && (
          <ActivityIndicator
            size="large"
            color="#fff"
            style={styles.otpLoader}
          />
        )}
      </Content>
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  requesting: state.forgotPassword.requesting
});

const mapDispatchToProps = dispatch => ({
  verifyPasswordReset: data => dispatch(verifyPasswordResetAction(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OTP);
