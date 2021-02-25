import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Card, Icon } from 'native-base';
import { Text } from 'src/components';

// styles
import styles from './styles';

const Lesson = ({ lesson, count, onPress }) => {
    const {
        course,
        courseImage,
        icon,
        iconWrapper,
        courseText } = styles

    return (
        <TouchableOpacity onPress={() => lesson.is_opened && onPress()}>
            <Card style={course}>
                <View style={courseImage}>
                    <View style={iconWrapper}>
                        <Icon type="FontAwesome" name={lesson.is_opened ? 'play' : 'lock'} style={icon} />
                    </View>
                </View>
                <View style={courseText}>
                    {<Text text={`Lesson ${count + 1}`} category="p2" numberOfLines={1} />}
                    <Text text={lesson.title} category="p2" bold numberOfLines={1} />
                </View>
            </Card>
        </TouchableOpacity>
    );
}

export default Lesson;
