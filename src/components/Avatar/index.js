import React from 'react';

// components
import { Image, TouchableOpacity, View } from 'react-native';
import { Icon } from 'native-base';

// styles
import styles from './styles';

const Avatar = ({ image_url, size, editable, onEdit }) => {
    const { image, editIconWrapper, editIcon } = styles;

    return (
        <View style={{ position: 'relative' }}>
            <Image
                style={[image, styles[size]]}
                source={
                    image_url
                        ? { uri: image_url }
                        : require('../../assets/images/user.jpg')
                }
            />
            {editable && (
                <TouchableOpacity onPress={() => onEdit()} style={editIconWrapper}>
                    <Icon type="AntDesign" name="edit" style={editIcon} />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default Avatar;
