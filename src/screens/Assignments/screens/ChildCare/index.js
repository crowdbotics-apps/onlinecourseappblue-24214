import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Content } from 'native-base';

// components
import { Icon } from 'native-base';
import { View, TouchableOpacity } from 'react-native';
import { Text, CheckIcon, Button } from 'src/components';
import { Table, TableWrapper, Row, Col } from 'react-native-table-component';

// styles
import commonStyles from '../../styles';
import styles from './styles';

const ChildCare = props => {
    const { items, lessonId, submitRequesting } = props;

    const [showRequirement, toggleRequirement] = useState(false);
    const [selected, setSelected] = useState(false);

    const requiredItems = items.filter(item => item.type === 0);
    const addOnsItems = items.filter(item => item.type === 1);
    const sumValues = items =>
        items.reduce((sum, { price }) => (sum += Number(price)), 0);

    const [data, setData] = useState(false);

    const onSubmit = () => {
        props.updateLedger({ child_care: data, lesson: lessonId }, data);
    };

    const onSelect = (price, i) => {
        if (selected === i) {
            setSelected(false);
            setData(false);
        } else {
            setSelected(i);
            const sum = Number(price) + Number(sumValues(requiredItems));
            setData(sum);
        }
    };

    return (
        <>
            <Content showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={styles.flex}>
                        <View style={styles.viewStyle}>
                            <Text
                                text="Required Cost"
                                color="primary"
                                bold
                                style={styles.flex}
                            />
                            <TouchableOpacity
                                onPress={() => toggleRequirement(!showRequirement)}
                                style={styles.iconWrapper}>
                                <Icon
                                    type="MaterialIcons"
                                    name={showRequirement ? 'remove' : 'add'}
                                    style={styles.icon}
                                />
                            </TouchableOpacity>
                        </View>
                        <Table>
                            {showRequirement ? (
                                requiredItems.map((item, i) => (
                                    <TableWrapper style={styles.wrapper} key={i}>
                                        <Col
                                            data={[item.title]}
                                            style={styles.costColHead}
                                            textStyle={styles.costHeadText}
                                        />
                                        <Col
                                            data={[`$${Number(item.price).toFixed(0)}`]}
                                            style={styles.costColValue}
                                            textStyle={styles.costColText}
                                        />
                                    </TableWrapper>
                                ))
                            ) : (
                                    <></>
                                )}
                            <TableWrapper style={[styles.wrapper, { position: 'relative' }]}>
                                <CheckIcon style={styles.addOnCheck} />
                                <Col
                                    data={['Total']}
                                    style={styles.costColHead}
                                    textStyle={styles.costHeadText}
                                />
                                <Col
                                    data={[`$${sumValues(requiredItems)}`]}
                                    style={styles.costColValue}
                                    textStyle={styles.costColText}
                                />
                            </TableWrapper>
                        </Table>
                    </View>
                    <View style={styles.table}>
                        <Table>
                            <Row
                                data={['Add-ons']}
                                style={styles.head}
                                textStyle={styles.headText}
                            />
                            {addOnsItems.map((item, i) => (
                                <TouchableOpacity
                                    key={i}
                                    style={styles.position}
                                    onPress={() => onSelect(item.price, i + 1)}>
                                    {selected === i + 1 && (
                                        <CheckIcon style={styles.addOnCheck} />
                                    )}
                                    <TableWrapper style={styles.adsOnWrapper}>
                                        <Col
                                            data={[item.title]}
                                            style={styles.costColHead}
                                            textStyle={styles.costHeadText}
                                        />
                                        <Col
                                            data={[`$${Number(item.price).toFixed(0)}`]}
                                            style={styles.costColValue}
                                            textStyle={styles.costColText}
                                        />
                                    </TableWrapper>
                                </TouchableOpacity>
                            ))}
                            <TouchableOpacity onPress={() => onSelect(0, 0)}>
                                {selected === 0 && <CheckIcon style={styles.addOnCheck} />}
                                <TableWrapper style={styles.adsOnWrapper}>
                                    <Col
                                        data={['None']}
                                        style={styles.costColHead}
                                        textStyle={styles.costHeadText}
                                    />
                                    <Col
                                        data={['']}
                                        style={styles.costColValue}
                                        textStyle={styles.costColText}
                                    />
                                </TableWrapper>
                            </TouchableOpacity>
                        </Table>
                    </View>
                </View>
            </Content>
            <View style={commonStyles.button}>
                <Button
                    disabled={!data || submitRequesting}
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

const mapStateToProps = state => ({
    submitRequesting: state.assignments.submitRequesting
});

export default connect(
    mapStateToProps,
    null
)(ChildCare);
