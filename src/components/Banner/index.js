import React from 'react';

// components
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { Text, Avatar } from 'src/components';
import { View } from 'native-base';

// styles
import colors from 'src/styles/colors';
import styles from './styles';

const Banner = ({
    title,
    name,
    image,
    color,
    large,
    action,
    loading,
    editable,
    onEdit
}) => {
    const {
        info,
        text,
        balance,
        balanceText,
        infoWrapper,
        authorText,
        rangeText } = styles;

    return (
        <View style={[info, color && styles[color]]}>
            {large ? (
                <>
                    <Avatar
                        size="large"
                        editable={editable}
                        image_url={image}
                        onEdit={onEdit}
                    />
                    <Text text={name} color={color} style={text} numberOfLines={1} bold />
                    {loading && (
                        <ActivityIndicator size="large" color={colors.morningGlory} />
                    )}
                </>
            ) : (
                    <>
                        <Text
                            text={title}
                            color={color}
                            style={text}
                            numberOfLines={2}
                            bold
                        />
                        {name && (
                            <TouchableOpacity style={infoWrapper} onPress={action && action}>
                                <Avatar
                                    size="small"
                                    image_url={image}
                                />
                                <Text text={name} color={color} style={authorText} category="p1" />
                            </TouchableOpacity>
                        )}
                    </>
                )}
        </View>
    );
};

export default Banner;
