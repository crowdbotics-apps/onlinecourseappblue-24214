import React from 'react';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

// components
import { Image } from 'react-native';
import { Container, View } from 'native-base';
import { Text, Button } from 'src/components';

// actions
import { setAuthToken, setUserInfo } from 'src/screens/App/redux/actions';

// styles
import styles from './styles';

const Welcome = props => {
    const { route: { params } } = props;
    const { imageWrapper, logo, content, title, button } = styles;

    const login = async () => {
        await AsyncStorage.setItem('authToken', params.token);
        await AsyncStorage.setItem('user', JSON.stringify(params.user));

        props.setAuthToken(params.token);
        props.setUserInfo(params.user);
    };

    return (
        <>
            <Container>
                <View style={imageWrapper}>
                    <Image
                        source={require('../../assets/images/Elevate-logo-text.png')}
                        style={logo}
                    />
                </View>
                <View style={content}>
                    <Text
                        text="Welcome to ELEVATE!"
                        category="h2"
                        center
                        bold
                        style={title}
                    />
                    <Text text="brought to you by" category="p1" center bold />
                    <Text text="True Sky Credit Union" category="p1" center bold />
                    <Button
                        text="SELECT FROM COURSES"
                        color="primary"
                        block
                        onPress={() => login()}
                        style={button}
                    />
                </View>
            </Container>
        </>
    );
};

const mapDispatchToProps = dispatch => ({
    setAuthToken: token => dispatch(setAuthToken(token)),
    setUserInfo: info => dispatch(setUserInfo(info))
});

export default connect(
    null,
    mapDispatchToProps
)(Welcome);
