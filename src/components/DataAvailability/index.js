import React from 'react';
import PropTypes from 'prop-types';

// components
import { View, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { Text } from 'src/components';

// colors
import colors from 'src/styles/colors';

// images
import EmptyFile from 'src/assets/images/file.png';

const DataAvailability = ({ requesting, hasData, children, style }) => {

    if (requesting) {
        return (
            <View style={[styles.container, style, !style && styles.center]}>
                <ActivityIndicator size="large" color={colors.morningGlory} />
            </View>
        )
    }

    if (!hasData) {
        return (
            <View style={[styles.container, style, !style && styles.center]}>
                <Image source={EmptyFile} style={styles.emptyFile} />
                <Text text="No record available currently." bold />
            </View>
        )
    }

    return children;
};

DataAvailability.propTypes = {
    requesting: PropTypes.bool,
    hasData: PropTypes.bool,
    children: PropTypes.node
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    center: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    emptyFile: {
        width: 150,
        height: 150
    }
});


export default DataAvailability;
