import React, { useEffect } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content } from 'native-base';
import {
    Header,
    Text,
    ExitIcon,
    Button,
    ListItem,
    Footer,
    DataAvailability
} from 'src/components';

// constants
import { Industries, downloadQuality, videoQuality } from './constants';

// actions
import { cancelSubscription } from 'src/screens/Subscription/redux/actions';

// styles
import styles from './styles';

const Settings = props => {
    const {
      user: { subscription_plan },
      requesting,
      settings,
      requestingUpdate,
      requestingCancelSubscription,
      navigation: { goBack, navigate }
    } = props;

    const onPressSubmit = () => {
        if (subscription_plan) {
          props.cancelSubscription();
        } else {
          navigate('UpdateSubscription');
        }
    };

    const { suggest_class, industry, download_quality, video_quality } = settings;

    const {
        container,
        heading,
        title,
        containerMain,
        contentWrapper,
        subscription,
        dataWrapper,
        button
    } = styles;

    return (
        <>
            <Header
                color="secondary"
                title="Settings"
                left={<ExitIcon color="secondary" action={() => goBack()} />}
            />
            <Container style={containerMain}>
                <Content
                    showsVerticalScrollIndicator={false}
                    style={contentWrapper}
                >
                    <DataAvailability
                        requesting={requesting}
                        hasData={Boolean(settings)}
                        style={dataWrapper}
                    >
                        <View style={heading}>
                            <Text
                                text="Current Subscription"
                                category="h6"
                                style={title}
                                bold
                            />
                            <Text
                                text={subscription_plan ? 'Premium' : 'Free'}
                                color="septenary"
                                category="s2"
                                style={subscription}
                                bold
                            />
                        </View>
                            <Button
                                text={
                                    subscription_plan ? 'CANCEL SUBSCRIPTION' : 'UPGRDE TO PREMIUM'
                                }
                                style={button}
                                color="primary"
                                loading={requestingUpdate || requestingCancelSubscription}
                                disabled={requestingUpdate || requestingCancelSubscription}
                                block
                                onPress={onPressSubmit}
                            />
                        <ListItem
                            text="Suggest Classes"
                            value={suggest_class ? 'Yes': 'No'}
                            onPress={() => navigate('UpdateSettings')}
                        />
                        <ListItem
                            text="Industry"
                            value={industry && Industries[industry - 1].title}
                            onPress={() => navigate('UpdateSettings')}
                        />
                        {/* <ListItem
                            text='Download Quality'
                            value={download_quality && downloadQuality[download_quality - 1].title}
                            onPress={() => navigate('UpdateSettings')}
                        /> */}
                        <ListItem
                            text="Video Quality"
                            value={
                                video_quality && videoQuality[video_quality - 1].title
                            }
                            onPress={() => navigate('UpdateSettings')}
                        />
                    </DataAvailability>
                </Content>
                <Footer props={props} activeScreen="Settings" />
            </Container>
        </>
    );
};

const mapStateToProps = state => ({
    user: state.app.user,
    settings: state.settings.settings,
    requesting: state.settings.requesting,
    requestingUpdate: state.settings.requestingUpdate,
    requestingCancelSubscription: state.subscription.requestingUpdate
});

const mapDispatchToProps = dispatch => ({
    cancelSubscription: () => dispatch(cancelSubscription())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Settings);
