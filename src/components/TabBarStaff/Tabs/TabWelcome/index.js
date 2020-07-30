import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import StaffAndShiftTable from './StaffAndShiftTable';
import { makeStyles } from '@material-ui/core/styles';
import { styles } from './styles';
import clsx from 'clsx';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { DatePicker } from '@material-ui/pickers';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { actSelectDateOnWelcome, actGetShiftsOnWelcome, actSelectShiftOnWelcome } from '../../../../actions';

const useStyle = makeStyles(styles);

export default function TabManageShift(props) {
    const classes = useStyle();
    const selectedDate = useSelector(state => state.welcome.selectedDate);
    const shiftsOnDate = useSelector(state => state.welcome.shiftsOnDate);
    const selectedShift = useSelector(state => state.welcome.selectedShift);
    const dispatch = useDispatch();

    const handleDateChange = (selectedDate) => {
        dispatch(actSelectDateOnWelcome(selectedDate));
    };

    const handleShiftChange = (event) => {
        let target = event.target;
        let value = target.value;
        dispatch(actSelectShiftOnWelcome(value));
    };

    useEffect(() => {
        dispatch(actGetShiftsOnWelcome(selectedDate));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const elementShiftMenuItem = shiftsOnDate.length > 0
        ? shiftsOnDate.map((shift, index) => <MenuItem key={index} value={shift}>Shift {index + 1}</MenuItem>)
        : <MenuItem value={-1}>None</MenuItem>;

    return (
        <Container component='div' maxWidth={false} className={classes.root}>
            <Box component='div' className='control'>
                <Box component='div' className='manage-control'>
                    <Box component='div' className='control-table'>
                        <DatePicker
                            format='dd/MM/yyyy'
                            label='Date'
                            views={['year', 'month', 'date']}
                            value={selectedDate}
                            onChange={selectedDate => handleDateChange(selectedDate)}
                            className={clsx('date-picker', classes.ml1)}
                        />
                        <FormControl className='select-shift'>
                            <InputLabel>Shift</InputLabel>
                            <Select
                                value={selectedShift}
                                onChange={handleShiftChange}
                            >
                                {elementShiftMenuItem}
                            </Select>
                        </FormControl>
                        <TextField
                            disabled
                            label='Start Time'
                            value={selectedShift === -1 ? '00:00' : selectedShift.start.substring(0, 5)}
                            className='start-time'
                        />
                        <TextField
                            disabled
                            label='Finish Time'
                            value={selectedShift === -1 ? '24:00' : selectedShift.finish.substring(0, 5)}
                            className='finish-time'
                        />
                    </Box>
                </Box>
            </Box>
            <StaffAndShiftTable />
        </Container>
    );
}