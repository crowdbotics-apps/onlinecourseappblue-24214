import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';

// components
import { Footer as NBFooter, FooterTab, Icon } from 'native-base';

// styles
import styles from './styles';

const configs = [
    {
        route: 'Home',
        icon: 'home'
    },
    {
        route: 'MyCourses',
        icon: 'star'
    },
    {
        route: 'Search',
        icon: 'search'
    },
    {
        route: 'Notifications',
        icon: 'notifications'
    },
    {
        route: 'Settings',
        icon: 'settings'
    }
]

const Footer = ({ props, activeScreen }) => {
    const {
        route,
        navigation: { navigate, replace }
    } = props;

    const goToScreen = screenRoute => {
        route.name === 'Home' ? navigate(screenRoute) : replace(screenRoute);
    };

    const { footer, touch, icon, active } = styles;

    return (
        <NBFooter>
            <FooterTab style={footer}>
                {configs.map((screen, i) => (
                    <TouchableOpacity
                        key={i}
                        style={touch}
                        onPress={() => goToScreen(screen.route)}
                    >
                        <Icon
                            type='MaterialIcons'
                            name={screen.icon}
                            style={activeScreen === screen.route ? active : icon}
                        />
                    </TouchableOpacity>
                ))}
            </FooterTab>
        </NBFooter>
    );
}

export default Footer;