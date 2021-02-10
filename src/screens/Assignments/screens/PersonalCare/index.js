import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Content } from 'native-base';

// components
import { View, TouchableOpacity } from 'react-native';
import { CheckIcon, Button } from 'src/components';
import { Table, TableWrapper, Row, Col } from 'react-native-table-component';

// constants
import { personalCareHeadings } from '../../constants';

// styles
import commonStyles from '../../styles';
import styles from './styles';

const PersonalCare = props => {
    const { items, lessonId, submitRequesting } = props;

    const [data, setData] = useState(0);
    const [temp, setTemp] = useState(0);
    const [screen, setScreen] = useState(0);
    const [filterBy, setFilterBy] = useState(0);
    const [selected, setSelected] = useState(false);

    const onSubmit = () => {
        if (screen < 4) {
            setData(data + temp);
            setTemp(0);
            setSelected(false);
            setScreen(screen + 1);
        } else {
            const total = data + temp;
            props.updateLedger({
                personal_care: total,
                lesson: lessonId
            }, total);
        }
    };

    const onTabChnage = tab => {
        setSelected(false);
        setTemp(false);
        setFilterBy(tab);
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
        const filter = screen < 1 ? filterBy : screen + 1;

        return items
            .filter(item => item.type === filter)
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
                            data={[
                                `$${Number(item.price).toFixed(0)}`
                            ]}
                            style={styles.costColValue}
                            textStyle={styles.costColText}
                        />
                    </TableWrapper>
                </TouchableOpacity>
            ));
    };

    return (
        <>
            <Content showsVerticalScrollIndicator={false}>
                {screen === 0 && (
                    <View style={styles.buttonTabs}>
                        <Button
                            text="Men"
                            color="primary"
                            block
                            style={[
                                styles.tab, filterBy === 0 && styles.active
                            ]}
                            onPress={() => onTabChnage(0)}
                        />
                        <Button
                            text="Women"
                            color="primary"
                            block
                            style={[
                                styles.tab,
                                filterBy === 1 && styles.active
                            ]}
                            onPress={() => onTabChnage(1)}
                        />
                    </View>
                )}
                {screen < 4 ?
                    <View style={styles.container}>
                        <View style={styles.table}>
                            <Table>
                                <Row
                                    data={[
                                        personalCareHeadings[
                                        `${screen < 1 ? filterBy : screen + 1}`
                                        ]
                                    ]}
                                    style={styles.head}
                                    textStyle={styles.headText}
                                />
                                {renderItems()}
                            </Table>
                        </View>
                    </View>
                    :
                    <View style={styles.tableWrapper}>
                        {items
                        .filter(item => item.type === 5)
                        .map((item, i) => (
                            <View style={styles.clothingWrapper} key={i}>
                                <TouchableOpacity
                                    style={styles.position}
                                    onPress={() => onSelect(item.price, i)}>
                                    {selected === i && <CheckIcon style={styles.clothingIcon} />}
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
                                            data={[`$${Number(item.price).toFixed(0)}`]}
                                            style={commonStyles.total}
                                            textStyle={commonStyles.text}
                                        />
                                    </Table>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>    
                }
            </Content>
            <View style={commonStyles.button}>
                <Button
                    disabled={
                        (temp === 0 ? false : !Boolean(temp)) || submitRequesting
                    }
                    loading={submitRequesting}
                    onPress={() => onSubmit()}
                    text={screen < 4 ? 'Next' : 'Submit'}
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
)(PersonalCare);
