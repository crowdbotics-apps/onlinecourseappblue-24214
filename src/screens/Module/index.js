import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Image } from 'react-native';
import { Container, Content, View } from 'native-base';
import {
    Header,
    BackIcon,
    SearchIcon,
    Text,
    Input,
    Banner,
    Lesson,
    DataAvailability
} from 'src/components';

// action
import {
    getLessons as getLessonsAction,
    reset
} from './redux/actions';

// styles
import styles from './styles';

const Module = props => {
    const {
        route: {
            params: {
                title,
                image,
                module_id,
                course_id,
                description,
                isLastModule
            }
        },
        ledger,
        lessons,
        requesting,
        navigation
    } = props;

    const [searchInput, toggleSearchInput] = useState(false);
    const [query, setQuery] = useState('');
    const [filter, setFilter] = useState(false);

    useEffect(() => {
        props.getLessons(module_id);
        return () => props.reset();
    }, []);

    const onPressSearch = () => {
        searchInput && setFilter(false);
        toggleSearchInput(!searchInput);
    };

    const onPressLesson = (lesson, i) => {
        navigation.navigate('LessonDetail', {
            part_no: i,
            lesson,
            courseId: course_id,
            moduleId: module_id,
            courseTitle: title,
            isLastModule,
            isLastLesson: lessons.length === i
        });
    };


    const {
        container,
        courseimage,
        descriptionWrapper,
        courseDescription,
        heading,
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
            />
            <Container style={container}>
                <Content showsVerticalScrollIndicator={false}>
                    <Image style={courseimage} source={{ uri: image }} />
                    <View style={descriptionWrapper}>
                        <Text text={description} category="p1" style={courseDescription} />
                        <DataAvailability
                            requesting={requesting}
                            hasData={Boolean(lessons)}
                            style={tabWrapper}>
                            <Text text="Lessons" category="h5" bold style={heading} />
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
                                            onPress={() => onPressLesson(lesson, i + 1)}
                                        />
                                    ))
                                }
                            </View>
                        </DataAvailability>
                    </View>
                </Content>
            </Container>
        </>
    );
};

const mapStateToProps = state => ({
    lessons: state.module.lessons,
    requesting: state.module.requesting,
});

const mapDispatchToProps = dispatch => ({
    getLessons: id => dispatch(getLessonsAction(id)),
    reset: () => dispatch(reset())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Module);
