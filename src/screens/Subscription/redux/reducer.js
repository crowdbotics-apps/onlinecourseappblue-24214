import {
    GET_SUBSCRIPTION_PLANS,
    GET_SUBSCRIPTION_PLANS_FAILURE,
    GET_SUBSCRIPTION_PLANS_SUCCESS,
    PAYMENT_CHECKOUT,
    RESET_REQUESTING,
    CANCEL_SUBSCRIPTION
} from './types';

const initialState = {
    requesting: false,
    requestingUpdate: false,
    subscriptions: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_SUBSCRIPTION_PLANS:
            return { ...state, requesting: true };
    
        case GET_SUBSCRIPTION_PLANS_SUCCESS:
            return {
            ...state,
            requesting: false,
            subscriptions: action.plans
            };
    
        case GET_SUBSCRIPTION_PLANS_FAILURE:
            return { ...state, requesting: false, subscriptions: false };
    
        case PAYMENT_CHECKOUT:
            return { ...state, requestingUpdate: true };
    
        case CANCEL_SUBSCRIPTION:
            return { ...state, requestingUpdate: true };
    
        case RESET_REQUESTING:
            return { ...state, requestingUpdate: false };
    
        default:
            return state;
    }
};
