import React from 'react';

// components
import { Image, StyleSheet, Linking } from 'react-native';
import { Content } from 'native-base';
import { Header, BackIcon, Text } from 'src/components';

// styles
import colors from 'src/styles/colors';
import commonStyles from 'src/styles/common';

// constants
import { aboutUs } from '../constants';

const AboutUs = props => {
    const {
        navigation: { goBack }
    } = props;
    const { container, description, heading } = styles;

    return (
        <>
            <Header
                color="primary"
                title="About Us"
                left={<BackIcon action={() => goBack()} />}
            />
            <Content style={container} showsVerticalScrollIndicator={false}>
                <Image
                    style={commonStyles.logo}
                    source={require('../../../../assets/images/Elevate-biscay-text.png')}
                />
                <Text text="About Us" category="h5" bold style={heading} />
                <Text color="septenary" category="s1" style={description}>
                    {aboutUs}
                    <Text
                        text="www.TrueSkyCU.org."
                        color="undenary"
                        category="s1"
                        underlined
                        style={description}
                        onPress={() => Linking.openURL('https://TrueSkyCU.org')}
                    />
                </Text>
            </Content>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 22,
        backgroundColor: colors.whisper
    },

    heading: {
        marginVertical: 17
    },

    description: {
        textAlign: 'left'
    }
});

export default AboutUs;
