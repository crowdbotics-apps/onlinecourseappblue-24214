import React from 'react';

// components
import { View, TouchableOpacity } from 'react-native';
import { Card, Icon } from 'native-base';
import { Text } from 'src/components';

// styles
import styles from './styles';

const Category = props => {
    const { category, onPress } = props;

    const {
        card,
        icon,
        categoryIcon,
        categoryText,
    } = styles;

    return (
        <TouchableOpacity
            onPress={() => onPress()}
        >
            <Card style={card}>
                <View style={icon}>
                    <Icon
                        type="FontAwesome"
                        name={category.icon}
                        style={categoryIcon}
                    />
                </View>
                <View style={categoryText}>
                    <Text text={category.name} category="p2" numberOfLines={1} bold />
                    <Text
                        text={`${category.total_courses} Courses`}
                        category="p2"
                    />
                </View>
            </Card>
        </TouchableOpacity>
    );
};

export default Category;
