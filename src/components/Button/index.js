import React from 'react';

// components
import { Text, ActivityIndicator } from 'react-native';
import { Button as NBButton } from 'native-base';

// styles
import styles from './styles';

const Button = ({
    color,
    text,
    onPress,
    style,
    icon,
    full,
    rounded,
    block,
    first,
    last,
    bordered,
    small,
    large,
    disabled,
    half,
    right,
    left,
    loading,
}) => {
    const { buttonText, button, halfWidth, disabledStyle } = styles;

    return (
        <NBButton
            iconLeft
            style={[
                button,
                styles[`${color}Bg`],
                half && halfWidth,
                (loading || disabled) && disabledStyle,
                style,
            ]}
            full={full}
            rounded={rounded}
            block={block}
            first={first}
            last={last}
            bordered={bordered}
            small={small}
            large={large}
            disabled={disabled || loading}
            onPress={onPress}
            icon={icon}>
            <>
                {left}
                {loading ? (
                    <ActivityIndicator
                        size="large"
                        color={styles[`${color}Text`].color}
                    />
                ) : (
                        <Text style={[buttonText, styles[`${color}Text`]]}>{text}</Text>
                    )}
                {right}
            </>
        </NBButton>
    );
};

export default Button;
