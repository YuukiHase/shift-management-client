import * as types from 'constants/ActionTypes';

let initialState = []

const staffsOnShift = (state = initialState, action) => {
    switch (action.type) {
        case types.LOAD_LIST_STAFFS_ON_SHIFT:
            state = action.listStaffsOnShift;
            return [...state];
        case types.TAKE_ATTENDANCE:
            state = state.map(item => {
                if (item.userShift.id !== action.staffOnShift.userShift.id) {
                    return item;
                } else {
                    item.userShift.status = 'PRESENT';
                    return item;
                }
            });
            return [...state];
        case types.TAKE_WAGES:
            state = state.map(item => {
                if (item.userShift.id !== action.staffOnShift.id) {
                    return item;
                } else {
                    item.userShift.wages = action.staffOnShift.wages;
                    return item;
                }
            });
            return [...state];
        case types.ADD_STAFF_TO_STAFFS_ON_SHIFT:
            state.push(action.newStaff);
            return [...state];
        default: return [...state];
    }
}

export default staffsOnShift;