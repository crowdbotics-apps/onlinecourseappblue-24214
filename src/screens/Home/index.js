import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

// components
import {
    View,
    FlatList,
    ActivityIndicator,
    RefreshControl
} from 'react-native';
import { Container, Content } from 'native-base';
import {
    Header,
    MenuIcon,
    Text,
    Input,
    SearchIcon,
    FilterIcon,
    Course,
    Category,
    DataAvailability
} from 'src/components';

// utils
import getDeviceInfo from 'src/utils/getDeviceInfo';

// actions
import { registerMobileDevice } from 'src/screens/Registration/redux/actions';
import { getSettings } from 'src/screens/Settings/redux/actions';
// import { getNotificationsCount } from 'src/screens/Notifications/redux/actions';
import { getCourses, getCategories, resetPage } from './redux/actions';

// styles
import styles from './styles';

const Home = props => {
    const {
        courses,
        categories,
        navigation,
        user,
        page,
        next,
        authToken
    } = props;

    const [searchInput, toggleSearchInput] = useState(false);
    const [showFilter, toggleFilter] = useState(true);
    const [query, setQuery] = useState('');

    useEffect(() => {
        user.id && props.getCourses(1, '');
        user.id && props.getCategories();
        user.id && props.getSettings();

        getDeviceInfo(user.id, authToken).then(deviceInfo => {
            user.id && props.registerMobileDevice(deviceInfo);
        });
    }, []);

    const onPressCourse = course => {
        props.navigation.navigate('Module', {
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

    const onPressCategory = category => {
        props.navigation.navigate('CategoryCourses', {
            id: category.id,
            name: category.name,
            categories
        });
    };

    const onToggleSearch = () => {
        if (searchInput) {
            setQuery('');
            query && props.getCourses(1, '');
            query && props.resetPage();
        }
        toggleSearchInput(!searchInput);
    };

    const search = () => {
        query && props.getCourses(1, query);
        props.resetPage();
    };

    const onChange = val => {
        setQuery(val);
        !val && props.getCourses(1, '');
        props.resetPage();
    };

    const renderItem = ({ item }) => (
        <Course course={item} size="small" onPress={() => onPressCourse(item)} progress />
    );

    const loadMore = () => next && props.getCourses(page + 1, query);

    const refresh = () => {
        props.getCourses(page, query);
        props.getCategories();
    };

    const {
        container,
        input,
        heading,
        scroll,
        courseWrapper,
        categoryData,
        categoryWrapper,
        categoryHeading
    } = styles;

    return (
        <>
            <Header
                color="primary"
                input={
                    searchInput && (
                        <Input
                            autoFocus
                            transparent
                            value={query}
                            maxLength={15}
                            returnKeyType="search"
                            placeholder="Search Courses"
                            onChangeText={val => onChange(val)}
                            onSubmitEditing={() => search()}
                            style={input}
                        />
                    )
                }
                title={searchInput ? query : 'Explore Courses'}
                left={<MenuIcon action={() => navigation.openDrawer()} />}
                right={
                    <SearchIcon
                        action={() => onToggleSearch()}
                        name={searchInput ? 'times-circle' : 'search'}
                    />
                }
            />

            <Container style={container}>
                <Content
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl refreshing={false} onRefresh={refresh} />
                    }>
                    <Text text="Featured" category="h5" bold style={heading} />
                    <DataAvailability
                        requesting={props.requesting && (!courses || Boolean(query))}
                        hasData={Boolean(courses)}
                        style={courseWrapper}>
                        {courses && (
                            <View style={{ flexDirection: 'row' }}>
                                <FlatList
                                    horizontal
                                    onEndReached={loadMore}
                                    onEndReachedThreshold={0.1}
                                    data={courses}
                                    renderItem={renderItem}
                                    showsHorizontalScrollIndicator={false}
                                    keyExtractor={course => course.id.toString()}
                                />
                                {props.requesting && <ActivityIndicator color="#1C3D6E" />}
                            </View>
                        )}
                    </DataAvailability>

                    <View style={categoryWrapper}>
                        <View style={categoryHeading}>
                            <Text text="Select from Categories" bold category="h5" />
                        </View>
                        <FilterIcon action={() => toggleFilter(!showFilter)} />
                    </View>

                    <DataAvailability
                        requesting={props.requestingCategories}
                        hasData={Boolean(props.categories)}
                        style={categoryData}>
                        {showFilter &&
                            categories &&
                            categories.map(category => (
                                <Category
                                    key={category.id}
                                    category={category}
                                    onPress={() => onPressCategory(category)}
                                />
                            ))}
                    </DataAvailability>
                </Content>
            </Container>
        </>
    );
};

const mapStateToProps = state => ({
    authToken: state.app.authToken,
    user: state.app.user,
    requesting: state.home.requesting,
    courses: state.home.courses,
    page: state.home.page,
    next: state.home.next,
    requestingCategories: state.home.requestingCategories,
    categories: state.home.categories
});

const mapDispatchToProps = dispatch => ({
    getCourses: (page, query) => dispatch(getCourses(page, query)),
    getCategories: () => dispatch(getCategories()),
    registerMobileDevice: data => dispatch(registerMobileDevice(data)),
    resetPage: () => dispatch(resetPage()),
    getSettings: () => dispatch(getSettings())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
