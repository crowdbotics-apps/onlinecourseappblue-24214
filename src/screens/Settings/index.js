import React from 'react';
import { View } from 'react-native';
import { Container, Content } from 'native-base';
import { Header, Text, MenuIcon, Button, ListItem } from 'src/components';

// styles
import styles from './styles';

const Settings = () => {

    const { container, heading, title, subscription, button } = styles;

    return (
        <>
            <Header
                color="secondary"
                title='Settings'
                left={<MenuIcon color='secondary' />}
            />
            <Content showsVerticalScrollIndicator={false}>
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
                    <ListItem text='Suggest Classes' value='Yes' />
                    <ListItem text='Industry' value='IT and Design' />
                    <ListItem text='Download Quality' value='HD' />
                    <ListItem text='Video Quality' value='HD' />
                </Container>
            </Content>
        </>
    );
};

export default Settings;
