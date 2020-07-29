import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { styles } from './styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { timeToNumber } from '../../../../../../utils/utils';
import { actCreateShifts, actChangeOpenControlAdd, actOpenSnackBarOnAddShift, actChangeErrorMessageOnAddShift } from '../../../../../../actions';
import { Chip } from '@material-ui/core';

const useStyles = makeStyles(styles);

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function AddShiftFooter(props) {
    const classes = useStyles();
    const openSnackBar = useSelector(state => state.addShifts.openSnackBar);
    const errorMessage = useSelector(state => state.addShifts.errorMessage);
    const newShifts = useSelector(state => state.addShifts.shifts);
    const selectedShift = useSelector(state => state.dateAndShifts.selectedShift);
    const selectedDateOnManangeShift = useSelector(state => state.dateAndShifts.selectedDate);
    const selectedDateOnCreateShift = useSelector(state => state.addShifts.selectedDate);
    const value = useSelector(state => state.controlAdd.value);
    const dispatch = useDispatch();

    const onCloseModal = () => {
        dispatch(actChangeOpenControlAdd(false));
    }

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(actOpenSnackBarOnAddShift(false));
    };

    const handleCreate = () => {
        let isValid = true;
        for (let i = 0; i < newShifts.length; i++) {
            if (newShifts[i].start === '00:00:00' && newShifts[i].finish === '00:00:00') {
                isValid = false;
                // Error is time default.
                // Set an error.
                dispatch(actChangeErrorMessageOnAddShift(`Please choose finish time for Shift ${(i + 1)}`));
                dispatch(actOpenSnackBarOnAddShift(true));
                return;
            } else if (timeToNumber(newShifts[i].start) > timeToNumber(newShifts[i].finish)) {
                isValid = false;
                // Error is start time smaller than finish time.
                // Set an error.
                dispatch(actChangeErrorMessageOnAddShift(`Start time must smaller than finish time at Shift ${(i + 1)}`));
                dispatch(actOpenSnackBarOnAddShift(true));
                return;
            }
        }
        // Create shifts if not error.
        if (isValid === true) {
            dispatch(actCreateShifts(newShifts, selectedDateOnManangeShift, selectedDateOnCreateShift));
        }
    }

    return (
        <div className={classes.root}>
            <Button
                variant='contained'
                size='large'
                className='btn-cancel-add-shift'
                onClick={onCloseModal}
            >
                Cancel
            </Button>
            {
                (value === 0) ?
                    <Button
                        variant='contained'
                        size='large'
                        className='btn-create-add-shift'
                        color='primary'
                        onClick={handleCreate}
                    >
                        Create
                    </Button> :
                    ''
            }
            {
                (value === 1 && selectedShift !== -1)
                    ? <Chip
                        label={`${selectedShift.slot}` + (selectedShift.slot === 1 ? ' Slot' : ' Slots')}
                        color='primary'
                        className='slot'
                    />
                    : ''
            }
            <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleCloseSnackBar}>
                <Alert onClose={handleCloseSnackBar} severity='error'>
                    {errorMessage}
                </Alert>
            </Snackbar>
        </div>
    )
}
