import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { Text } from 'src/components';

// styles
import colors from 'src/styles/colors';

const Badge = ({ value, style }) => {

    const { badge } = styles
    return (
        <>
            { false ?
                <View style={[badge, style]}>
                    <Text
                        text={value}
                        color='primary'
                        category="p2"
                        bold
                    />
                </View>
                :
                null
            }
        </>
    );
}

const styles = StyleSheet.create({
    badge: {
        minWidth: 20,
        minHeight: 20,
        borderRadius: 100,
        paddingHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.deepBlush
    }
})

export default Badge;
