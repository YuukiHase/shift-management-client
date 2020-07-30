import * as types from 'constants/ActionTypes';
import { formatDate, formatTime } from 'utils/utils';

let initialState = {
    selectedDate: new Date(),
    amountShift: 1,
    shifts: [
        {
            bonusRate: 1,
            start: formatTime(new Date('Thu Mar 12 1998 00:00:00 GMT+0700')),
            finish: formatTime(new Date('Thu Mar 12 1998 00:00:00 GMT+0700')),
            slot: 0,
            date: formatDate(new Date()),
        }
    ],
    addShiftsSuccess: false,
    errorMessage: 'Error Message',
    openSnackBar: false
};

const addShifts = (state = initialState, action) => {
    switch (action.type) {
        case types.CHANGE_AMOUNT_SHIFT_ON_ADD_SHIFT:
            state = Object.assign({}, state, {
                amountShift: action.amountShift,
            });
            let shifts = [];
            for (let i = 0; i < action.amountShift; i++) {
                shifts = shifts.concat([{
                    bonusRate: 1,
                    start: formatTime(new Date('Thu Mar 12 1998 00:00:00 GMT+0700')),
                    finish: formatTime(new Date('Thu Mar 12 1998 00:00:00 GMT+0700')),
                    slot: 0,
                    date: state.selectedDate,
                }])
            };
            state.shifts = shifts;
            return { ...state };
        case types.CHANGE_SELECTED_DATE_ON_ADD_SHIFT:
            state = Object.assign({}, state, {
                selectedDate: action.selectedDate,
            });
            state.shifts.map(item => (
                item.date = formatDate(action.selectedDate)
            ))
            return { ...state };
        case types.CHANGE_BONUS_RATE_ON_ADD_SHIFT:
            state.shifts[action.index].bonusRate = action.bonusRate;
            return { ...state };
        case types.CHANGE_START_TIME_ON_ADD_SHIFT:
            state.shifts[action.index].start = formatTime(action.time);
            return { ...state };
        case types.CHANGE_FINISH_TIME_ON_ADD_SHIFT:
            state.shifts[action.index].finish = formatTime(action.time);
            return { ...state };
        case types.CHANGE_SLOT_ON_ADD_SHIFT:
            state.shifts[action.index].slot = action.slot;
            return { ...state };
        case types.CHANGE_ERROR_MESSAGE_ON_ADD_SHIFT:
            state.errorMessage = action.errorMessage;
            return { ...state };
        case types.CHANGE_ADD_OPEN_SNACKBAR_ON_ADD_SHIFT:
            state.openSnackBar = action.openSnackBar;
            return { ...state };
        case types.CHANGE_ADD_SHIFT_SUCCESS_ON_ADD_SHIFT:
            state.addShiftsSuccess = action.addShiftsSuccess;
            return { ...state };
        default: return state;
    }
}

export default addShifts;