import {
    GET_SETTINGS,
    GET_SETTINGS_SUCCESS,
    GET_SETTINGS_FAILURE,
    UPDATE_SETTINGS,
    RESET_REQUESTING
} from './types';
  
const initialState = {
    requesting: false,
    requestingUpdate: false,
    settings: false
};
  
  export default (state = initialState, action) => {
    switch (action.type) {
        case GET_SETTINGS:
            return { ...state, requesting: true };
    
        case GET_SETTINGS_SUCCESS:
            return { ...state, requesting: false, settings: action.settings };
    
        case GET_SETTINGS_FAILURE:
            return { ...state, requesting: false, settings: false };
    
        case UPDATE_SETTINGS:
            return { ...state, requestingUpdate: true };
    
        case RESET_REQUESTING:
            return { ...state, requestingUpdate: false };
    
        default:
            return state;
    }
};
