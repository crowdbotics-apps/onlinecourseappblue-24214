import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Content } from 'native-base';

// components
import { Text, Button } from 'src/components';
import { View } from 'react-native';
import Slider from '@react-native-community/slider';
import { Table, Row, Col } from 'react-native-table-component';

// styles
import colors from 'src/styles/colors';
import commonStyles from '../../styles';
import styles from './styles';

const Restaurants = props => {
    const { items, lessonId, submitRequesting } = props;
    const [activeScreen, setSctiveScreen] = useState(0);
    const [valueFastFood, setValueFastFood] = useState(0);
    const [valueSitDown, setValueSitDown] = useState(0);
    const [totalFastFood, setFastFood] = useState(0);
    const [totalSitDown, setSitDown] = useState(0);

    const getPrice = type =>
        items
            .filter(item => item.type === type)
            .reduce((sum, { price }) => (sum += Number(price)), 0);

    const onSubmit = () => {
        const total =
            Number(totalFastFood.toFixed(0)) +
            Number(totalSitDown.toFixed(0));
        props.updateLedger({
            dining_out: total,
            lesson: lessonId
        }, total);
    };

    const onChnageValue = (type, val) => {
        if (type === 'fast_food') {
            const price = getPrice(0);
            setValueFastFood(val);
            setFastFood(val * 20 * price);
        } else {
            const price = getPrice(1);
            setValueSitDown(val);
            setSitDown(val * 20 * price);
        }
    };

    const renderScreen = () => {
        switch (activeScreen) {
            case 0:
                return (
                    <View style={styles.sliderWrapper}>
                        <Text
                            text={
                                valueFastFood > 0 ?
                                (valueFastFood * 20).toFixed(0) :
                                '0'
                            }
                            category="h5"
                            bold
                            center
                        />
                        <Slider
                            style={styles.sliderStyle}
                            value={valueFastFood}
                            onValueChange={
                                val => onChnageValue('fast_food', val)
                            }
                            step={0.05}
                            minimumValue={0}
                            maximumValue={1}
                            minimumTrackTintColor={colors.pictonBlue}
                            maximumTrackTintColor={colors.doveGray}
                        />
                    </View>
                );

            case 1:
                return (
                    <View style={styles.sliderWrapper}>
                        <Text
                            text={
                                valueSitDown > 0 ?
                                (valueSitDown * 20).toFixed(0) :
                                '0'
                            }
                            category="h5"
                            bold
                            center
                        />
                        <Slider
                            style={styles.sliderStyle}
                            value={valueSitDown}
                            onValueChange={
                                val => onChnageValue('sit_down', val)
                            }
                            step={0.05}
                            minimumValue={0}
                            maximumValue={1}
                            minimumTrackTintColor={colors.pictonBlue}
                            maximumTrackTintColor={colors.doveGray}
                        />
                    </View>
                );
    
            default:
                return null;
        }
    }

    return (
        <>
            <Content showsVerticalScrollIndicator={false}>
                <View style={styles.tableWrapper}>
                    {items
                        .filter(item => item.type === activeScreen)
                        .map((item, i) => (
                            <View key={i}>
                                <Table>
                                    <Row
                                        data={[item.title]}
                                        style={commonStyles.head}
                                        textStyle={[commonStyles.text, styles.bold]}
                                    />
                                    <Col
                                        data={[item.description]}
                                        textStyle={commonStyles.title}
                                    />
                                    <Row
                                        data={[
                                            `$${Number(item.price).toFixed(0)} per visit`
                                        ]}
                                        style={commonStyles.total}
                                        textStyle={[commonStyles.text, styles.bold]}
                                    />
                                </Table>
                            </View>
                        ))}
                </View>

                {renderScreen()}
                
                <View style={styles.steps}>
                    <View style={styles.slider}>
                        <Text text="0" category="s2" bold />
                        <Text text="5" category="s2" bold />
                        <Text text="10" category="s2" bold />
                        <Text text="15" category="s2" bold />
                        <Text text="20" category="s2" bold />
                    </View>
                    <Text
                        text="in increments of 1"
                        category="p2"
                        color="secondary"
                        bold
                        center
                    />
                </View>
            </Content>
            <View style={commonStyles.button}>
                {activeScreen < 1 ? (
                    <Button
                        disabled={!totalFastFood}
                        onPress={
                            () => setSctiveScreen(
                                activeScreen + 1
                            )
                        }
                        text="Next"
                        color="primary"
                        block
                    />
                ) : (
                        <Button
                            disabled={
                                !totalSitDown || submitRequesting
                            }
                            loading={submitRequesting}
                            onPress={onSubmit}
                            text="Submit"
                            color="primary"
                            block
                        />
                    )}
            </View>
        </>
    );
};

const mapStateToProps = state => ({
    submitRequesting: state.assignments.submitRequesting
});

export default connect(
    mapStateToProps,
    null
)(Restaurants);
