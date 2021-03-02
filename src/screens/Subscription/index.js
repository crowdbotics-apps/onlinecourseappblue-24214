import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Container } from 'native-base';
import { Header, Text, ExitIcon, Button } from 'src/components';

// styles
import styles from './styles';

const Subscription = props => {
    const {
        user: { subscription_plan },
        navigation: { navigate, goBack }
    } = props;

    const { container, heading, title, subscription, button } = styles;

    return (
        <>
            <Header
                color="secondary"
                title="Subscription"
                left={<ExitIcon color="secondary" action={() => goBack()} />}
            />
            <Container style={container}>
                <View style={heading}>
                    <Text text="Current Subscription" category="h6" style={title} bold />
                    <Text
                        text={subscription_plan ? 'Premium' : 'Free'}
                        color="septenary"
                        category="s2"
                        style={subscription}
                    />
                </View>
                <Button
                    text={subscription_plan ? 'UPDATE PLAN' : 'UPGRDE TO PREMIUM'}
                    onPress={() => navigate('UpdateSubscription')}
                    style={button}
                    color="primary"
                    block
                />
            </Container>
        </>
    );
};

const mapStateToProps = state => ({
    user: state.app.user
});

export default connect(
    mapStateToProps,
    {}
)(Subscription);
