import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, Dimensions } from 'react-native';
import { connect } from 'react-redux';

// components
import { Container } from 'native-base';
import {
    Header,
    Input,
    BackIcon,
    SearchIcon,
    FilterIcon,
    Course,
    Footer,
    DataAvailability
} from 'src/components';

// styles
import commonStyle from 'src/styles/common';

// actions
import { getEnrolledCourses as getEnrolledCoursesAction, resetData } from './redux/actions';

const MyCourses = props => {
    const { requesting, courses, next, page, navigation: { goBack } } = props;
    const [searchInput, toggleSearchInput] = useState(false);
    const [numColumns, setNumColumns] = useState(false);
    const [query, setQuery] = useState('');

    Dimensions.addEventListener('change', () => {
        const windowWidth = Dimensions.get('window').width;
        setNumColumns((windowWidth / 180).toFixed(0))
    });

    useEffect(() => {
        props.getEnrolledCourses(1, '');
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
            is_enrolled: course.is_enrolled
        });
    };

    const onPressSearch = () => {
        if (searchInput) {
            setQuery('');
            props.getEnrolledCourses(1, '');
        }
        toggleSearchInput(!searchInput);
    }

    const onChange = val => {
        setQuery(val);
        !val && props.getEnrolledCourses(1, '');
    };

    const search = () => {
        query && props.getEnrolledCourses(1, query);
    };

    const renderItem = ({ item }) => (
        <Course course={item} size='large' onPress={() => onPressCourse(item)} progress />
    );

    const loadMore = () => {
        next && !requesting && props.getEnrolledCourses(page + 1, query ? query : '');
    };
 
    const requestingMore = () => requesting && <ActivityIndicator color="#1C3D6E" />

    const {
        containerMain,
        contentWrapper,
        headingWrapper,
        catagoryHeading,
        columnWrapperStyle } = commonStyle;

    return (
        <>
            <Header
                color="primary"
                title="My Courses"
                input={searchInput &&
                    <Input
                        autoFocus
                        transparent
                        value={query}
                        maxLength={15}
                        returnKeyType="search"
                        placeholder="Search Courses"
                        onChangeText={val => onChange(val)}
                        onSubmitEditing={() => search()}
                    />
                }
                left={<BackIcon action={() => goBack()} />}
                right={<SearchIcon
                    action={() => onPressSearch()}
                    name={searchInput ? 'times-circle' : 'search'}
                />}
            />
            <Container style={containerMain}>
                <View style={contentWrapper}>
                    <View style={headingWrapper}>
                        <View style={catagoryHeading} />
                        {/* <FilterIcon /> */}
                    </View>
                    <DataAvailability
                        requesting={requesting && !courses}
                        hasData={Boolean(courses)}
                        style={styles.dataWrapper}>
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
                </View>
                <Footer props={props} activeScreen="MyCourses" />
            </Container>
        </>
    );
};

const styles = StyleSheet.create({
    dataWrapper: {
        paddingVertical: 100
    }
});

const mapStatesToProps = state => ({
    requesting: state.myCourses.requesting,
    courses: state.myCourses.courses,
    next: state.myCourses.next,
    page: state.myCourses.page
})

const mapDispatchToProps = dispatch => ({
    resetData: () => dispatch(resetData()),
    getEnrolledCourses: (page, query) => dispatch(getEnrolledCoursesAction(page, query))
})

export default connect(mapStatesToProps, mapDispatchToProps)(MyCourses);
