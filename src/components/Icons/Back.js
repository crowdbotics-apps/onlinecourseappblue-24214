import React from 'react';
import { TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { Icon } from 'native-base';

// styles
import commonStyle from 'src/styles/common';

const Back = ({ color, action }) => {

    const { icon } = styles
    return (
        <TouchableOpacity onPress={action}>
            <Icon
                type='MaterialIcons'
                name={Platform.OS === 'ios' ? 'chevron-left' : 'arrow-back'}
                style={[icon, commonStyle[`${color ? color : 'primary'}Icons`]]}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    icon: {
        fontSize: 25,
        textAlign: 'center',
        ...Platform.select({
            ios: {
                fontSize: 40
            }
        })
    },
})

export default Back;
