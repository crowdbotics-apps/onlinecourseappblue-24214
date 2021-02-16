import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { Icon } from 'native-base';

// styles
import colors from 'src/styles/colors';

const Check = ({ style }) => {
    const { badge, icon } = styles

    return (
        <View style={[badge, style]}>
            <Icon
                type='MaterialIcons'
                name='check'
                style={[icon, { color: 'white' }]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    badge: {
        minWidth: 25,
        minHeight: 25,
        borderRadius: 100,
        paddingHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.deepBlush
    },
    icon: {
        fontSize: 15,
        textAlign: 'center'
    },
})

export default Check;
