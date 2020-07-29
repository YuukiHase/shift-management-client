import * as types from '../constants/ActionTypes';

let initialState = {
    keyword: '',
    searchValue: ''
};

const searchStaffOnShift = (state = initialState, action) => {
    switch (action.type) {
        case types.SEARCH_STAFF_ON_SHIFT:
            return Object.assign({}, state, {
                keyword: action.keyword
            });
        case types.CHANGE_SEARCH_VALUE_ON_SHIFT:
            return Object.assign({}, state, {
                searchValue: action.searchValue
            });
        default: return state;
    }
}

export default searchStaffOnShift;