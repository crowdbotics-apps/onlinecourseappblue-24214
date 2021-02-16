import React from 'react';
import { View } from 'react-native';
import { Container } from 'native-base';
import { Header, Text, ExitIcon, Button } from 'src/components';

// styles
import styles from './styles';

const Subscription = () => {

    const { container, heading, title, subscription, button } = styles;

    return (
        <>
            <Header
                color="secondary"
                title='Subscription'
                left={<ExitIcon color='secondary' />}
            />
            <Container style={container}>
                <View style={heading}>
                    <Text text="Current Subscription" category="h6" style={title} />
                    <Text text="Free" color='septenary' category="s2" style={subscription} />
                </View>
                <Button
                    text='UPGRDE TO PREMIUM'
                    style={button}
                    color="primary"
                    block
                />
            </Container>
        </>
    );
};

export default Subscription;
