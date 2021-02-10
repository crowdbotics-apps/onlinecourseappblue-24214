import React, { useState } from 'react';
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

const Footer = () => {
    const [activeRoute, setActiveRoute] = useState('Home');

    const { footer, touch, icon, active } = styles;

    return (
        <NBFooter>
            <FooterTab style={footer}>
                {configs.map((screen, i) => (
                    <TouchableOpacity
                        key={i}
                        style={touch}
                        onPress={() => setActiveRoute(screen.route)}
                    >
                        <Icon
                            type='MaterialIcons'
                            name={screen.icon}
                            style={activeRoute === screen.route ? active : icon}
                        />
                    </TouchableOpacity>
                ))}
            </FooterTab>
        </NBFooter >
    );
}

export default Footer;