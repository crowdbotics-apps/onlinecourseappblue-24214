import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Card, Icon } from 'native-base';
import { Text } from 'src/components';

// styles
import styles from './styles';

const Assignment = ({ data, count, onPress }) => {
    const {
        course,
        icon,
        iconWrapper,
        courseText } = styles

    return (
        <TouchableOpacity onPress={() => data.is_opened && onPress()}>
            <Card style={course}>
                <View style={courseText}>
                    <Text
                        text={
                            `${count !== 0 ? `Lesson ${count} : ` : ''
                        }${data.title}`}
                        category="p2"
                        bold
                        numberOfLines={2}
                    />
                </View>
                <View style={iconWrapper}>
                    <Icon type="FontAwesome" name={data.is_opened ? 'chevron-right' : 'lock'} style={icon} />
                </View>
            </Card>
        </TouchableOpacity>
    );
}

export default Assignment;
