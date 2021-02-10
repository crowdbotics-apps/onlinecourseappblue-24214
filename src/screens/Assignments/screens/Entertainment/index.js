import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Content } from 'native-base';

// components
import { View, TouchableOpacity } from 'react-native';
import { CheckIcon, Button } from 'src/components';
import { Table, TableWrapper, Col } from 'react-native-table-component';

// styles
import commonStyles from '../../styles';
import styles from './styles';

const Entertainment = props => {
    const { items, lessonId, submitRequesting } = props;
    const [selected, setSelected] = useState([]);
    const getPrice = () =>
        items
            .filter(item => selected.includes(item.id))
            .reduce((sum, { price }) => (sum += Number(price)), 0);

    const onSubmit = () => {
        const data = getPrice();
        props.updateLedger({ entertainment: data, lesson: lessonId }, data);
    };

    const onSelect = id => {
        if (selected && selected.includes(id)) {
            let selectedList = selected.filter(i => i !== id);
            setSelected(selectedList);
        } else {
            setSelected(selected.concat(id));
        }
    };

    return (
        <>
            <Content showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={styles.table}>
                        <Table>
                            {items.map((item, i) => (
                                <TouchableOpacity
                                    key={i}
                                    style={styles.position}
                                    onPress={() => onSelect(item.id)}>
                                    {selected.includes(item.id) && (
                                        <CheckIcon style={styles.icon} />
                                    )}
                                    <TableWrapper style={styles.item}>
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
                        </Table>
                    </View>
                </View>
            </Content>
            <View style={commonStyles.button}>
                <Button
                    disabled={!selected.length || submitRequesting}
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
)(Entertainment);
