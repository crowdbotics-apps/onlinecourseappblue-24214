import { LOGIN, RESET_LOGIN, FACEBOOK_LOGIN, APPLE_LOGIN } from './types';

export const login = data => ({
    type: LOGIN,
    data
});

export const resetLogin = () => ({
    type: RESET_LOGIN
});

export const facebookLogin = accessToken => ({
    type: FACEBOOK_LOGIN,
    accessToken
});

export const appleLogin = data => ({
    type: APPLE_LOGIN,
    data
});