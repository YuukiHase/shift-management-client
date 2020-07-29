import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { styles } from './styles';
import Button from '@material-ui/core/Button';
import * as validator from '../../../../../../utils/validator';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {
    actChangeErrorsOnAddStaff,
    actCreateStaff,
    actChangeOpenOnAddStaff,
    actChangeOpenSnackBarOnAddStaff
} from '../../../../../../actions';

const useStyles = makeStyles(styles);

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function AddStaffFooter(props) {
    const classes = useStyles();
    const name = useSelector(state => state.addStaff.name);
    const age = useSelector(state => state.addStaff.age);
    const email = useSelector(state => state.addStaff.email);
    const phoneNumber = useSelector(state => state.addStaff.phoneNumber);
    const role = useSelector(state => state.addStaff.role);
    const sex = useSelector(state => state.addStaff.sex);
    const username = useSelector(state => state.addStaff.username);
    const password = useSelector(state => state.addStaff.password);
    const weight = useSelector(state => state.addStaff.weight);
    const openSnackBar = useSelector(state => state.addStaff.openSnackBar);
    const messageSnackBar = useSelector(state => state.addStaff.messageSnackBar);
    const dispatch = useDispatch();

    const onCloseModal = () => {
        dispatch(actChangeOpenOnAddStaff(false));
    }

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(actChangeOpenSnackBarOnAddStaff(false));
    };

    const handleCreate = () => {
        let isValid = true;
        let errors = {};
        // Name.
        if (5 <= name.trim().length && name.trim().length <= 50) {
            errors.name = {
                isError: false,
                message: ''
            }
        } else if (name.trim() === '') {
            isValid = false;
            errors.name = {
                isError: true,
                message: 'Name is required.'
            }
        } else {
            isValid = false;
            errors.name = {
                isError: true,
                message: 'Invalid name (5 - 50 characters).'
            }
        }
        // Email.
        if (validator.validateEmail(email)) {
            errors.email = {
                isError: false,
                message: ''
            }
        } else if (email.trim() === '') {
            isValid = false;
            errors.email = {
                isError: true,
                message: 'Email is required.'
            }
        } else {
            isValid = false;
            errors.email = {
                isError: true,
                message: 'Invalid email. (Example: abcd@gmail.com)'
            }
        }
        // Phone number.
        if (phoneNumber.length > 0) {
            errors.phoneNumber = {
                isError: false,
                message: ''
            }
        } else {
            isValid = false;
            errors.phoneNumber = {
                isError: true,
                message: 'Phone number is required.'
            }
        }
        // Username.
        if (validator.validateUsername(username)) {
            errors.username = {
                isError: false,
                message: ''
            }
        } else if (username.trim() === '') {
            isValid = false;
            errors.username = {
                isError: true,
                message: 'Username is required.'
            }
        } else {
            isValid = false;
            errors.username = {
                isError: true,
                message: 'Invalid username (5 - 20 characters).'
            }
        }
        // Password.
        if (validator.validatePassword(password)) {
            errors.password = {
                isError: false,
                message: ''
            }
        } else if (password.trim() === '') {
            isValid = false;
            errors.password = {
                isError: true,
                message: 'Password is required.'
            }
        } else {
            isValid = false;
            errors.password = {
                isError: true,
                message: 'Password includes at least one letter and one number (8 - 20 characters).'
            }
        }

        // Set Errors.
        dispatch(actChangeErrorsOnAddStaff(errors));

        // Insert if not error.
        if (isValid === true) {
            const newStaff = {
                age,
                email,
                name,
                password,
                phoneNumber,
                role: (role === 0) ? 'STAFF' : 'BARTENDER',
                sex: (sex === 0) ? true : false,
                status: 'ACTIVE',
                username,
                weight
            }
            dispatch(actCreateStaff(newStaff));
        }
    }

    return (
        <div className={classes.root}>
            <Button
                variant='contained'
                size='large'
                className='btn-cancel-create-staff'
                onClick={onCloseModal}
            >
                Cancel
            </Button>
            <Button
                variant='contained'
                size='large'
                className='btn-create-staff'
                color='primary'
                onClick={handleCreate}
            >
                Create
            </Button>
            <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleCloseSnackBar}>
                <Alert onClose={handleCloseSnackBar} severity='error'>
                    {messageSnackBar}
                </Alert>
            </Snackbar>
        </div>
    )
}
