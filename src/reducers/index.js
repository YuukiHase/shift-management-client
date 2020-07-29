import { combineReducers } from 'redux';
import staffs from './staffs';
import staffsOnShift from './staffsOnShift';
import searchStaffOnShift from './searchStaffOnShift';
import dateAndShifts from './dateAndShifts';
import addShifts from './addShifts';
import controlAdd from './controlAdd';
import addStaff from './addStaff';
import login from './login';
import welcome from './welcome';
import loading from './loading';

const appReducers = combineReducers({
    staffs,
    staffsOnShift,
    searchStaffOnShift,
    dateAndShifts,
    addShifts,
    controlAdd,
    addStaff,
    login,
    welcome,
    loading
})

export default appReducers;