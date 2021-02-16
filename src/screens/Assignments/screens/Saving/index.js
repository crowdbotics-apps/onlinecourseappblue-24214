import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Content } from 'native-base';
import { View } from 'react-native';
import Slider from '@react-native-community/slider';
import { Table, TableWrapper, Row, Rows } from 'react-native-table-component';

import { Text, Button } from 'src/components';

// styles
import colors from 'src/styles/colors';
import commonStyle from '../../styles';
import styles from './styles';

const Saving = props => {
    const { min_range, max_range, ledger, lessonId, submitRequesting } = props;
    const [isGivingScreen, setIsGivingScreen] = useState(false);

    const [savingValue, changeSavingValue] = useState(min_range);
    const [savingCost, setSavingCost] = useState(false);
    const [givingValue, changeGivingValue] = useState(0);
    const [givingCost, setGivingCost] = useState(false);

    let balance = ledger.initial_balance;

    useEffect(() => {
        setSavingCost(ledger.saving);
        setGivingCost(ledger.giving);
    }, []);

    const onSubmit = () => {
        props.updateLedger({ 
            saving: savingCost,
            giving: givingCost,
            lesson: lessonId
        }, savingCost + givingCost);
    };

    const calculate = (type, val) => {
        let percentage = ((val / 100) * balance).toFixed(0);

        if (type === 1){
            changeSavingValue(val);
            setSavingCost(percentage);
        } else {
            changeGivingValue(val);
            setGivingCost(percentage);
        }
    };

    return (
        <>
            <Content showsVerticalScrollIndicator={false}>
                {isGivingScreen ?
                    <>
                        <View style={styles.sliderWrapper}>
                            <Text
                                text={`${givingValue.toFixed(1)}%`}
                                category="h5"
                                bold
                                center
                            />
                            <Slider
                                style={styles.slider}
                                value={givingValue}
                                onValueChange={val => calculate(2, val)}
                                minimumValue={min_range}
                                maximumValue={max_range}
                                minimumTrackTintColor={colors.pictonBlue}
                                maximumTrackTintColor={colors.doveGray}
                            />
                            <View style={styles.sliderInfo}>
                                <View style={styles.minValue}>
                                    <Text text={`${min_range}%`} category="s2" bold />
                                </View>
                                <View style={styles.maxValue}>
                                    <Text text={`${max_range}%`} category="s2" bold />
                                </View>
                            </View>
                        </View>
                        <View style={styles.contentWrapper}>
                            <Text
                                text="FINANCIAL FLIGHT PLAN"
                                color="primary"
                                category="h5"
                                style={styles.heading}
                                bold
                                center
                            />
                            <Table borderStyle={styles.table}>
                                <Row
                                    data={['Description', 'Cost', 'Balance']}
                                    flexArr={[2, 1, 1]}
                                    style={styles.head}
                                    textStyle={styles.tableHeadText}
                                />
                                <TableWrapper style={styles.wrapper}>
                                    <Rows
                                        data={[['Net HouseHold Income', '', `$${Number(balance).toFixed(0)}`]]}
                                        flexArr={[2, 1, 1]}
                                        textStyle={styles.text}
                                    />
                                </TableWrapper>
                                <TableWrapper style={styles.wrapper}>
                                    <Rows
                                        data={[[
                                            'Savings', 
                                            savingCost && `$${Number(savingCost).toFixed(0)}`, 
                                            savingCost && `$${Number(balance - savingCost).toFixed(0)}`
                                            ],[
                                            'Givings', 
                                            givingCost && `$${Number(givingCost).toFixed(0)}`, 
                                            givingCost &&
                                                `$${Number(
                                                    balance - (Number(savingCost) + Number(givingCost))
                                                ).toFixed(0)}`    
                                        ]]}
                                        flexArr={[2, 1, 1]}
                                        textStyle={styles.text}
                                    />
                                </TableWrapper>
                            </Table>
                        </View>
                    </>
                    :
                    <>
                        <View style={styles.sliderWrapper}>
                            <Text
                                text={`${savingValue.toFixed(1)}%`}
                                category="h5"
                                bold
                                center
                            />
                            <Slider
                                style={styles.slider}
                                value={savingValue}
                                onValueChange={val => calculate(1, val)}
                                minimumValue={min_range}
                                maximumValue={max_range}
                                minimumTrackTintColor={colors.pictonBlue}
                                maximumTrackTintColor={colors.doveGray}
                            />
                            <View style={styles.sliderInfo}>
                                <View style={styles.minValue}>
                                    <Text text={`${min_range}%`} category="s2" bold />
                                </View>
                                <View style={styles.maxValue}>
                                    <Text text={`${max_range}%`} category="s2" bold />
                                </View>
                            </View>
                        </View>
                        <View style={styles.contentWrapper}>
                            <Text
                                text="FINANCIAL FLIGHT PLAN"
                                color="primary"
                                category="h5"
                                style={styles.heading}
                                bold
                                center
                            />
                            <Table borderStyle={styles.table}>
                                <Row
                                    data={['Description', 'Cost', 'Balance']}
                                    flexArr={[2, 1, 1]}
                                    style={styles.head}
                                    textStyle={styles.tableHeadText}
                                />
                                <TableWrapper style={styles.wrapper}>
                                    <Rows
                                        data={[['Net HouseHold Income', '', `$${Number(balance).toFixed(0)}`]]}
                                        flexArr={[2, 1, 1]}
                                        textStyle={styles.text}
                                    />
                                </TableWrapper>
                                <TableWrapper style={styles.wrapper}>
                                    <Rows
                                        data={[[
                                            'Savings', 
                                            savingCost && `$${Number(savingCost).toFixed(0)}`, 
                                            savingCost && `$${Number(balance - savingCost).toFixed(0)}`
                                        ]]}
                                        flexArr={[2, 1, 1]}
                                        textStyle={styles.text}
                                    />
                                </TableWrapper>
                            </Table>
                        </View>
                    </>
                }
            </Content>
            <View style={commonStyle.button}>
                {isGivingScreen ?
                    <Button
                        disabled={
                            !savingCost || !givingCost || submitRequesting
                        }
                        loading={submitRequesting}
                        onPress={() => onSubmit()}
                        text="Submit"
                        color="primary"
                        block
                    />
                    :
                    <Button
                        disabled={!savingCost}
                        onPress={() => setIsGivingScreen(true)}
                        text="Next"
                        color="primary"
                        block
                    />
                }
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
)(Saving);
