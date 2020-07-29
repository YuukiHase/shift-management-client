import * as types from '../constants/ActionTypes';

let initialState = {
    keyword: '',
    searchValue: '',
    staffs: [],
    selectedStartDate: new Date(),
    selectedEndDate: new Date()
}

const staffs = (state = initialState, action) => {
    switch (action.type) {
        case types.LOAD_LIST_ALL_STAFF:
            state.staffs = action.listStaff;
            return { ...state };
        case types.SEARCH_STAFF_ON_MANAGE_STAFF:
            state.keyword = action.keyword;
            return { ...state };
        case types.CHANGE_SEARCH_VALUE_ON_MANAGE_STAFF:
            state.searchValue = action.searchValue;
            return { ...state };
        case types.ADD_NEW_STAFF_TO_STAFFS:
            state.staffs.push(action.newStaff);
            return { ...state };
        case types.CHANGE_SELECTED_START_DATE_ON_STAFFS:
            state.selectedStartDate = action.selectedStartDate;
            return { ...state };
        case types.CHANGE_SELECTED_END_DATE_ON_STAFFS:
            state.selectedEndDate = action.selectedEndDate;
            return { ...state };
        default: return { ...state };
    }
}

export default staffs;