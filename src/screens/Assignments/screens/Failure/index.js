import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";

// components
import { View, Image } from 'react-native';
import { Container, Content, Icon } from 'native-base';
import { Text, Button, VideoPlayer } from 'src/components';

// actions
import {
    updateLedger as updateLedgerAction
} from '../../redux/actions';
import { updateLessonProgress } from "../../../LessonDetail/redux/actions";

// styles
import styles from "./styles";
import commonStyles from '../../styles';

const Failure = (props) => {
    const {
        user,
        ledger,
        lessons,
        navigation: { navigate },
        route: { params: { courseId } }
    } = props;

    const lastLesson = lessons[lessons.length - 1];

    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            props.updateLedger(
                ledger,
                courseId,
                { lesson: lastLesson.id },
                true,
                false,
                0
            );
        }, 2000);
        updateProgress();
    }, []);

    const updateProgress = () => {
        !lastLesson.is_completed &&
            props.updateLessonProgress(
                {
                    lesson: lastLesson.id,
                    user: user.id
                },
                { courseId }
            );
    };

    return (
        <Container>
            {showResult ?
                <>
                    <View style={styles.container}>
                        <View style={styles.heading}>
                            <Text
                                text='Broke!'
                                category="h1"
                                bold
                                center
                            />
                        </View>
                        <View style={styles.imageWrapper}>
                            <Image
                                style={commonStyles.image}
                                source={require('../../../../../src/assets/images/broke.png')}
                            />
                        </View>
                        <View style={styles.description}>
                            <Text text='You spent too much money!' category="p2" />
                            <View style={styles.text}>
                                <Text text='Your account is in the ' category="p2" />
                                <Text text='NEGATIVE!' color='denary' category="p2" bold />
                            </View>
                            <Text text='Please try again.' category="p2" />
                        </View>
                    </View>
                    <View style={commonStyles.button}>
                        <Button
                            onPress={() => navigate('Home')}
                            text="Home"
                            color="primary"
                            block
                        />
                    </View>
                </>
            :
                <>
                    <Text
                        text='Course Overview'
                        category="h5"
                        bold
                        center
                        style={styles.heading}
                    />
                    <VideoPlayer
                        media={lastLesson.media}
                        action={() => setShowResult(true)}
                    />
                    <Content style={styles.content}>
                        <View style={styles.textWrapper}>
                            <Text
                                text="About"
                                category="h5"
                                bold
                                style={styles.heading}
                            />
                            <Text
                                text={lastLesson.description}
                                category="p1"
                                style={styles.lessonDescription}
                            />
                        </View>
                    </Content>
                    <View style={styles.buttonWrapper}>
                        <Button
                            text="Continue to result"
                            color="primary"
                            block
                            right={
                                <Icon
                                    type="FontAwesome"
                                    name="arrow-right"
                                    style={styles.icon}
                                />
                            }
                            style={styles.buttonStyle}
                            onPress={() => setShowResult(true)}
                        />
                    </View>
                </>
            }
        </Container>
    );
};

const mapStateToProps = state => ({
    user: state.app.user,
    ledger: state.module.ledger,
    lessons: state.module.lessons
});

const mapDispatchToProps = dispatch => ({
    updateLessonProgress: (data, moduleIds) =>
        dispatch(updateLessonProgress(data, moduleIds)),
    updateLedger: (ledger, courseId, data, isLast, callback, tab) =>
        dispatch(updateLedgerAction(ledger, courseId, data, isLast, callback, tab))
});

export default connect(mapStateToProps, mapDispatchToProps)(Failure);
