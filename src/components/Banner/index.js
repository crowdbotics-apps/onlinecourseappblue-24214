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
    range,
    image,
    color,
    large,
    action,
    loading,
    editable,
    onEdit,
    isEnrolled,
    currentBalance
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
                        <ActivityIndicator size="large" color={colors.biscay} />
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
                            {/* <Text
                                    text={range}
                                    style={rangeText}
                                    color={color}
                                    category="s2"
                                /> */}
                            </TouchableOpacity>
                        )}

                        {/* {currentBalance !== false && isEnrolled && (
                            <View style={balance}>
                                <View style={balanceText}>
                                    <Text
                                        text={`$${currentBalance}`}
                                        color="quaternary"
                                        category="p1"
                                        right
                                        bold
                                    />
                                </View>
                            </View>
                        )} */}
                    </>
                )}
        </View>
    );
};

export default Banner;
