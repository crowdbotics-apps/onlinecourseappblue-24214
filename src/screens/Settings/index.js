import React, { useEffect } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content } from 'native-base';
import { Header, Text, ExitIcon, Button, ListItem, DataAvailability } from 'src/components';

// constants
import { Industries, downloadQuality, videoQuality } from './constants';

// actions
import { updateSettings } from './redux/actions';

// styles
import styles from './styles';

const Settings = props => {
    const {
        requesting,
        settings,
        requestingUpdate,
        navigation: { goBack, navigate }
    } = props;

    const { id, is_premium, suggest_class, industry, download_quality, video_quality } = settings;

    const updateData = () => {
        props.updateSettings(id, { is_premium: true });
    }

    const { container, heading, title, subscription, dataWrapper, button } = styles;

    return (
        <>
            <Header
                color="secondary"
                title='Settings'
                left={<ExitIcon color="secondary" action={() => goBack()} />}
            />
            <Container style={container}>
                <Content showsVerticalScrollIndicator={false}>
                    <DataAvailability
                        requesting={requesting}
                        hasData={Boolean(settings)}
                        style={dataWrapper}
                    >
                        <View style={heading}>
                            <Text text="Current Subscription" category="h6" style={title} bold />
                            <Text text={is_premium ? "Premium" : "Free"} color='septenary' category="s2" style={subscription} bold />
                        </View>
                        {!is_premium &&
                            <Button
                                text='UPGRDE TO PREMIUM'
                                style={button}
                                color="primary"
                                loading={requestingUpdate}
                                disabled={requestingUpdate}
                                block
                                onPress={updateData}
                            />
                        }
                        <ListItem
                            text='Suggest Classes'
                            value={suggest_class ? 'Yes': 'No'}
                            onPress={() => navigate('UpdateSettings')}
                        />
                        <ListItem
                            text='Industry'
                            value={industry && Industries[industry - 1].title}
                            onPress={() => navigate('UpdateSettings')}
                        />
                        {/* <ListItem
                            text='Download Quality'
                            value={download_quality && downloadQuality[download_quality - 1].title}
                            onPress={() => navigate('UpdateSettings')}
                        /> */}
                        <ListItem
                            text='Video Quality'
                            value={video_quality && videoQuality[video_quality - 1].title}
                            onPress={() => navigate('UpdateSettings')}
                        />
                    </DataAvailability>
                </Content>
            </Container>
        </>
    );
};

const mapStateToProps = state => ({
    user: state.app.user,
    settings: state.settings.settings,
    requesting: state.settings.requesting,
    requestingUpdate: state.settings.requestingUpdate
});

const mapDispatchToProps = dispatch => ({
    updateSettings: (id, data) => dispatch(updateSettings(id, data))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Settings);
