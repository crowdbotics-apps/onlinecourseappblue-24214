import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base'

// styles
import colors from 'src/styles/colors';

const Filter = ({ action }) => {

    const { iconWrapper, icon } = styles
    return (
        <TouchableOpacity onPress={action}>
            <View style={iconWrapper}>
                <Icon color="#fff" type="FontAwesome5" name="filter" style={icon} />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    iconWrapper: {
        flex: 0,
        alignSelf: 'flex-end',
        backgroundColor: colors.biscay,
        padding: 8,
        borderRadius: 8
    },

    icon: {
        fontSize: 16,
        color: '#fff'
    }

});

export default Filter; 