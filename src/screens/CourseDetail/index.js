import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

// components
import { Image } from 'react-native';
import { Container, Content } from 'native-base';
import {
    Header,
    BackIcon,
    SearchIcon,
    Text,
    Input,
    Button,
    Banner,
    DataAvailability,
} from 'src/components';
import Module from './components/Module';

// actions
import {
    getModules as getModulesAction,
    enrollCourse as enrollCourseAction,
    resetEnrolled as resetEnrolledAction
} from './redux/actions';

// utils
import { errorAlert } from 'src/utils/alerts';

// styles
import styles from './styles';

const CourseDetail = props => {
    const {
        user,
        modules,
        requesting,
        navigation,
        isEnrolled,
        requestingEnroll,
        route: {
            params: {
                id,
                title,
                description,
                image,
                author_id,
                author_name,
                author_image,
                is_enrolled,
                subscription_status
            }
        }
    } = props;

    const [searchInput, toggleSearchInput] = useState(false);
    const [query, setQuery] = useState('');
    const [filter, setFilter] = useState(false);

    useEffect(() => {
        props.resetEnrolled();
        props.getModules(id);
    }, []);

    const onPressSearch = () => {
        searchInput && setFilter(false);
        toggleSearchInput(!searchInput);
    }

    const onPressModule = (module, i) => {
        navigation.navigate('Module', {
            title,
            image,
            author_id,
            author_name,
            description,
            author_image,
            course_id: id,
            module_id: module.id,
            isLastModule: modules.length === i
        });
    };

    const onPressInstructor = () => {
        navigation.navigate('InstructorCourses', {
            id: author_id,
            name:author_name,
            image:author_image
        })
    }
    
    const onPressEnroll = () => {
        if (subscription_status) {
            if (Boolean(user.subscription_plan)) {
                props.enrollCourse({ course: id, user: user.id });
            } else {
                errorAlert(
                    `Please upgrade your subscription plan to enroll in ${title} course.`,
                    'Alert'
                );
            }
        } else {
            props.enrollCourse({ course: id, user: user.id });
        }
    }
    
    const {
        container,
        courseimage,
        courseDescription,
        heading,
        contentWrapper,
        button } = styles;

    return (
        <>
            <Header
                color="primary"
                input={searchInput &&
                    <Input
                        autoFocus
                        transparent
                        value={query}
                        returnKeyType="search"
                        onChangeText={val => setQuery(val)}
                        onSubmitEditing={() => setFilter(true)}
                    />
                }
                left={<BackIcon action={() => navigation.goBack()} />}
                right={is_enrolled || isEnrolled ?
                    <SearchIcon
                        action={() => onPressSearch()}
                        name={searchInput ? 'times-circle' : 'search'}
                    />
                    :
                    false
                }
            />
            <Banner
                color="primary"
                title={title}
                name={author_name}
                image={author_image}
                action={onPressInstructor}
            />
            <Content showsVerticalScrollIndicator={false}>
                <Image style={courseimage} source={{ uri: image }} />
                <Container style={container}>
                    <Text
                        center
                        color="septenary"
                        text={description}
                        category="s1"
                        style={courseDescription}
                    />
                    {(!is_enrolled && !isEnrolled) && (
                        <Button
                            text="ENROLL"
                            style={button}
                            color="primary"
                            block
                            onPress={onPressEnroll}
                            loading={requestingEnroll}
                            disabled={requestingEnroll}
                        />
                    )}

                    {(is_enrolled || isEnrolled) &&
                        <>
                            <Text text="Modules" category="h5" bold style={heading} />
                            <DataAvailability
                                requesting={requesting}
                                hasData={Boolean(modules)}
                                style={contentWrapper}
                            >
                                {modules &&
                                    modules.filter(m => filter ? m.title.toLowerCase().includes(query.toLowerCase()) : true)
                                        .map((module, i) => (
                                            <Module
                                                key={module.id}
                                                count={i}
                                                module={module}
                                                onPress={() => onPressModule(module, i + 1)}
                                            />
                                        ))}
                            </DataAvailability>
                        </>
                    }
                </Container>
            </Content>
        </>
    );
};

const mapStateToProps = state => ({
    user: state.app.user,
    requesting: state.courseDetail.requesting,
    modules: state.courseDetail.modules,
    isEnrolled: state.courseDetail.isEnrolled,
    requestingEnroll: state.courseDetail.requestingEnroll,
});

const mapDispatchToProps = dispatch => ({
    getModules: id => dispatch(getModulesAction(id)),
    enrollCourse: course_id => dispatch(enrollCourseAction(course_id)),
    resetEnrolled: () => dispatch(resetEnrolledAction())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CourseDetail);
