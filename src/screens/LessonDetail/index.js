import React, { useEffect } from 'react';
import { connect } from 'react-redux';

// components
import { Content, View, Icon } from 'native-base';
import { Header, BackIcon, Text, Button, VideoPlayer } from 'src/components';

// styles
import styles from './styles';

// action
import {
    updateLessonProgress as updateLessonProgressAction,
    reset
} from './redux/actions';

const LessonDetail = props => {
    const {
        user,
        lessons,
        isCompleted,
        navigation: { goBack, replace },
        route: {
            params: {
                part_no,
                courseId,
                moduleId,
                courseTitle,
                isLastLesson,
                isLastModule,
                lesson: {
                    id,
                    title,
                    description,
                    media,
                    is_completed
                }
            }
        }
    } = props;

    useEffect(() => {
        props.reset();
    }, []);

    const updateProgress = () => {
        !is_completed &&
            props.updateLessonProgress(
                {
                    lesson: id,
                    user: user.id
                },
                courseId,
                { moduleId },
                isLastLesson && isLastModule
            );
    };

    const gotoNext = () => {
        if (!isLastLesson){
            replace('LessonDetail', {
                part_no: part_no + 1,
                lesson: lessons[part_no],
                courseId,
                moduleId,
                courseTitle,
                isLastModule,
                isLastLesson: lessons.length === part_no + 1
            });
        } else {
            goBack();
        }
    };

    const {
        container,
        completed,
        lessonDescription,
        heading,
        button,
        buttonWrapper,
        buttonStyle,
        icon
    } = styles;

    return (
        <>
            <Header
                text={title}
                color="primary"
                left={<BackIcon action={() => goBack(true)} />}
            />
            <VideoPlayer
                media={media}
                action={updateProgress}
            />
            <Content style={container} showsVerticalScrollIndicator={false}>
                <Text text="Lesson overview" category="h5" bold style={heading} />
                <Text text={description} category="p1" style={lessonDescription} />
            </Content>
            {(is_completed || isCompleted) && (
                <View style={button}>
                    <Text
                        text={
                            isLastLesson && isLastModule ?
                                'Course completed!'
                            :
                                `Lesson ${part_no} completed!`
                        }
                        category="h6"
                        bold
                        center
                        style={completed}
                    />
                    <View style={buttonWrapper}>
                        <Button
                            text={
                                isLastLesson ?
                                    "Go Back"
                                :
                                    "Go to Next lesson"
                                }
                            color="primary"
                            block
                            right={
                                <Icon
                                    type="FontAwesome"
                                    name={
                                        isLastLesson ?
                                            "caret-left"
                                        :
                                            "play"
                                    }
                                    style={icon}
                                />
                            }
                            style={buttonStyle}
                            onPress={gotoNext}
                        />
                    </View>
                </View>
            )}
        </>
    );
};

const mapStateToProps = state => ({
    user: state.app.user,
    lessons: state.module.lessons,
    isCompleted: state.lessonDetail.isCompleted
});

const mapDispatchToProps = dispatch => ({
    updateLessonProgress: (data, courseId, moduleId, isLast) =>
        dispatch(updateLessonProgressAction(data, courseId, moduleId, isLast)),
    reset: () => dispatch(reset())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LessonDetail);
