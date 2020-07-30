import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { styles } from './styles';
import { TextField, MenuItem } from '@material-ui/core';
import { actChangeAmountShiftOnAddShift } from 'actions';
import { amountShifts } from 'constants/AmountShifts';

const useStyles = makeStyles(styles);

export default function AmountShift(props) {
    const classes = useStyles();
    const amountShift = useSelector(state => state.addShifts.amountShift);
    const dispatch = useDispatch();

    const handleChange = (event) => {
        dispatch(actChangeAmountShiftOnAddShift(event.target.value));
    };

    return (
        <div className={classes.root}>
            <TextField
                id='select-amount-shift'
                select
                label='Select Amount'
                value={amountShift}
                onChange={handleChange}
                helperText='Please select amount shift'
                variant='filled'
            >
                {
                    amountShifts.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))
                }
            </TextField>
        </div>
    )
}