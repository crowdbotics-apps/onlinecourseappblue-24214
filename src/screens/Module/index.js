import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Image, Dimensions } from 'react-native';
import { Container, Content, View, Icon } from 'native-base';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import {
    Header,
    BackIcon,
    SearchIcon,
    Text,
    Input,
    Banner,
    Button,
    Lesson,
    Assignment,
    DataAvailability
} from 'src/components';
import Ledger from 'src/screens/Assignments/screens/Ledger';

// action
import {
    enrollCourse,
    getLessons as getLessonsAction,
    reset
} from './redux/actions';

// constants
import { keyNameMapping } from 'src/utils/constants';

// styles
import styles from './styles';
import colors from 'src/styles/colors';

const Module = props => {
    const {
        route: {
            params: { id, title, description, image }
        },
        user,
        ledger,
        course,
        lessons,
        requesting,
        assignments,
        assignmentTypes,
        requestingEnrollment,
        navigation
    } = props;

    const [searchInput, toggleSearchInput] = useState(false);
    const [query, setQuery] = useState('');
    const [filter, setFilter] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const [nextLesson, setNextLesson] = useState(false);
    const [nextLessonIndex, setNextLessonIndex] = useState(false);
    const [currentBalance, setCurrentBalance] = useState(false);

    useEffect(() => {
        props.getLessons(id);
        return () => props.reset();
    }, []);

    useEffect(() => {
        if (lessons){
            let index = false
            let nextLesson = false;
            let totalLessons = lessons.length;
            lessons.map((lesson, i) => {
                if(lesson.is_opened){
                    nextLesson = lesson;
                    index = totalLessons === i + 1 ? false : i;
                }
            });
            setNextLessonIndex(index);
            setNextLesson(nextLesson);
        }
    }, [lessons]);

    useEffect(() => {
        if (course.is_enrolled) {
            let balance = ledger.initial_balance;
            keyNameMapping.map(obj => {
                const cost = ledger[obj.key];
                balance = balance - cost;
            });
            setCurrentBalance(balance);
        }
    }, [ledger]);

    const onPressSearch = () => {
        searchInput && setFilter(false);
        toggleSearchInput(!searchInput);
    };

    const onPressLesson = (lesson, i) => {
        navigation.navigate('LessonDetail', {
            part_no: i,
            lesson,
            courseId: id,
            courseTitle: title,
            currentBalance,
            setActiveTab
        });
    };

    const onPressAssignment = (assignment, i) => {
        navigation.navigate('Assignments', {
            assignment,
            courseId: id,
            courseTitle: title,
            currentBalance,
            isLastAssignment: assignments.length === i,
            setActiveTab
        });
    };

    const renderTabBar = props => (
        <TabBar
          {...props}
          labelStyle={styles.labelStyle}
          indicatorStyle={styles.indicatorStyle}
          style={styles.tabBarStyle}
          activeColor={colors.black}
        />
      );

    const FirstRoute = () => (
        <View style={tabBg}>
            {lessons &&
                lessons
                .filter(l =>
                    filter
                        ? l.title
                            .toLowerCase()
                            .includes(query.toLowerCase())
                        : true
                )
                .map((lesson, i) => (
                    <Lesson
                        key={i}
                        count={i}
                        lesson={lesson}
                        onPress={() => onPressLesson(lesson, i)}
                    />
                ))
            }
        </View>
    );

    const SecondRoute = () => (
        <View style={tabBg}>
            {assignments &&
            assignments
            .filter(a =>
                filter
                    ? a.title
                        .toLowerCase()
                        .includes(query.toLowerCase())
                    : true
            )
            .map((a, i) => (
                <Assignment
                    key={i}
                    data={a}
                    count={i}
                    onPress={() => onPressAssignment(a, i + 1)}
                />
            ))
        }
    </View>
    );

    const ThirdRoute = () => (
        <View style={tabBg}>
            <Ledger
                ledger={ledger}
                assignmentTypes={assignmentTypes}
            />
            {(nextLesson &&
                (nextLessonIndex === 0 || nextLessonIndex)
            ) &&
                <Button
                    text="Go to next Lesson"
                    style={button}
                    color="primary"
                    block
                    right={
                        <Icon
                            type="FontAwesome"
                            name="arrow-right"
                            style={styles.icon}
                        />
                    }
                    onPress={() =>
                        onPressLesson(nextLesson, nextLessonIndex)
                    }
                />
            }
        </View>
    );
    
    const initialLayout = { width: Dimensions.get('window').width };
    const [routes] = useState([
        { key: 0, title: 'LESSONS' },
        { key: 1, title: 'ASSIGNMENTS' },
        { key: 2, title: 'LEDGER' },
    ]);

    const renderScene = SceneMap({
        0: FirstRoute,
        1: SecondRoute,
        2: ThirdRoute,
    });

    const {
        container,
        courseimage,
        descriptionWrapper,
        courseDescription,
        button,
        tabWrapper,
        tabBg
    } = styles;

    return (
        <>
            <Header
                color="primary"
                left={<BackIcon action={() => navigation.goBack()} />}
                input={
                    searchInput && (
                        <Input
                            autoFocus
                            transparent
                            value={query}
                            returnKeyType="search"
                            placeholder="Search Lessons"
                            onChangeText={val => setQuery(val)}
                            onSubmitEditing={() => setFilter(true)}
                        />
                    )
                }
                right={
                    <SearchIcon
                        action={() => onPressSearch()}
                        name={searchInput ? 'times-circle' : 'search'}
                    />
                }
            />
            <Banner
                color="primary"
                title={title}
                currentBalance={currentBalance}
                isEnrolled={course.is_enrolled}
            />
            <Container style={container}>
                <Content showsVerticalScrollIndicator={false}>
                    <Image style={courseimage} source={{ uri: image }} />
                    <View style={descriptionWrapper}>
                        <Text text={description} category="p1" style={courseDescription} />
                        {!requesting && !course.is_enrolled && (
                            <Button
                                text="ENROLL"
                                style={button}
                                color="primary"
                                block
                                onPress={() =>
                                    props.enrollCourse({ course: id, user: user.id })
                                }
                                loading={requestingEnrollment}
                                disabled={requestingEnrollment}
                            />
                        )}

                        <DataAvailability
                            requesting={requesting}
                            hasData={Boolean(lessons)}
                            style={tabWrapper}>
                            {course.is_enrolled && (
                                <TabView
                                    navigationState={{ index: activeTab, routes }}
                                    renderScene={renderScene}
                                    onIndexChange={setActiveTab}
                                    renderTabBar={renderTabBar}
                                    initialLayout={initialLayout}
                                />
                            )}
                        </DataAvailability>
                    </View>
                </Content>
            </Container>
        </>
    );
};

const mapStateToProps = state => ({
    user: state.app.user,
    requesting: state.module.requesting,
    requestingEnrollment: state.module.requestingEnrollment,
    ledger: state.module.ledger,
    course: state.module.course,
    lessons: state.module.lessons,
    assignments: state.module.assignments,
    assignmentTypes: state.module.assignmentTypes
});

const mapDispatchToProps = dispatch => ({
    enrollCourse: data => dispatch(enrollCourse(data)),
    getLessons: id => dispatch(getLessonsAction(id)),
    reset: () => dispatch(reset())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Module);
