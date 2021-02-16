import React from 'react';
import { Platform } from 'react-native';
import { Provider as ReduxProvider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

// components
import NavigatorProvider from './src/navigator/index';
import { Root } from 'native-base';
import {
  ApplicationProvider,
  Layout,
  Text,
  IconRegistry
} from 'react-native-ui-kitten';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { mapping } from '@eva-design/eva';
import SplashScreen from './src/screens/Splash';

// config
import { store } from './src/redux/store';
import { crowdboticsTheme } from './src/config/crowdboticsTheme';
import { setupHttpConfig } from './src/utils/http';

import { navigate } from 'src/navigator/NavigationService';

const persistor = persistStore(store);

export default class App extends React.Component {
  state = {
    isLoaded: false
  };

  async componentWillMount() {
    Platform.OS === 'ios' &&
      PushNotificationIOS.getInitialNotification().then(notification => {
        if (notification && notification._data && notification._data.course) {
          const {
            id,
            title,
            description,
            image,
            author_name,
            author_image,
            is_enrolled
          } = notification._data.course;

          navigate('Module', {
            id,
            title,
            description,
            image,
            author_name,
            author_image,
            is_enrolled
          });
        }
      });
    /**
     * add any aditional app config here,
     * don't use blocking requests here like HTTP requests since they block UI feedback
     * create HTTP requests and other blocking requests using redux saga
     */
    await this.loadAssets();
    setupHttpConfig();
  }

  loadAssets = async () => {
    // add any loading assets here
    this.setState({ isLoaded: true });
  };

  renderLoading = () => (
    <Layout style={[styles.flex]}>
      <Text>Loading</Text>
    </Layout>
  );

  renderApp = () => (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider mapping={mapping} theme={crowdboticsTheme}>
          <Root>
            <NavigatorProvider style={[styles.flex]}>
              <Layout style={[styles.flex]}>
                <SplashScreen />
              </Layout>
            </NavigatorProvider>
          </Root>
        </ApplicationProvider>
      </PersistGate>
    </ReduxProvider>
  );

  render = () =>
    this.state.isLoaded ? this.renderApp() : this.renderLoading();
}

const styles = { flex: { flex: 1 } };
