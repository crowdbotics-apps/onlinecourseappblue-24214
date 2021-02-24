import React, { useState } from 'react';
import { connect } from 'react-redux';
import { CreditCardInput } from 'react-native-input-credit-card';

// components
import { Button, Header, BackIcon } from 'src/components';
import { Container, Content } from 'native-base';
import { View } from 'react-native';

// actions
import { paymentCheckout } from '../../redux/actions';

// styles
import styles from './styles';
import Colors from 'src/styles/colors';

const AddCard = props => {
  const {
    requestingUpdate,
    route: {
      params: { selectedPlan }
    },
    navigation: { goBack }
  } = props;

  const [data, setData] = useState({});

  const submit = () => {
    const values = data.values;
    const payload = {
      card_number: values.number,
      card_exp_month: values.expiry.split('/')[0],
      card_exp_year: values.expiry.split('/')[1],
      card_cvv: values.cvc,
      promo_code: '',
      plan_id: selectedPlan
    };

    props.paymentCheckout(payload);
  };

  return (
    <>
      <Header
        color="secondary"
        title="Add Card"
        left={<BackIcon color="secondary" action={() => goBack()} />}
      />
      <Container style={styles.container}>
        <Content>
          <CreditCardInput
            autoFocus
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.input}
            invalidColor={Colors.punch}
            placeholderColor={Colors.doveGray}
            onChange={data => setData(data)}
          />
        </Content>
      </Container>
      <View style={styles.button}>
        <Button
          loading={requestingUpdate}
          disabled={!data.valid}
          onPress={submit}
          text="Add Card"
          color="primary"
          block
        />
      </View>
    </>
  );
};

const mapStateToProps = state => ({
  requestingUpdate: state.subscription.requestingUpdate
});

const mapDispatchToProps = dispatch => ({
  paymentCheckout: data => dispatch(paymentCheckout(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCard);
