import React from 'react';

// components
import { View, TouchableOpacity } from 'react-native';
import { Card, Icon } from 'native-base';
import { Text } from 'src/components';

// styles
import styles from './styles';

const CourseDetails = ({ count, module, onPress }) => {

    const {
        card,
        icon,
        text,
    } = styles;

    return (
        <TouchableOpacity
            onPress={() => module.is_opened && onPress()}
        >
            <Card style={card}>
                <View style={text}>
                    <Text text={`Part ${count + 1}`} color="secondary" category="p2" />
                    <Text
                        text={module.title}
                        category="p2"
                        numberOfLines={2}
                        bold
                    />
                </View>
                <Icon
                    type="FontAwesome"
                    name={module.is_opened ? 'unlock' : 'lock'}
                    style={icon}
                />
            </Card>
        </TouchableOpacity>
    );
};

export default CourseDetails;
