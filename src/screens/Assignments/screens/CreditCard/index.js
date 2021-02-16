import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Content } from 'native-base';

// components
import { View, StyleSheet, Image } from 'react-native';
import { Text, Input, Button } from 'src/components';

// styles
import commonStyles from '../../styles';
import styles from './styles';

// hooks
import useForm from 'src/hooks/useForm';

// utils
import validator from 'src/utils/validation';

const CreditCard = props => {
    const { items, lessonId, submitRequesting } = props;

    const [data, setData] = useState(false);

    const onSubmit = () => {
        props.updateLedger({ credit_card: data, lesson: lessonId }, data);
    };

    const stateSchema = {
        amount: { value: '', error: '' }
    };

    const validationStateSchema = {
        amount: {
            required: true,
            validator: {
                compare: val => val < items.min_payment || val > items.current_balance,
                error: `Enter value >= ${items.min_payment} and <= ${items.current_balance
                    }.`
            }
        }
    };

    const { state, handleOnChange, disable } = useForm(
        stateSchema,
        validationStateSchema
    );

    const onChange = value => {
        handleOnChange('amount', value);
        !value && setData(false);
        value && setData(value);
    };

    return (
        <>
            <Content showsVerticalScrollIndicator={false}>
                <View style={[commonStyles.imageWrapper, styles.top]}>
                    <Image
                        style={commonStyles.image}
                        source={require('../../../../../src/assets/images/credit-card.png')}
                    />
                </View>
                <View style={styles.heading}>
                    <Text
                        text={`Minimum payment: $${Number(items.min_payment).toFixed(0)}`}
                        category="h5"
                        bold
                        center
                    />
                    <Text
                        text={`Credit card Balance: $${Number(items.current_balance).toFixed(0)}`}
                        category="h5"
                        bold
                        center
                    />
                </View>
                <View style={styles.description}>
                    <Input
                        value={state.amount.value}
                        onChangeText={value => onChange(value)}
                        placeholder="Enter amount"
                        keyboardType="number-pad"
                        error={state.amount.error}
                    />
                </View>
            </Content>
            <View style={commonStyles.button}>
                <Button
                    disabled={disable || submitRequesting}
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
)(CreditCard);
