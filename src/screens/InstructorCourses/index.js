import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FlatList, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { Container } from 'native-base';
import { Header, Text, Course, Banner, ExitIcon, DataAvailability } from 'src/components';

// actions
import { getInstructorCourses, resetData } from './redux/actions';

// styles
import commonStyle from 'src/styles/common';

const InstructorCourses = props => {
    const {
        navigation: { goBack },
        route: {
          params: { id, name, image }
        },
        page,
        next,
        courses,
        requesting
    } = props;

    const [numColumns, setNumColumns] = useState(false);
    
    Dimensions.addEventListener('change', () => {
        const windowWidth = Dimensions.get('window').width;
        setNumColumns((windowWidth / 180).toFixed(0));
    });
    
    useEffect(() => {
        props.getInstructorCourses(id, page);
        const windowWidth = Dimensions.get('window').width;
        setNumColumns((windowWidth / 180).toFixed(0));
        return () => props.resetData();
    }, []);
    
    const onPressCourse = course => {
        props.navigation.navigate('CourseDetail', {
            id: course.id,
            title: course.title,
            description: course.description,
            image: course.image,
            author_id: course.author,
            author_name: course.author_name,
            author_image: course.author_image,
            is_enrolled: course.is_enrolled,
            subscription_status: course.subscription_status
        });
    };
    
    const renderItem = ({ item }) => (
        <Course
            course={item}
            size="large"
            onPress={() => onPressCourse(item)}
        />
    );
    
    const loadMore = () => {
        next && !requesting && props.getInstructorCourses(id, page + 1);
    };
    
    const requestingMore = () =>
        requesting && <ActivityIndicator color="#1C3D6E" />;
    
    const {
        container,
        columnWrapperStyle } = commonStyle;

    return (
        <>
            <Header color="primary" left={
                <ExitIcon action={goBack} />
            } />

            <Banner color="primary" name={name} image={image} large />

            <Container style={container}>
                <Text
                    text="Instructor Courses"
                    category="h5"
                    bold
                    style={styles.text}
                />
                <DataAvailability
                    requesting={requesting && !courses}
                    hasData={Boolean(courses)}
                    style={styles.dataWrapper}
                >
                    {courses && numColumns && (
                        <FlatList
                            key={numColumns > 2 ? '_': '$'}
                            keyExtractor={item => item.id}
                            onEndReached={loadMore}
                            onEndReachedThreshold={0.1}
                            numColumns={numColumns}
                            columnWrapperStyle={columnWrapperStyle}
                            data={courses}
                            renderItem={renderItem}
                            ListFooterComponent={requestingMore}
                            showsVerticalScrollIndicator={false}
                        />
                    )}
                </DataAvailability>
            </Container>
        </>
    );
};

const styles = StyleSheet.create({
    text: {
        marginVertical: 17
    }
});

const mapStatesToProps = state => ({
    requesting: state.instructorCourses.requesting,
    courses: state.instructorCourses.courses,
    next: state.instructorCourses.next,
    page: state.instructorCourses.page
});

const mapDispatchToProps = dispatch => ({
    resetData: () => dispatch(resetData()),
    getInstructorCourses: (id, page) => dispatch(getInstructorCourses(id, page))
});

export default connect(
    mapStatesToProps,
    mapDispatchToProps
)(InstructorCourses);
