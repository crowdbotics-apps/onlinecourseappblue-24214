import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

// components
import { View, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import { Container } from 'native-base';
import {
    Text,
    Input,
    Header,
    BackIcon,
    SearchIcon,
    FilterIcon,
    Course,
    Category,
    DataAvailability,
} from 'src/components';

// actions
import {
    getCategoryCourses as getCategoryCoursesAction,
    searchCategoryCourses as searchCategoryCoursesAction,
    resetPage
} from './redux/actions';

// styles
import commonStyle from 'src/styles/common';

const CategoryCourses = props => {
    const { getCategoryCourses, requesting, courses, categories, navigation, route, next, page } = props;

    const [showFilter, toggleFilter] = useState(false);
    const [searchInput, toggleSearchInput] = useState(false);
    const [categoryTitle, setCategoryTitle] = useState(false);
    const [categoryId, setCategoryId] = useState(false);
    const [numColumns, setNumColumns] = useState(false);
    const [query, setQuery] = useState('');

    Dimensions.addEventListener('change', () => {
        const windowWidth = Dimensions.get('window').width;
        setNumColumns((windowWidth / 180).toFixed(0))
    });
    
    useEffect(() => {
        setCategoryTitle(route.params.name);
        getCategoryCourses(1, route.params.id);
        const windowWidth = Dimensions.get('window').width;
        setNumColumns((windowWidth / 180).toFixed(0));
        return () => props.resetPage();
    }, []);

    const onChange = val => {
        setQuery(val);
        !val && props.resetPage();
        !val && getCategoryCourses(1, route.params.id);
    };

    const onPressSearch = () => {
        if (searchInput) {
            setQuery('');
            getCategoryCourses(1, categoryId || route.params.id);
            props.resetPage();
        }
        toggleSearchInput(!searchInput);
        showFilter && toggleFilter(false);
    }

    const search = () => {
        props.resetPage();
        query && props.searchCategoryCourses(1, query)
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

    const onSelect = category => {
        setCategoryId(category.id);
        searchInput && toggleSearchInput(false);
        setCategoryTitle(category.name);
        getCategoryCourses(1, category.id);
        props.resetPage();
    }

    const renderItem = ({ item }) => (
        <Course course={item} size="large" onPress={() => onPressCourse(item)} progress />
    );

    const loadMore = () => {
        if (next) {
            if (searchInput && query) {
                !requesting && props.searchCategoryCourses(page + 1, query);
            } else if (!searchInput || !query) {
                !requesting && props.getCategoryCourses(page + 1, categoryId || route.params.id);
            }
        }
    };
 
    const requestingMore = () => requesting && <ActivityIndicator color="#1C3D6E" />

    const {
        container,
        headingWrapper,
        catagoryHeading,
        columnWrapperStyle
    } = commonStyle;

    return (
        <>
            <Header
                color="primary"
                input={searchInput &&
                    <Input
                        value={query}
                        autoFocus
                        transparent
                        maxLength={15}
                        returnKeyType="search"
                        placeholder="Search Categories"
                        onChangeText={val => onChange(val)}
                        onSubmitEditing={() => search()}
                    />
                }
                title={searchInput ? query : categoryTitle}
                left={<BackIcon action={() => navigation.goBack()} />}
                right={<SearchIcon
                    action={() => onPressSearch()}
                    name={searchInput ? 'times-circle' : 'search'}
                />}
            />
            <Container style={container}>
                <View style={headingWrapper}>
                    <View style={catagoryHeading}>
                        {showFilter && <Text text="Select from Categories" bold category="h5" />}
                    </View>
                    <FilterIcon action={() => toggleFilter(!showFilter)} />
                </View>
                {showFilter && categories &&
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
                    style={{ marginTop: 10 }}
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

const mapStateToProps = state => ({
    requesting: state.categoryCourses.requesting,
    courses: state.categoryCourses.courses,
    next: state.categoryCourses.next,
    page: state.categoryCourses.page,
    categories: state.home.categories,
});

const mapDispatchToProps = dispatch => ({
    getCategoryCourses: (page, id) => dispatch(getCategoryCoursesAction(page, id)),
    searchCategoryCourses: (page, query) => dispatch(searchCategoryCoursesAction(page, query)),
    resetPage: () => dispatch(resetPage())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CategoryCourses);
