import * as types from '../constants/ActionTypes';

const initialState = {
    user: {},
    redirectToReferrer: false,
    error: false
};

const login = (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN:
            state.redirectToReferrer = true;
            state.user = action.user;
            return { ...state };
        case types.LOGIN_ERROR:
            state.error = action.error;
            return { ...state };
        case types.LOGOUT:
            state.redirectToReferrer = false;
            return { ...state };
        default:
            return { ...state };
    }
}

export default login;