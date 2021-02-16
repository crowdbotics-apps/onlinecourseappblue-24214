import React from 'react';
import { View, StyleSheet } from 'react-native';

const HorizontalRule = () => <View style={style.HR} />;

const style = StyleSheet.create({
    HR: {
        borderBottomColor: '#fff',
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginVertical: 19,
    },
});

export default HorizontalRule;
