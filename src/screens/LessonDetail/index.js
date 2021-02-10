import React, { useEffect, useState } from 'react';
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
        assignments,
        isCompleted,
        navigation: { goBack, replace },
        route: {
            params: {
                part_no,
                courseId,
                courseTitle,
                currentBalance,
                lesson: { id, title, description, media, is_completed },
                setActiveTab
            }
        }
    } = props;

    const [isLastAssignment, setIsLastAssignment] = useState(false);
    const [currentAssingment, setCurrentAssingment] = useState(false);

    useEffect(() => {
        props.reset();
        setIsLastAssignment(false);
        setCurrentAssingment(false);
        assignments.map((assignment, i) => {
            if(assignment.lesson.includes(id)){
                setIsLastAssignment(
                    assignments.length === (i + 1)
                );
                setCurrentAssingment(assignment);
            }
        })
    }, []);

    const updateProgress = () => {
        !is_completed &&
            props.updateLessonProgress(
                {
                    lesson: id,
                    user: user.id
                },
                { courseId }
            );
    };

    const gotoAssignment = () => {
        if (currentAssingment){
            replace('Assignments', {
                assignment: currentAssingment,
                courseId,
                courseTitle,
                currentBalance,
                isLastAssignment,
                setActiveTab
            });
        } else {
            setActiveTab(1);
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
                            `${part_no === 0  ? 
                                'Introduction' : `Lesson ${part_no}`
                            } completed!`
                        }
                        category="h6"
                        bold
                        center
                        style={completed}
                    />
                    <View style={buttonWrapper}>
                        <Button
                            text="Go to Assignment"
                            color="primary"
                            block
                            right={
                                <Icon
                                    type="FontAwesome"
                                    name="edit"
                                    style={icon}
                                />
                            }
                            style={buttonStyle}
                            onPress={gotoAssignment}
                        />
                    </View>
                </View>
            )}
        </>
    );
};

const mapStateToProps = state => ({
    user: state.app.user,
    assignments: state.module.assignments,
    isCompleted: state.lessonDetail.isCompleted
});

const mapDispatchToProps = dispatch => ({
    updateLessonProgress: (data, moduleIds) =>
        dispatch(updateLessonProgressAction(data, moduleIds)),
    reset: () => dispatch(reset())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LessonDetail);
