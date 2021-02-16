import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Content } from 'native-base';

// components
import { View, TouchableOpacity } from 'react-native';
import { CheckIcon, Button } from 'src/components';
import { Table, TableWrapper, Row, Col } from 'react-native-table-component';

// constants
import { homeFurnishingHeadings } from '../../constants';

// styles
import commonStyles from '../../styles';
import styles from '../PersonalCare/styles';

const HomeFurnishing = props => {
    const { items, lessonId, submitRequesting } = props;

    const [data, setData] = useState(0);
    const [temp, setTemp] = useState(0);
    const [screen, setScreen] = useState(0);
    const [selected, setSelected] = useState(false);

    const onSubmit = () => {
        if (screen < 3) {
            setData(data + temp);
            setTemp(0);
            setSelected(false);
            setScreen(screen + 1);
        } else {
            const total = data + temp
            props.updateLedger({ home_furnishings: total, lesson: lessonId }, total);
        }
    };

    const onSelect = (price, i) => {
        if (selected === i) {
            setSelected(false);
            setTemp(false);
        } else {
            setSelected(i);
            setTemp(Number(price));
        }
    };

    const renderItems = () => {
        return items
            .filter(item => item.type === screen)
            .map((item, i) => (
                <TouchableOpacity
                    key={i}
                    style={styles.position}
                    onPress={() => onSelect(item.price, i)}>
                    {selected === i && <CheckIcon style={styles.icon} />}
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
            ))
    };

    return (
        <>
            <Content showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={styles.table}>
                        <Table>
                            <Row
                                data={[homeFurnishingHeadings[`${screen}`]]}
                                style={styles.head}
                                textStyle={styles.headText}
                            />
                            {renderItems()}
                        </Table>
                    </View>
                </View>
            </Content>
            <View style={commonStyles.button}>
                <Button
                    disabled={!temp || submitRequesting}
                    loading={submitRequesting}
                    onPress={() => onSubmit()}
                    text={screen < 3 ? 'Next' : 'Submit'}
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
)(HomeFurnishing);
