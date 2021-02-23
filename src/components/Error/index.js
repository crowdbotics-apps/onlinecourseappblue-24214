import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

// components
import { Text } from 'react-native';

// styles
import Colors from 'src/styles/colors';

const Error = ({ errors }) => {
    const { text } = styles;
    if (errors) {
        if (Array.isArray(errors)) {
            return errors.map((error, index) => (
                <Text style={text} key={index}>
                    {error}
                </Text>
            ));
        } else {
            return <Text style={text}>{errors}</Text>;
        }
    } else {
        return null;
    }
};

const styles = StyleSheet.create({
    text: {
        color: Colors.punch,
        fontSize: 10
    }
});

Error.propTypes = {
    errors: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.string,
        PropTypes.array
    ])
};

export default Error;
