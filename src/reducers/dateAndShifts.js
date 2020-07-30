import * as types from 'constants/ActionTypes';

let initialState = {
    selectedDate: new Date(),
    shiftsOnDate: [],
    selectedShift: -1
};

const dateAndShifts = (state = initialState, action) => {
    switch (action.type) {
        case types.SELECTED_SHIFT:
            state = Object.assign({}, state, {
                selectedShift: action.selectedShift,
            })
            return state;
        case types.SELECTED_DATE:
            state = Object.assign({}, state, {
                selectedDate: action.selectedDate,
            })
            return state;
        case types.LOAD_LIST_SHIFT_ON_DATE:
            if (action.shiftsOnDate.length > 0) {
                if (state.selectedShift !== -1) {
                    let isOldShift = false;
                    for (let i = 0; i < action.shiftsOnDate.length; i++) {
                        const shift = action.shiftsOnDate[i];
                        if (shift.id === state.selectedShift.id) {
                            state = Object.assign({}, state, {
                                shiftsOnDate: action.shiftsOnDate,
                                // Select old shift.
                                selectedShift: shift
                            });
                            isOldShift = true;
                            break;
                        }
                    }
                    if (isOldShift === false) {
                        state = Object.assign({}, state, {
                            shiftsOnDate: action.shiftsOnDate,
                            // Select first shift.
                            selectedShift: action.shiftsOnDate[0]
                        })
                    }
                } else {
                    state = Object.assign({}, state, {
                        shiftsOnDate: action.shiftsOnDate,
                        // Select first shift.
                        selectedShift: action.shiftsOnDate[0]
                    })
                }
            } else {
                state = Object.assign({}, state, {
                    shiftsOnDate: action.shiftsOnDate,
                    // Reset selected shift to None if don't have any shift.
                    selectedShift: -1
                })
            }
            return state;
        default: return state;
    }
}

export default dateAndShifts;