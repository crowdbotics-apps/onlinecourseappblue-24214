import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Content } from 'native-base';

// components
import { CheckIcon } from 'src/components';
import { View, TouchableOpacity } from 'react-native';
import { Table, TableWrapper, Row, Col } from 'react-native-table-component';
import { Button } from 'src/components';

// styles
import commonStyles from '../../styles';
import styles from './styles';


const Transportation = props => {
    const { items, lessonId, submitRequesting } = props;
    const [filterBy, setFilterBy] = useState(0);

    const [selected, setSelected] = useState(false);
    const [data, setData] = useState(false);

    const onSubmit = () => {
        props.updateLedger({ transportation: data, lesson: lessonId }, data);
    };

    const onTabChnage = tab => {
        setSelected(false);
        setData(false);
        setFilterBy(tab);
    };

    const onSelect = (price, i) => {
        if (selected === i) {
            setSelected(false);
            setData(false);
        } else {
            setSelected(i);
            setData(price);
        }
    };

    return (
        <>
            <Content showsVerticalScrollIndicator={false}>
                <View style={styles.buttonTabs}>
                    <Button
                        text="New"
                        color="primary"
                        block
                        style={[styles.tab, filterBy === 0 && styles.active]}
                        onPress={() => onTabChnage(0)}
                    />
                    <Button
                        text="Used"
                        color="primary"
                        block
                        style={[styles.tab, filterBy === 1 && styles.active]}
                        onPress={() => onTabChnage(1)}
                    />
                </View>
                <View style={styles.tableWrapper}>
                    {items
                        .filter(item => item.type === filterBy)
                        .map((item, i) => (
                            <View key={i} style={styles.tableWrapperStyle}>
                                <TouchableOpacity onPress={() => onSelect(item.total, i)}>
                                    {selected === i && <CheckIcon style={styles.check} />}
                                    <Table borderStyle={styles.table}>
                                        <Row
                                            data={[item.title]}
                                            style={styles.head}
                                            textStyle={styles.headText}
                                        />
                                        <TableWrapper style={styles.wrapper}>
                                            <Col
                                                data={[item.type === 0 ? 'New' : 'Used']}
                                                style={styles.colHead}
                                                textStyle={styles.colHeadText}
                                            />
                                            <Col
                                                data={[`$${Number(item.total).toFixed(0)}`]}
                                                style={styles.colValue}
                                                textStyle={styles.colValueText}
                                            />
                                        </TableWrapper>
                                    </Table>
                                </TouchableOpacity>
                            </View>
                        ))}
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
)(Transportation);
