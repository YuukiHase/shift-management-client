import * as types from 'constants/ActionTypes';

let initialState = {
    open: false,
    // Value to identify tab of control add.
    value: 0,
    // Staffs of control add.
    staffs: []
};

const controlAdd = (state = initialState, action) => {
    switch (action.type) {
        case types.CHANGE_OPEN_CONTROL_ADD:
            state.open = action.open;
            return { ...state };
        case types.CONTROL_ADD_VALUE:
            state.value = action.value;
            return { ...state };
        case types.CONTROL_ADD_LOAD_LIST_STAFF:
            state.staffs = action.listStaff;
            return { ...state };
        case types.CONTROL_ADD_REMOVE_STAFF:
            const indexOfStaff = state.staffs.indexOf(action.staff);
            state.staffs.splice(indexOfStaff, 1);
            return { ...state };
        default: return { ...state };
    }
}

export default controlAdd;