import React from 'react';
import { Text as UIKText } from 'react-native-ui-kitten';

// styles
import styles from './styles';

const Text = ({
    text,
    center,
    end,
    start,
    bold,
    style,
    color,
    underlined,
    category,
    numberOfLines,
    onPress,
    children,
}) => {
    const { fontSize, fontFamily, fontFamilyBold, underline, alignCenter, alignLeft, alignRight } = styles;

    return (
        <UIKText
            category={category ? category : 'p1'}
            onPress={onPress}
            style={[
                !category && fontSize,
                underlined && underline,
                start && alignLeft,
                center && alignCenter,
                end && alignRight,
                color && styles[color],
                fontFamily,
                bold && fontFamilyBold,
                style,
            ]}
            numberOfLines={numberOfLines && numberOfLines}
        >
            {text ? text : children}
        </UIKText>
    );
};

export default Text;
