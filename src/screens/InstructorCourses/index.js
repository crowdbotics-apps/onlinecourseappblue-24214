import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Content } from 'native-base';
import { Header, Text, Course, Banner, ExitIcon } from 'src/components';

// styles
import commonStyle from 'src/styles/common';

const InstructorCourses = props => {
    const {
        navigation: { goBack },
    } = props;

    const {
        container,
        coursesWrapper } = commonStyle;

    return (
        <>
            <Header color="primary" left={
                <ExitIcon />
            } />

            <Banner color="primary" large />

            <Container style={container}>
                <Text
                    text="Instructor Courses"
                    category="h5"
                    bold
                    style={styles.text}
                />
                <Content showsVerticalScrollIndicator={false}>
                    <View style={coursesWrapper}>
                        <Course tag='Free' size='large' />
                        <Course tag='Premium' size='large' />
                        <Course size='large' />
                        <Course size='large' />
                    </View>
                </Content>
            </Container>
        </>
    );
};

const styles = StyleSheet.create({
    text: {
        marginVertical: 17
    }
});

export default InstructorCourses;
