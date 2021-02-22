import React from 'react';

// components
import { View, TouchableOpacity, Image } from 'react-native';
import { Card } from 'native-base';
import * as Progress from 'react-native-progress';
import { Text } from 'src/components';

// styles
import colors from 'src/styles/colors';
import styles from './styles';

const Course = ({ course, progress, onPress, size }) => {
    const { lesson_progress, title, author_name, duration, is_enrolled } = course;
    const {
        card,
        imageWrapper,
        tagText,
        progressText,
        progressStyle,
        image,
        description,
        text
    } = styles;
    const status = ['Free', 'Premium'];

    return (
        <TouchableOpacity onPress={() => onPress()}>
            <Card style={[card, styles[`${size}Card`]]}>
                <View
                    style={[
                        imageWrapper,
                        styles[`${size}ImageWrapper`],
                        !course.image && { backgroundColor: colors.alto }
                    ]}>
                    {/* <Text
                        text={status[subscription_status]}
                        bold category="p1"
                        color={subscription_status === 0 ? 'secondary' : 'quaternary'}
                        style={tagText} /> */}
                    {course.image && (
                        <Image
                            source={{ uri: course.image }}
                            style={[image, styles[`${size}Image`]]}
                        />
                    )}
                </View>
                <View style={description}>
                    <Text
                        text={title}
                        bold
                        category="p2"
                        style={text}
                        numberOfLines={2}
                    />
                    <Text
                        text={author_name}
                        color='secondary'
                        bold
                        category="p2"
                        style={text}
                        numberOfLines={1}
                    />
                    <Text
                        text={`${duration.split(':')[1]} Mins`}
                        category="p2"
                        style={progress && progressText}
                    />
                    {is_enrolled &&
                        <Text
                            text={lesson_progress === 1 ? 'Completed' : 'In Progress'}
                            category="p2"
                            bold
                            style={progress && progressText}
                        />
                    }
                    {progress && is_enrolled && (
                        <Progress.Bar
                            style={progressStyle}
                            color={colors.biscay}
                            unfilledColor={colors.alto}
                            progress={lesson_progress}
                        />
                    )}
                </View>
            </Card>
        </TouchableOpacity>
    );
};

export default Course;
