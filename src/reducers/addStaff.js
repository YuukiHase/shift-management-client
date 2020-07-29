import * as types from '../constants/ActionTypes';

let initialState = {
    open: false,
    name: '',
    age: 16,
    email: '',
    phoneNumber: '',
    role: 0,
    sex: 0,
    username: '',
    password: '',
    weight: 1,
    errors: {
        name: {
            isError: false,
            massage: ''
        },
        email: {
            isError: false,
            massage: ''
        },
        phoneNumber: {
            isError: false,
            massage: ''
        },
        username: {
            isError: false,
            massage: ''
        },
        password: {
            isError: false,
            massage: ''
        }
    },
    addStaffSuccess: false,
    openSnackBar: false,
    messageSnackBar: 'Message Snack Bar'
};

const addStaff = (state = initialState, action) => {
    switch (action.type) {
        case types.CHANGE_OPEN_ON_ADD_STAFF:
            state.open = action.open;
            return { ...state };
        case types.CHANGE_NAME_ON_ADD_STAFF:
            state.name = action.name;
            return { ...state };
        case types.CHANGE_AGE_ON_ADD_STAFF:
            state.age = action.age;
            return { ...state };
        case types.CHANGE_EMAIL_ON_ADD_STAFF:
            state.email = action.email;
            return { ...state };
        case types.CHANGE_PHONENUMBER_ON_ADD_STAFF:
            state.phoneNumber = action.phoneNumber;
            return { ...state };
        case types.CHANGE_ROLE_ON_ADD_STAFF:
            state.role = action.role;
            return { ...state };
        case types.CHANGE_SEX_ON_ADD_STAFF:
            state.sex = action.sex;
            return { ...state };
        case types.CHANGE_USERNAME_ON_ADD_STAFF:
            state.username = action.username;
            return { ...state };
        case types.CHANGE_PASSWORD_ON_ADD_STAFF:
            state.password = action.password;
            return { ...state };
        case types.CHANGE_WEIGHT_ON_ADD_STAFF:
            state.weight = action.weight;
            return { ...state };
        case types.CHANGE_ERRORS_ON_ADD_STAFF:
            state.errors = action.errors;
            return { ...state };
        case types.CHANGE_ADD_STAFF_SUCCESS_ON_ADD_STAFF:
            state.addStaffSuccess = action.addStaffSuccess;
            return { ...state };
        case types.CHANGE_OPEN_SNACK_BAR_ON_ADD_STAFF:
            state.openSnackBar = action.openSnackBar;
            return { ...state };
        case types.CHANGE_MESSAGE_SNACK_BAR_ON_ADD_STAFF:
            state.messageSnackBar = action.messageSnackBar;
            return { ...state };
        case types.RESET_FORM_ON_ADD_STAFF:
            state.name = '';
            state.age = 16;
            state.email = '';
            state.phoneNumber = '';
            state.role = 0;
            state.sex = 0;
            state.username = '';
            state.password = '';
            state.weight = 1;
            return { ...state };
        default: return { ...state };
    }
}

export default addStaff;