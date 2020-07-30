import * as types from 'constants/ActionTypes';

const initialState = {
    selectedDate: new Date(),
    shiftsOnDate: [],
    selectedShift: -1,
    staffsOnShift: []
};

const welcome = (state = initialState, action) => {
    switch (action.type) {
        case types.SELECTED_DATE_ON_WELCOME:
            state.selectedDate = action.selectedDate;
            return { ...state };
        case types.LOAD_LIST_SHIFT_ON_DATE_ON_WELCOME:
            if (action.shiftsOnDate.length > 0) {
                state.shiftsOnDate = action.shiftsOnDate;
                // Select first shift.
                state.selectedShift = action.shiftsOnDate[0]
            } else {
                state.shiftsOnDate = action.shiftsOnDate;
                // Reset selected shift to None if don't have any shift.
                state.selectedShift = -1;
            }
            return { ...state };
        case types.SELECTED_SHIFT_ON_WELCOME:
            state.selectedShift = action.selectedShift;
            return { ...state };
        case types.LOAD_LIST_STAFFS_ON_SHIFT_ON_WELCOME:
            state.staffsOnShift = action.staffsOnShift;
            return { ...state };
        default:
            return { ...state };
    }
}

export default welcome;