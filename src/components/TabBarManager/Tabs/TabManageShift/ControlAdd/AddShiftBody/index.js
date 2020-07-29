import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { styles } from './styles';
import { DatePicker } from '@material-ui/pickers';
import ShiftItem from './ShiftItem';
import AmountShift from './AmountShift';
import * as actions from '../../../../../../actions';

const useStyles = makeStyles(styles);

export default function AddShiftBody(props) {
    const classes = useStyles();
    const selectedDate = useSelector(state => state.addShifts.selectedDate);
    const shifts = useSelector(state => state.addShifts.shifts)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.actChangeSelectedDateOnAddShift(new Date()));
        return () => {
            dispatch(actions.actChangeAmountShiftOnAddShift(1));
        }
    }, [dispatch]);

    const setSelectedDate = (selectedDate) => {
        dispatch(actions.actChangeSelectedDateOnAddShift(selectedDate));
    }

    return (
        <div className={classes.root}>
            <DatePicker
                format='dd/MM/yyyy'
                label='Date'
                views={['year', 'month', 'date']}
                value={selectedDate}
                onChange={selectedDate => setSelectedDate(selectedDate)}
                className='date-picker'
                inputVariant='filled'
            />
            <AmountShift />
            {
                shifts.map((shift, index) => (
                    <ShiftItem key={index} index={index} shift={shift} />
                ))
            }
        </div>
    )
}
