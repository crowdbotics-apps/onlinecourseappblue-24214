import {
    GET_SETTINGS,
    GET_SETTINGS_SUCCESS,
    GET_SETTINGS_FAILURE,
    UPDATE_SETTINGS,
    RESET_REQUESTING
} from './types';
  
export const getSettings = () => ({
    type: GET_SETTINGS
});
  
export const getSettingsSuccess = settings => ({
    type: GET_SETTINGS_SUCCESS,
    settings
});
  
export const getSettingsFailure = () => ({
    type: GET_SETTINGS_FAILURE
});
  
export const updateSettings = (id, data) => ({
    type: UPDATE_SETTINGS,
    id,
    data
});
  
export const resetRequesting = () => ({
    type: RESET_REQUESTING
});
