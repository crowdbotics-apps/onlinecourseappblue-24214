import React, { Component } from "react";
import { StyleSheet, Image, View } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';

import colors from 'src/styles/colors';

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
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/Crowdbotics.png')}
          style={styles.logo}
        />
      </View>
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
    justifyContent: 'center',
    backgroundColor: colors.morningGlory
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
