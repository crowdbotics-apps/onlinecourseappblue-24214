import React from 'react';

// components
import { Header as NBHeader, Left, Right, Body, Title, View } from 'native-base';
import { Text } from 'src/components';

// styles
import styles from './styles';

const Header2 = ({ title, text, input, left, right, color }) => {

    const {
        header,
        leftStyle,
        textWrapper,
        bodyStyle,
        titleText,
        textTitle } = styles;

    return (
        <NBHeader
            style={[header, styles[color]]}
        >
            <Left style={leftStyle}>
                {left}
                {text && (
                    <View style={textWrapper}>
                        {text && <Text style={styles[`${color}Text`]} text={text} category="s2" bold numberOfLines={1} />}
                        {/* <Text style={[titleText, text && textTitle, styles[`${color}Text`]]}>{title}</Text> */}
                    </View>
                )}
            </Left>

            <Body style={bodyStyle}>
                {!input && !text && <Title style={[titleText, text && textTitle, styles[`${color}Text`]]}>{title}</Title>}
                {input && input}
            </Body>

            {!text && <Right>{right}</Right>}
        </NBHeader>
    );
}

export default Header2;