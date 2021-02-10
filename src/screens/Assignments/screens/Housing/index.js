import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Content } from 'native-base';

// components
import { CheckIcon, Button } from 'src/components';
import { Table, Row, Col } from 'react-native-table-component';
import { View, TouchableOpacity } from 'react-native';

// styles
import commonStyles from '../../styles';
import styles from './styles';

const Housing = props => {
    const { items, lessonId, submitRequesting } = props;
    const [selected, setSelected] = useState(false);
    const [data, setData] = useState(false);

    const onSubmit = () => {
        props.updateLedger({ housing: data, lesson: lessonId }, data);
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
                <View style={styles.tableWrapper}>
                    {items.map((item, i) => (
                        <View style={styles.wrapper} key={i}>
                            <TouchableOpacity
                                style={styles.position}
                                onPress={() => onSelect(item.price, i)}>
                                {selected === i && <CheckIcon style={styles.check} />}
                                <Table>
                                    <Row
                                        data={[item.title]}
                                        style={commonStyles.head}
                                        textStyle={[commonStyles.text, styles.bold]}
                                    />
                                    <Col
                                        data={[item.description]}
                                        style={{ height: '100%' }}
                                        textStyle={commonStyles.title}
                                    />
                                    <Row
                                        data={[`$${Number(item.price).toFixed(0)}`]}
                                        style={commonStyles.total}
                                        textStyle={commonStyles.text}
                                    />
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
)(Housing);
