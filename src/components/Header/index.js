import React from 'react';

// components
import { SafeAreaView } from 'react-native'
import { Title, View } from 'native-base';
import { Text } from 'src/components';

// styles
import styles from './styles';

const Header = ({ title, text, input, left, right, color }) => {
  const {
    header,
    leftStyle,
    textWrapper,
    bodyStyle,
    titleText,
    rightStyle
  } = styles;

  return (
    <SafeAreaView style={styles[color]}>
      <View style={[header, styles[color]]}>
        <View style={leftStyle}>{left}</View>
        {text && (
            <View style={textWrapper}>
              {text && (
                <Text
                  style={styles[`${color}Text`]}
                  text={text}
                  category="s2"
                  bold
                  numberOfLines={1}
                />
              )}
            </View>
          )}

        <View style={bodyStyle}>
          {!input && !text && (
            <Title style={[titleText, styles[`${color}Text`]]}>{title}</Title>
          )}
          {input && input}
        </View>

        {!text && <View style={rightStyle}>{right}</View>}
      </View>
    </SafeAreaView>
  );
};

export default Header;
