import { call, all, put, takeLatest, select } from 'redux-saga/effects';
import * as NavigationService from 'src/navigator/NavigationService';
import { appConfig } from 'src/config/app';
import AsyncStorage from '@react-native-community/async-storage';
import { Toast } from 'native-base';

// utils
import XHR from 'src/utils/XHR';

// actions
import { setUserInfo } from 'src/screens/App/redux/actions';
import {
  getSubscriptionsPlansSuccess,
  getSubscriptionsPlansFailure,
  resetRequesting
} from './actions';

// constants
import {
  GET_SUBSCRIPTION_PLANS,
  PAYMENT_CHECKOUT,
  CANCEL_SUBSCRIPTION
} from './types';

const getAppUser = state => state.app.user;

async function getSubscriptionPlansAPI() {
  const URL = `${appConfig.backendServerURL}/payments/plans/`;
  const authToken = await AsyncStorage.getItem('authToken');

  const options = {
    headers: {
      Authorization: 'Token ' + authToken,
      'Content-Type': 'application/json'
    },
    method: 'GET'
  };

  return XHR(URL, options);
}

async function paymentCheckoutAPI(data) {
  const URL = `${appConfig.backendServerURL}/payments/checkout/`;
  const authToken = await AsyncStorage.getItem('authToken');

  const options = {
    headers: {
      Authorization: 'Token ' + authToken,
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data
  };

  return XHR(URL, options);
}

async function cancelSubscriptionAPI() {
  const URL = `${appConfig.backendServerURL}/payments/cancel/`;
  const authToken = await AsyncStorage.getItem('authToken');

  const options = {
    headers: {
      Authorization: 'Token ' + authToken,
      'Content-Type': 'application/json'
    },
    method: 'POST'
  };

  return XHR(URL, options);
}

function* getSubscriptionPlans() {
  try {
    const response = yield call(getSubscriptionPlansAPI);
    const { data } = response;

    yield put(getSubscriptionsPlansSuccess(data));
  } catch (e) {
    yield put(getSubscriptionsPlansFailure());
  }
}

function* paymentCheckout({ data }) {
  try {
    yield call(paymentCheckoutAPI, data);

    let user = yield select(getAppUser);
    user = { ...user, subscription_plan: data.plan_id };
    yield put(setUserInfo(user));

    yield put(resetRequesting());

    NavigationService.goBack();
    Toast.show({
      text: 'Your checkout completed successfully.',
      type: 'success',
      duration: 5000
    });
  } catch (e) {
    yield put(resetRequesting());
    Toast.show({
      text: 'Failed to checkout. Please try again later',
      type: 'danger',
      duration: 5000
    });
  }
}

function* cancelSubscription() {
  try {
    yield call(cancelSubscriptionAPI);

    let user = yield select(getAppUser);
    user = { ...user, subscription_plan: '' };
    yield put(setUserInfo(user));

    yield put(resetRequesting());
    Toast.show({
      text: 'Your subscription cancelled successfully.',
      type: 'success',
      duration: 5000
    });
  } catch (e) {
    yield put(resetRequesting());
    Toast.show({
      text: 'Failed to cancel subscription. Please try again later',
      type: 'danger',
      duration: 5000
    });
  }
}

export default all([
  takeLatest(GET_SUBSCRIPTION_PLANS, getSubscriptionPlans),
  takeLatest(PAYMENT_CHECKOUT, paymentCheckout),
  takeLatest(CANCEL_SUBSCRIPTION, cancelSubscription)
]);
