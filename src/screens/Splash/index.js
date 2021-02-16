import React, { Component } from "react";
import { StyleSheet, Image, ImageBackground } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';

export default class SplashScreen extends Component {
  componentDidMount() {
    setTimeout(() => this.navigate(), 2000);
  }

  navigate = async () => {
    const {
      navigation: { replace },
    } = this.props;
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      replace('Home');
    } else {
      replace('Login');
    }
  };

  render() {
    return (
      <ImageBackground
        source={require('../../assets/images/authBg.png')}
        style={styles.container}
      >
        <Image source={require('../../assets/images/Elevate.png')} style={styles.logo} />
        <Image source={require('../../assets/images/truesky-logo.png')} style={styles.trueSkyLogo} />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    resizeMode: 'cover',
    paddingHorizontal: 40,
    paddingVertical: 60,
    justifyContent: 'center'
  },
  logo: {
    flex: 1,
    height: 140,
    width: '100%',
    resizeMode: 'contain'
  },
  trueSkyLogo: {
    height: 60,
    resizeMode: 'contain'
  }
});
