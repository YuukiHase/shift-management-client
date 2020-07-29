import * as types from '../constants/ActionTypes';

const initialState = {
    loadingLogin: false,
    loadingModal: false,
};

const loading = (state = initialState, action) => {
    switch (action.type) {
        case types.LOADING_LOGIN:
            state.loadingLogin = action.loadingLogin;
            return { ...state };
        case types.LOADING_MODAL:
            state.loadingModal = action.loadingModal;
            return { ...state };
        default:
            return { ...state };
    }
}

export default loading;