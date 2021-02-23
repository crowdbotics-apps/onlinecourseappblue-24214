import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Container, Content } from 'native-base';
import { RadioButton } from 'react-native-paper';

// components
import {
  Header,
  Text,
  BackIcon,
  Button,
  DataAvailability
} from 'src/components';

// actions
import { getSubscriptionsPlans } from '../../redux/actions';

// styles
import styles from './styles';
import colors from 'src/styles/colors';

const UpdateSubscription = props => {
  const {
    user: { subscription_plan },
    requesting,
    subscriptions,
    navigation: { navigate, goBack }
  } = props;

  const [selectedPlan, setSelectedPlan] = useState(subscription_plan);

  useEffect(() => {
    props.getSubscriptionsPlans();
  }, []);

  return (
    <>
      <Header
        color="secondary"
        left={<BackIcon color="secondary" action={() => goBack()} />}
      />
      <Container style={[styles.container, styles.updateContainer]}>
        <Content showsVerticalScrollIndicator={false}>
          <Text
            text="Subscription Plans"
            category="h6"
            style={styles.heading}
            bold
          />
          <DataAvailability
            requesting={requesting}
            hasData={Boolean(subscriptions)}
            style={styles.dataWrapper}>
            {subscriptions &&
              subscriptions.map(item => (
                <View style={styles.itemWrapper} key={item.id}>
                  <Text
                    text={`Per ${item.interval}`}
                    category="s1"
                    style={styles.item}
                  />
                  <RadioButton
                    status={selectedPlan === item.id ? 'checked' : 'unchecked'}
                    color={colors.biscay}
                    uncheckedColor={colors.doveGray}
                    onPress={() => setSelectedPlan(item.id)}
                  />
                </View>
              ))}
          </DataAvailability>
        </Content>
        <Button
          text="Update"
          color="primary"
          block
          onPress={() => navigate('AddCard', { selectedPlan: selectedPlan })}
          style={styles.button}
        />
      </Container>
    </>
  );
};

const mapStateToProps = state => ({
  user: state.app.user,
  requesting: state.subscription.requesting,
  subscriptions: state.subscription.subscriptions
});

const mapDispatchToProps = dispatch => ({
  getSubscriptionsPlans: () => dispatch(getSubscriptionsPlans())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateSubscription);
