import * as types from '../constants/ActionTypes';
import * as callAPI from '../utils/callAPI';
import { formatDate } from '../utils/utils';
import auth from '../auth';
import * as validator from '../utils/validator';
import { DOMAIN } from '../constants/DomainAPI';

export const actLoadingLogin = (loadingLogin) => {
    return {
        type: types.LOADING_LOGIN,
        loadingLogin // loadingLogin: loadingLogin
    }
}

export const actLoadingModal = (loadingModal) => {
    return {
        type: types.LOADING_MODAL,
        loadingModal // loadingModal: loadingModal
    }
}

export const actLogin = (username, password) => {
    return dispatch => {
        const payload = {
            username,
            password
        };
        let isValid = true;
        // Username.
        if (!validator.validateUsername(username.trim())) {
            isValid = false;
        }
        // Password.
        if (!validator.validatePassword(password.trim())) {
            isValid = false;
        }
        if (isValid === true) {
            // Turn on loading.
            dispatch(actLoadingLogin(true));
            callAPI.POST(`${DOMAIN}api/login`, payload)
                .then(res => {
                    if (res.error === false) {
                        // Login success.
                        auth.authenticate(() => {
                            dispatch(actLoginSuccess(res.data));
                        });
                        dispatch(actLoginError(false));
                        // Turn off loading.
                        dispatch(actLoadingLogin(false));
                    } else {
                        console.log(res.data);
                        dispatch(actLoginError(true));
                        // Turn off loading.
                        dispatch(actLoadingLogin(false));
                    }
                });
        } else {
            dispatch(actLoginError(true));
        }
    }
};

export const actLoginError = (error) => {
    return {
        type: types.LOGIN_ERROR,
        error // error: error
    }
};

export const actLoginSuccess = (user) => {
    return {
        type: types.LOGIN,
        user // user: user
    }
};

export const actLogout = () => {
    return {
        type: types.LOGOUT
    }
};

export const actGetShiftsOnDate = (selectedDate) => {
    return dispatch => {
        // Turn on loading modal.
        dispatch(actLoadingModal(true));
        // Format date to YYYY-MM-DD.
        let date = formatDate(selectedDate);
        // Call API to get all shifts on selected date.
        callAPI.GET(`${DOMAIN}api/shift/list-shift?dateStr=${date}`)
            .then(res => {
                if (res.error === false) {
                    // Load list shifts on date to redux.
                    dispatch(actLoadListShiftsOnDate(res.data));
                    // Turn off loading modal.
                    dispatch(actLoadingModal(false));
                } else {
                    // Get message if error.
                    console.log(res.data);
                    if (res.data.includes('Schedule not found') === true) {
                        // Reset list shifts to None.
                        dispatch(actLoadListShiftsOnDate([]));
                        // Reset list user on shift.
                        dispatch(actLoadListStaffsOnShift([]));
                    }
                    // Turn off loading modal.
                    dispatch(actLoadingModal(false));
                }
            });
    }
}

export const actLoadListAllStaff = (listStaff) => {
    return {
        type: types.LOAD_LIST_ALL_STAFF,
        listStaff // listStaff: listStaff
    }
};

export const actLoadListStaffsOnShift = (listStaffsOnShift) => {
    return {
        type: types.LOAD_LIST_STAFFS_ON_SHIFT,
        listStaffsOnShift // listStaffsOnShift: listStaffsOnShift
    }
};

export const actSearchStaffOnShift = (keyword) => {
    return {
        type: types.SEARCH_STAFF_ON_SHIFT,
        keyword // keyword: keyword
    }
};

export const actChangeSearchValueOnShift = (searchValue) => {
    return {
        type: types.CHANGE_SEARCH_VALUE_ON_SHIFT,
        searchValue // searchValue: searchValue
    }
};

export const actSelectShift = (selectedShift) => {
    return {
        type: types.SELECTED_SHIFT,
        selectedShift // selectedShift: selectedShift
    }
};

export const actSelectDate = (selectedDate) => {
    return dispatch => {
        dispatch(actSelectedDate(selectedDate));
        dispatch(actGetShiftsOnDate(selectedDate));
    }
};

export const actSelectedDate = (selectedDate) => {
    return {
        type: types.SELECTED_DATE,
        selectedDate // selectedDate: selectedDate
    }
}

export const actLoadListShiftsOnDate = (shiftsOnDate) => {
    return {
        type: types.LOAD_LIST_SHIFT_ON_DATE,
        shiftsOnDate // shiftsOnDate: shiftsOnDate
    }
};

export const actTakeAttendance = (staffOnShift, selectedShift) => {
    return dispatch => {
        // Turn on loading modal.
        dispatch(actLoadingModal(true));
        callAPI.PUT(`${DOMAIN}api/shift-request/take-attendance2?userShiftId=${staffOnShift.userShift.id}`)
            .then(response => {
                if (response.ok) {
                    // Set staff's status.
                    dispatch(actSetAttendance(staffOnShift));
                    // Calculate staff's wages.
                    callAPI.POST(`${DOMAIN}api/shift-request/compute-salary?username=${staffOnShift.user.username}&scheduleID=${selectedShift.scheduleID}&shiftID=${selectedShift.id}&finishWork=${selectedShift.finish}`)
                        .then(res => {
                            if (res.error === false) {
                                // If not error set staff's wages.
                                dispatch(actSetWages(res.data));
                                // Turn off loading modal.
                                dispatch(actLoadingModal(false));
                            } else {
                                console.log(res.data);
                                // Turn off loading modal.
                                dispatch(actLoadingModal(false));
                            }
                        });
                }
            });
    };
};

export const actSetAttendance = (staffOnShift) => {
    return {
        type: types.TAKE_ATTENDANCE,
        staffOnShift // staffOnShift: staffOnShift
    }
};

export const actSetWages = (staffOnShift) => {
    return {
        type: types.TAKE_WAGES,
        staffOnShift // staffOnShift: staffOnShift
    }
};

export const actChangeAmountShiftOnAddShift = (amountShift) => {
    return {
        type: types.CHANGE_AMOUNT_SHIFT_ON_ADD_SHIFT,
        amountShift // amountShift: amountShift
    }
}

export const actChangeSelectedDateOnAddShift = (selectedDate) => {
    return {
        type: types.CHANGE_SELECTED_DATE_ON_ADD_SHIFT,
        selectedDate // selectedDate: selectedDate
    }
}

export const actChangeBonusRateOnAddShift = (bonusRate, index) => {
    return {
        type: types.CHANGE_BONUS_RATE_ON_ADD_SHIFT,
        bonusRate, // bonusRate: bonusRate
        index // index: index
    }
}

export const actChangeStartTimeOnAddShift = (time, index) => {
    return {
        type: types.CHANGE_START_TIME_ON_ADD_SHIFT,
        time, // time: time
        index // index: index
    }
}

export const actChangeFinishTimeOnAddShift = (time, index) => {
    return {
        type: types.CHANGE_FINISH_TIME_ON_ADD_SHIFT,
        time, // time: time
        index // index: index
    }
}

export const actChangeSlotOnAddShift = (slot, index) => {
    return {
        type: types.CHANGE_SLOT_ON_ADD_SHIFT,
        slot, // slot: slot
        index // index: index
    }
}

export const actOpenSnackBarOnAddShift = (openSnackBar) => {
    return {
        type: types.CHANGE_ADD_OPEN_SNACKBAR_ON_ADD_SHIFT,
        openSnackBar // openSnackBar: openSnackBar
    }
}

export const actChangeErrorMessageOnAddShift = (errorMessage) => {
    return {
        type: types.CHANGE_ERROR_MESSAGE_ON_ADD_SHIFT,
        errorMessage // errorMessage: errorMessage
    }
}

export const actCreateShifts = (newShifts, selectedDateOnManangeShift, selectedDateOnCreateShift) => {
    return dispatch => {
        // Turn on loading modal.
        dispatch(actLoadingModal(true));
        callAPI.POST(`${DOMAIN}api/shift/create`, newShifts)
            .then(res => {
                if (res.error === false) {
                    // Turn off loading modal.
                    dispatch(actLoadingModal(false));
                    // Turn on snackbar.
                    dispatch(actAddShiftSuccess(true));
                    dispatch(actChangeOpenControlAdd(false));
                    // Load new shifts to redux. If selectedDate on manage shift is selectedDate on create shift.
                    if (formatDate(selectedDateOnManangeShift) === formatDate(selectedDateOnCreateShift)) {
                        dispatch(actGetShiftsOnDate(selectedDateOnManangeShift));
                    }
                } else {
                    // Turn off loading modal.
                    dispatch(actLoadingModal(false));
                    // Show error.
                    dispatch(actChangeErrorMessageOnAddShift(res.data));
                    dispatch(actOpenSnackBarOnAddShift(true));
                }
            });
    }
}

export const actAddShiftSuccess = (addShiftsSuccess) => {
    return {
        type: types.CHANGE_ADD_SHIFT_SUCCESS_ON_ADD_SHIFT,
        addShiftsSuccess // addShiftsSuccess: addShiftsSuccess
    }
}

export const actSearchStaffOnManageStaff = (keyword) => {
    return {
        type: types.SEARCH_STAFF_ON_MANAGE_STAFF,
        keyword // keyword: keyword
    }
}

export const actChangeSearchValueOnManageStaff = (searchValue) => {
    return {
        type: types.CHANGE_SEARCH_VALUE_ON_MANAGE_STAFF,
        searchValue // searchValue: searchValue
    }
}

export const actChangeOpenControlAdd = (open) => {
    return {
        type: types.CHANGE_OPEN_CONTROL_ADD,
        open // open: open
    }
}

export const actChangeControlAddValue = (value) => {
    return {
        type: types.CONTROL_ADD_VALUE,
        value // value: value
    }
}

export const actLoadListStaffToControlAdd = (listStaff) => {
    return {
        type: types.CONTROL_ADD_LOAD_LIST_STAFF,
        listStaff // listStaff: listStaff
    }
}

export const actAgreeAddStaffToShift = (selectedStaff, selectedShift) => {
    return dispatch => {
        // Turn on loading modal.
        dispatch(actLoadingModal(true));
        callAPI.POST(`${DOMAIN}api/register/shift?username=${selectedStaff.username}&shiftID=${selectedShift.id}`)
            .then(res => {
                if (res.error === false) {
                    // Register user to shift success. Then must to approve this register.
                    callAPI.POST(`${DOMAIN}api/shift-request/approve?username=${selectedStaff.username}&shiftID=${selectedShift.id}&registerID=${res.data.registerID}`)
                        .then(res => {
                            if (res.error === false) {
                                // Approve register success.
                                const newStaffOnShift = {
                                    userShift: res.data,
                                    user: selectedStaff
                                }
                                // Then load this userShift into staffsOnShift redux store.
                                dispatch(actAddStaffToStaffsOnShift(newStaffOnShift));
                                // Turn off loading modal.
                                dispatch(actLoadingModal(false));
                            } else {
                                console.log(res.data);
                                // Turn off loading modal.
                                dispatch(actLoadingModal(false));
                            }
                        }
                        )
                } else {
                    console.log(res.data);
                    // Turn off loading modal.
                    dispatch(actLoadingModal(false));
                }
            });
    }
}

export const actAddStaffToStaffsOnShift = (newStaff) => {
    return {
        type: types.ADD_STAFF_TO_STAFFS_ON_SHIFT,
        newStaff // newStaff: newStaff
    }
}

export const actRemoveStaffInControlAdd = (staff) => {
    return {
        type: types.CONTROL_ADD_REMOVE_STAFF,
        staff // staff: staff
    }
}

export const actChangeOpenOnAddStaff = (open) => {
    return {
        type: types.CHANGE_OPEN_ON_ADD_STAFF,
        open // open: open
    }
}

export const actChangeNameOnAddStaff = (name) => {
    return {
        type: types.CHANGE_NAME_ON_ADD_STAFF,
        name // name: name
    }
}

export const actChangeAgeOnAddStaff = (age) => {
    return {
        type: types.CHANGE_AGE_ON_ADD_STAFF,
        age // age: age
    }
}

export const actChangeEmailOnAddStaff = (email) => {
    return {
        type: types.CHANGE_EMAIL_ON_ADD_STAFF,
        email // email: email
    }
}

export const actChangePhoneNumberOnAddStaff = (phoneNumber) => {
    return {
        type: types.CHANGE_PHONENUMBER_ON_ADD_STAFF,
        phoneNumber // phoneNumber: phoneNumber
    }
}

export const actChangeRoleOnAddStaff = (role) => {
    return {
        type: types.CHANGE_ROLE_ON_ADD_STAFF,
        role // role: role
    }
}

export const actChangeSexOnAddStaff = (sex) => {
    return {
        type: types.CHANGE_SEX_ON_ADD_STAFF,
        sex // sex: sex
    }
}

export const actChangeUsernameOnAddStaff = (username) => {
    return {
        type: types.CHANGE_USERNAME_ON_ADD_STAFF,
        username // username: username
    }
}

export const actChangePasswordOnAddStaff = (password) => {
    return {
        type: types.CHANGE_PASSWORD_ON_ADD_STAFF,
        password // password: password
    }
}

export const actChangeWeightOnAddStaff = (weight) => {
    return {
        type: types.CHANGE_WEIGHT_ON_ADD_STAFF,
        weight // weight: weight
    }
}

export const actChangeErrorsOnAddStaff = (errors) => {
    return {
        type: types.CHANGE_ERRORS_ON_ADD_STAFF,
        errors // errors: errors
    }
}

export const actCreateStaff = (newStaff) => {
    return dispatch => {
        // Turn on loading modal.
        dispatch(actLoadingModal(true));
        callAPI.POST(`${DOMAIN}api/user/create`, newStaff)
            .then(res => {
                if (res.error === false) {
                    // Turn off loading modal.
                    dispatch(actLoadingModal(false));
                    // Create success. Then add newStaff to redux.
                    dispatch(actAddStaffSuccess(true));
                    dispatch(actAddNewStaffToStaffs(res.data));
                    // Close modal.
                    dispatch(actChangeOpenOnAddStaff(false));
                    // Reset form.
                    dispatch(actResetFormOnAddStaff());
                } else {
                    if (res.data.includes('Account is exist') === true) {
                        // Turn off loading modal.
                        dispatch(actLoadingModal(false));
                        // Show error.
                        dispatch(actChangeOpenSnackBarOnAddStaff(true));
                        dispatch(actChangeMessageSnackBarOnAddStaff('Username is exist'));
                    } else {
                        console.log(res.data);
                        // Turn off loading modal.
                        dispatch(actLoadingModal(false));
                    }
                }
            })
    }
}

export const actAddNewStaffToStaffs = (newStaff) => {
    return {
        type: types.ADD_NEW_STAFF_TO_STAFFS,
        newStaff // newStaff: newStaff
    }
}

export const actAddStaffSuccess = (addStaffSuccess) => {
    return {
        type: types.CHANGE_ADD_STAFF_SUCCESS_ON_ADD_STAFF,
        addStaffSuccess // addStaffSuccess: addStaffSuccess
    }
}
export const actResetFormOnAddStaff = () => {
    return {
        type: types.RESET_FORM_ON_ADD_STAFF
    }
}

export const actChangeOpenSnackBarOnAddStaff = (openSnackBar) => {
    return {
        type: types.CHANGE_OPEN_SNACK_BAR_ON_ADD_STAFF,
        openSnackBar // openSnackBar: openSnackBar
    }
}

export const actChangeMessageSnackBarOnAddStaff = (messageSnackBar) => {
    return {
        type: types.CHANGE_MESSAGE_SNACK_BAR_ON_ADD_STAFF,
        messageSnackBar // messageSnackBar: messageSnackBar
    }
}

export const actChangeStartDateOnStaffs = (selectedStartDate) => {
    return {
        type: types.CHANGE_SELECTED_START_DATE_ON_STAFFS,
        selectedStartDate // selectedStartDate: selectedStartDate
    }
}

export const actChangeEndDateOnStaffs = (selectedEndDate) => {
    return {
        type: types.CHANGE_SELECTED_END_DATE_ON_STAFFS,
        selectedEndDate // selectedEndDate: selectedEndDate
    }
}

export const actGetSalary = (selectedStartDate, selectedEndDate, staffs) => {
    return dispatch => {
        // Turn on loading modal.
        dispatch(actLoadingModal(true));
        callAPI.POST(`${DOMAIN}api/user/total-salary?fromDate=${formatDate(selectedStartDate)}&toDate=${formatDate(selectedEndDate)}`, staffs)
            .then(res => {
                if (res.error === false) {
                    // Turn off loading modal.
                    dispatch(actLoadingModal(false));
                    // Get salary success.
                    dispatch(actGetSalarySuccess(res.data));
                } else {
                    console.log(res.data);
                    // Turn off loading modal.
                    dispatch(actLoadingModal(false));
                }
            })
    }
}

export const actGetSalarySuccess = (staffs) => {
    return dispatch => {
        dispatch(actLoadListAllStaff(staffs));
    }
}

export const actSelectDateOnWelcome = (selectedDate) => {
    return dispatch => {
        dispatch(actSelectedDateOnWelcome(selectedDate));
        dispatch(actGetShiftsOnWelcome(selectedDate));
    }
}

export const actSelectedDateOnWelcome = (selectedDate) => {
    return {
        type: types.SELECTED_DATE_ON_WELCOME,
        selectedDate // selectedDate: selectedDate
    }
}

export const actGetShiftsOnWelcome = (selectedDate) => {
    return dispatch => {
        // Turn on loading modal.
        dispatch(actLoadingModal(true));
        // Format date to YYYY-MM-DD.
        let date = formatDate(selectedDate);
        // Call API to get all shifts on selected date.
        callAPI.GET(`${DOMAIN}api/shift/list-shift?dateStr=${date}`)
            .then(res => {
                if (res.error === false) {
                    // Turn off loading modal.
                    dispatch(actLoadingModal(false));
                    // Load list shifts on date to redux.
                    dispatch(actLoadListShiftsOnDateWelcome(res.data));
                } else {
                    // Turn off loading modal.
                    dispatch(actLoadingModal(false));
                    // Get message if error.
                    console.log(res.data);
                    if (res.data.includes('Schedule not found') === true) {
                        // Reset list shifts to None.
                        dispatch(actLoadListShiftsOnDateWelcome([]));
                        // Reset list user on shift.
                        dispatch(actLoadListStaffsOnShiftOnWelcome([]));
                    }
                }
            });
    }
}

export const actLoadListShiftsOnDateWelcome = (shiftsOnDate) => {
    return {
        type: types.LOAD_LIST_SHIFT_ON_DATE_ON_WELCOME,
        shiftsOnDate // shiftsOnDate: shiftsOnDate
    }
};

export const actSelectShiftOnWelcome = (selectedShift) => {
    return {
        type: types.SELECTED_SHIFT_ON_WELCOME,
        selectedShift // selectedShift: selectedShift
    }
};

export const actLoadListStaffsOnShiftOnWelcome = (staffsOnShift) => {
    return {
        type: types.LOAD_LIST_STAFFS_ON_SHIFT_ON_WELCOME,
        staffsOnShift // staffsOnShift: staffsOnShift
    }
};
