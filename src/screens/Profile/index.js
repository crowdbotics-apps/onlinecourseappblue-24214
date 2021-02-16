import React from 'react';
import { connect } from 'react-redux';

// components
import { Linking } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Container, Content, View } from 'native-base';
import { Header, Banner, ExitIcon, ListItem, Button, Text } from 'src/components';

// actions
import { updateImage } from './redux/actions';

// styles
import styles from './styles';

const Profile = props => {
    const {
        user,
        navigation: { navigate, goBack },
        isFacebookLogin,
        requestingImage,
    } = props;

    const { container, heading, button } = styles;

    const selectImage = () => {
        ImagePicker.launchImageLibrary({}, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                props.updateImage({
                    id: user.id,
                    image: `data:${response.type};base64,${response.data}`
                });
            }
        });
    };

    return (
        <>
            <Header
                color="secondary"
                left={<ExitIcon color="secondary" action={() => goBack()} />}
            />
            <Banner
                name={user.name}
                image={user.image}
                large
                editable
                loading={requestingImage}
                onEdit={() => selectImage()}
            />

            <Container style={container}>
                <Content showsVerticalScrollIndicator={false}>
                    <ListItem
                        icon="person"
                        text="Full Name"
                        value={user.name}
                        onPress={() => navigate('UpdateFullName')}
                    />
                    <ListItem
                        icon="mail-outline"
                        text="Email Address"
                        value={user.email}
                        onPress={() => navigate('UpdateEmail')}
                    />
                    <ListItem
                        icon="phone-iphone"
                        text="Mobile Number"
                        value={user.phone_number}
                        onPress={() => navigate('UpdatePhoneNumber')}
                    />
                    {!isFacebookLogin && (
                        <ListItem
                            icon="lock"
                            text="Update Password"
                            onPress={() => navigate('UpdatePassword')}
                        />
                    )}
                    <Text text='About Truesky' category='h6' style={heading} bold />
                    <ListItem
                        icon="group"
                        text="About Us"
                        onPress={() => navigate('AboutUs')}
                    />
                    <ListItem
                        icon="question-answer"
                        text="Ask a question"
                        onPress={() => navigate('AskQuestion')}
                    />
                    <ListItem
                        icon="security"
                        text="Privacy Policy"
                        onPress={() =>
                            Linking.openURL(
                                'http://trueskycu.org/wp-content/uploads/2020/08/Privacy_Notice_tscu.pdf'
                            )
                        }
                    />
                </Content>
            </Container>
        </>
    );
};

const mapStateToProps = state => ({
    user: state.app.user,
    isFacebookLogin: state.app.facebookLogin,
    requestingImage: state.profile.requestingImage,
});

export default connect(
    mapStateToProps,
    { updateImage }
)(Profile);
