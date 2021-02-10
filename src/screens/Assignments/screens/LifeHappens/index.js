import React, { useEffect } from 'react';
import { connect } from 'react-redux';

// components
import { Content } from 'native-base';
import { Text, Button } from 'src/components';
import { View, StyleSheet, Image } from 'react-native';

// styles
import commonStyles from '../../styles';

const LifeHappens = props => {
    const { items, lessonId, submitRequesting } = props;

    const onSubmit = () => {
        props.updateLedger({ life_happens: items.loss, lesson: lessonId }, items.loss);
    };

    return (
        <>
            <Content showsVerticalScrollIndicator={false}>
                <View style={commonStyles.imageWrapper}>
                    <Image
                        style={commonStyles.image}
                        source={require('../../../../../src/assets/images/life-happens.png')}
                    />
                </View>
                <View style={styles.heading}>
                    <Text
                        text={`You owe $${Number(items.loss).toFixed(0)} for repairs.`}
                        category="h5"
                        bold
                        center
                    />
                    <Text
                        text="Your car was damaged."
                        category="h5"
                        bold
                        center
                    />
                </View>
                <View style={styles.description}>
                    <Text text={items.loss_description} category="p2" />
                </View>
            </Content>
            <View style={commonStyles.button}>
                <Button
                    disabled={submitRequesting}
                    loading={submitRequesting}
                    onPress={() => onSubmit()}
                    text="Submit"
                    color="primary"
                    block
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    heading: {
        paddingHorizontal: 25,
        paddingVertical: 5
    },
    description: {
        marginHorizontal: 10,
        paddingVertical: 15,
        paddingHorizontal: 30,
        backgroundColor: 'white',
        borderRadius: 5
    }
});

const mapStateToProps = state => ({
    submitRequesting: state.assignments.submitRequesting
});

export default connect(
    mapStateToProps,
    null
)(LifeHappens);
