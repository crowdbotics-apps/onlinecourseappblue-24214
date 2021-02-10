import {
    LOGIN,
    RESET_LOGIN,
    FACEBOOK_LOGIN,
    APPLE_LOGIN
} from './types';

const initialState = {
    requesting: false,
    requestingFacebook: false,
    requestingApple: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return { ...state, requesting: true };

        case FACEBOOK_LOGIN:
            return { ...state, requestingFacebook: true };

        case APPLE_LOGIN:
            return { ...state, requestingApple: true };

        case RESET_LOGIN:
            return { ...state, ...initialState };

        default:
            return state;
    }
}
