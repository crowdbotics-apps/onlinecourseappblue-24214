import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { View, ActivityIndicator, FlatList, Dimensions } from 'react-native';
import { Container, Content } from 'native-base';
import {
    Header,
    BackIcon,
    Category,
    Input,
    Text,
    Footer,
    FilterIcon,
    SearchIcon as CrossIcon,
    Course,
    DataAvailability
} from 'src/components';

// action
import {
    searchCourses as searchCoursesAction,
    reset as resetAction
} from './redux/actions';

// styles
import commonStyle from 'src/styles/common';
import styles from './styles';

const Search = props => {
    const {
        next, 
        page,
        requesting,
        courses,
        categories,
        navigation: { goBack }
    } = props;

    const [query, setQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [pageTitle, setPageTitle] = useState(false);
    const [showFilter, toggleFilter] = useState(false);
    const [numColumns, setNumColumns] = useState(false);

    Dimensions.addEventListener('change', () => {
        const windowWidth = Dimensions.get('window').width;
        setNumColumns((windowWidth / 180).toFixed(0))
    });

    useEffect(() => {
        const windowWidth = Dimensions.get('window').width;
        setNumColumns((windowWidth / 180).toFixed(0));
    }, []);

    useEffect(() => {
        !requesting && !query && !selectedCategory && props.reset();
    }, [query, selectedCategory, requesting]);

    const search = () => {
        query && props.searchCourses(1, query, selectedCategory);
    };

    const onClear = () => {
        query ?
            props.searchCourses(1, query, '') :
            props.reset();
        setPageTitle(false);
        showFilter && toggleFilter(false);
        setSelectedCategory('');
    }

    const onSelect = category => {
        setPageTitle(category.name);
        setSelectedCategory(category.id);
        props.searchCourses(1, query, category.id);
    };

    const onPressFilter = () => {
        toggleFilter(!showFilter);
    };

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
        <Course course={item} size='large' onPress={() => onPressCourse(item)} progress />
    );

    const loadMore = () => {
        next && !requesting && props.searchCourses(page + 1, query, selectedCategory);
    };
 
    const requestingMore = () => requesting && <ActivityIndicator color="#1C3D6E" />

    const {
        containerMain,
        contentWrapper,
        headingWrapper,
        catagoryHeading,
        columnWrapperStyle
    } = commonStyle;
    const { input, dataWrapper } = styles;

    return (
        <>
            <Header
                color="primary"
                title={pageTitle ? pageTitle : 'Search Courses'}
                left={<BackIcon action={() => goBack()} />}
                right={
                    selectedCategory !== '' && (
                        <CrossIcon
                            name='times-circle'
                            action={() => onClear()}
                        />
                    )
                }
            />
            <Container style={containerMain}>
                <View style={contentWrapper}>
                    <View style={input}>
                        <Input
                            value={query}
                            maxLength={40}
                            returnKeyType="search"
                            onSubmitEditing={() => search()}
                            placeholder="Enter Search query"
                            onChangeText={val => setQuery(val)}
                        />
                    </View>

                    <View style={headingWrapper}>
                        <View style={catagoryHeading}>
                            <Text
                                text={showFilter ? 'Select from Categories' : 'Search Results'}
                                bold
                                category="h5"
                            />
                        </View>
                        <FilterIcon action={onPressFilter} />
                    </View>
                    {showFilter &&
                        categories &&
                        categories.map(category => (
                            <Category
                                key={category.id}
                                category={category}
                                onPress={() => onSelect(category)}
                            />
                        ))}
                    <DataAvailability
                        requesting={requesting && !courses}
                        hasData={Boolean(courses)}
                        style={dataWrapper}>
                        {courses && numColumns && (
                            <FlatList
                                key={numColumns > 2 ? '_' : '$'}
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
                <Footer props={props} activeScreen="Search" />
            </Container>
        </>
    );
};

const mapStateToProps = state => ({
    requesting: state.search.requesting,
    next: state.search.next,
    page: state.search.page,
    courses: state.search.courses,
    categories: state.home.categories
});

const mapDispatchToProps = dispatch => ({
    searchCourses: (page, query, id) => dispatch(searchCoursesAction(page, query, id)),
    reset: () => dispatch(resetAction())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Search);
