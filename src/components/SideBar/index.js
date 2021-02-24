import React from 'react';
import { connect } from 'react-redux';
import {
    TouchableOpacity,
    View,
    ScrollView,
    StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { LoginManager } from 'react-native-fbsdk';

// components
import { Icon } from 'native-base';
import { Text, Avatar, Badge } from 'src/components';

// actions
import { logout as logoutAction } from 'src/screens/App/redux/actions';

// styles
import colors from 'src/styles/colors';

const routes = [
    { name: 'Home', route: 'Home', icon: 'home' },
    // { name: 'Subscription', route: 'Subscription', icon: 'credit-card' },
    { name: 'Notifications', route: 'Notifications', icon: 'notifications' },
    { name: 'Profile', route: 'Profile', icon: 'person', },
    { name: 'My Courses', route: 'MyCourses', icon: 'star-border' },
    { name: 'Search', route: 'Search', icon: 'search' },
    { name: 'Settings', route: 'Settings', icon: 'settings' }
];

class SideBar extends React.Component {
    logout = () => {
        this.props.logout();
        AsyncStorage.removeItem('authToken');
        AsyncStorage.removeItem('user');
        LoginManager.logOut();
    }

    onMenuItemPressed = route => {
        this.props.navigation.navigate(route);
    };

    renderIcon = () => (
        <>
            <TouchableOpacity onPress={() => this.props.navigation.closeDrawer()}>
                <Icon
                    type="MaterialIcons"
                    name="keyboard-arrow-left"
                    style={styles.back}
                />
            </TouchableOpacity>
            <Avatar size="medium" image_url={this.props.user.image} />
            <View style={styles.userInfo}>
                <Text
                    text={this.props.user.name}
                    category="p2"
                    color="primary"
                    numberOfLines={1}
                    style={styles.userName}
                />
                <Text
                    text={this.props.user.email}
                    category="s2"
                    color="octonary"
                    numberOfLines={1}
                    style={styles.userEmail}
                />
            </View>
        </>
    );

    renderMenu = () => routes.map(this.renderMenuItem);

    renderMenuItem = item => (
        <TouchableOpacity
            key={`${item.name}--blueprint-button`}
            onPress={() => this.onMenuItemPressed(item.route)}>
            <View style={styles.container}>
                <Icon type="MaterialIcons" name={item.icon} style={styles.menuIcon} />
                <Text text={item.name} category="h6" bold style={styles.routeName} />
                {item.name === 'Notifications' &&
                    <Badge value={this.props.notifications.current} style={styles.badge} />
                }
            </View>
        </TouchableOpacity>
    );

    render = () => (
        <View style={styles.root}>
            <View style={styles.user}>{this.renderIcon()}</View>
            <ScrollView showsVerticalScrollIndicator={false}>
                {this.renderMenu()}
            </ScrollView>
            <TouchableOpacity onPress={() => this.logout()}>
                <View style={styles.logout}>
                    <Icon type="FontAwesome" name="sign-out" style={styles.logoutIcon} />
                    <Text text="Logout" category="h6" bold style={styles.routeName} />
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },

    user: {
        paddingTop: 50,
        paddingBottom: 27,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.biscay,
    },
    back: {
        fontSize: 40,
        color: colors.white,
        marginHorizontal: 10,
    },
    userInfo: {
        flex: 1,
        marginLeft: 10,
        paddingTop: 6
    },
    userEmail: {
        fontSize: 12
    },
    userName: {
        fontSize: 17,
        overflow: 'hidden'
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 10,
        alignItems: 'center'
    },
    menuIcon: {
        color: colors.biscay,
        marginHorizontal: 15,
    },
    badge: {
        marginLeft: 10
    },
    routeName: {
        fontSize: 17,
    },

    logout: {
        flexDirection: 'row',
        marginBottom: 30,
        alignItems: 'center'
    },

    logoutIcon: {
        color: colors.deepBlush,
        marginHorizontal: 15
    }
});

const mapStateToProps = state => ({
    user: state.app.user,
    notifications: state.app.notifications,
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logoutAction()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SideBar);
