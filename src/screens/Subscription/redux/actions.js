import {
    GET_SUBSCRIPTION_PLANS,
    GET_SUBSCRIPTION_PLANS_FAILURE,
    GET_SUBSCRIPTION_PLANS_SUCCESS,
    PAYMENT_CHECKOUT,
    RESET_REQUESTING,
    CANCEL_SUBSCRIPTION
} from './types';
  
export const getSubscriptionsPlans = () => ({
    type: GET_SUBSCRIPTION_PLANS
});
  
export const getSubscriptionsPlansSuccess = plans => ({
    type: GET_SUBSCRIPTION_PLANS_SUCCESS,
    plans
});
  
export const getSubscriptionsPlansFailure = () => ({
    type: GET_SUBSCRIPTION_PLANS_FAILURE
});
  
export const paymentCheckout = data => ({
    type: PAYMENT_CHECKOUT,
    data
});

export const cancelSubscription = () => ({
    type: CANCEL_SUBSCRIPTION
});

export const resetRequesting = () => ({
    type: RESET_REQUESTING
});
