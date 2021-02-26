import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity, FlatList, View, ActivityIndicator } from 'react-native';
import {
    Header,
    Footer,
    BackIcon,
    Notification,
    DataAvailability
} from 'src/components';

// actions
import { getNotifications, updateNotification, resetPage } from './redux/actions';
import { resetCurrentNotifications } from 'src/screens/App/redux/actions';

// styles
import styles from './styles';

const Notifications = props => {
    const {
        next,
        page,
        notifications,
        requesting,
        navigation: { goBack }
    } = props;
    const [seenIds, updateSeenIds] = useState([]);

    useEffect(() => {
        // props.resetCurrentNotifications();
        props.getNotifications(1);
        return () => props.resetPage();
    }, []);

    const {
        container,
        dataWrapper
    } = styles;

    const onPressCourse = notification => {
        const id = notification.id;
        const course = notification.course;
        !seenIds.includes(id) && updateSeenIds(seenIds.concat(id));

        props.updateNotification(id);
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

    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => onPressCourse(item)}
        >
            <Notification notification={item} seenIds={seenIds} />
        </TouchableOpacity>
    );

    const loadMore = () => {
        next && !requesting && props.getNotifications(page + 1);
    };

    const requestingMore = () => requesting && <ActivityIndicator color="#1C3D6E" />

    return (
        <>
            <Header
                color="secondary"
                title="Notifications"
                left={<BackIcon action={() => goBack()} color="secondary" />}
            // right={
            //     <TouchableOpacity>
            //         <Icon
            //             type='FontAwesome'
            //             name='trash'
            //             style={icon}
            //         />
            //     </TouchableOpacity>
            // }
            />
            <View style={container}>
                <DataAvailability
                    requesting={requesting && !notifications}
                    hasData={Boolean(notifications)}
                    style={dataWrapper}
                >
                    {notifications &&
                        <FlatList
                            keyExtractor={item => item.id.toString()}
                            onEndReached={loadMore}
                            onEndReachedThreshold={0.1}
                            data={notifications}
                            renderItem={renderItem}
                            ListFooterComponent={requestingMore}
                            showsVerticalScrollIndicator={false}
                        />
                    }
                </DataAvailability>
            </View>
            <Footer props={props} activeScreen="Notifications" />
        </>
    );
};

const mapStateToProps = state => ({
    next: state.notifications.next,
    page: state.notifications.page,
    requesting: state.notifications.requesting,
    notifications: state.notifications.notifications
});

const mapDispatchToProps = dispatch => ({
    resetPage: () => dispatch(resetPage()),
    getNotifications: page => dispatch(getNotifications(page)),
    updateNotification: id => dispatch(updateNotification(id)),
    resetCurrentNotifications: () => dispatch(resetCurrentNotifications())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Notifications);
