import React from 'react';
import { Icon, View } from 'native-base';
import { Text } from 'src/components';

// styles
import styles from './styles';

const Notification = props => {
    const {
        notification: { id, send_to, title, message, is_opened, is_seen },
        seenIds
    } = props;

    const isSeen = is_opened || is_seen || seenIds.includes(id);

    const { item, leftIcon, wrapper, textStyle } = styles;
    const icons = ['check-circle', 'insert-invitation', 'cancel'];
    const colors = ['primary', 'secondary', 'tertiary'];

    return (
        <View style={item}>
            <Icon
                type="MaterialIcons"
                name={icons[send_to ? 0 : 1]}
                style={[styles[colors[send_to ? 0 : 1]], leftIcon]}
            />
            <View style={wrapper}>
                <Text
                    bold
                    text="Notice"
                    color="septenary"
                    style={textStyle}
                    category="s2"
                    numberOfLines={1}
                />
                <Text
                    text={message}
                    bold
                    color={isSeen ? 'septenary' : false}
                    style={textStyle}
                    category="h6"
                    numberOfLines={3}
                />
            </View>
        </View>
    );
};

export default Notification;
