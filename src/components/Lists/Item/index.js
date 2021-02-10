import React from 'react';

// components
import { TouchableOpacity } from 'react-native';
import { Icon, View } from 'native-base';
import { Text } from 'src/components';

// styles
import styles from './styles';

const Item = ({ text, value, icon, onPress }) => {
    const { item, leftItem, leftIcon, rightItem, rightIcon, textStyle } = styles;

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={item}>
                <View style={leftItem}>
                    {icon && <Icon type="MaterialIcons" name={icon} style={leftIcon} />}
                    <Text text={text} category="h6" bold />
                </View>
                <View style={rightItem}>
                    <Text
                        text={value}
                        color="octonary"
                        bold
                        category="p2"
                        numberOfLines={1}
                        style={textStyle}
                    />
                    <Icon
                        type="MaterialIcons"
                        name="keyboard-arrow-right"
                        style={rightIcon}
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default Item;