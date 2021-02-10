import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';

// styles
import commonStyle from 'src/styles/common';

const Exit = ({ color, action }) => {

    const { headerIcons } = commonStyle
    return (
        <TouchableOpacity onPress={action}>
            <Icon
                type='MaterialIcons'
                name='close'
                style={[headerIcons, commonStyle[`${color ? color : 'primary'}Icons`]]}
            />
        </TouchableOpacity>
    );
}

export default Exit; 