import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import StaffsAndShiftsTablePaginationActions from './StaffsAndShiftsTablePaginationActions';
import { makeStyles } from '@material-ui/core/styles';
import { styles } from './styles';
import clsx from 'clsx';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import {
    actChangeSearchValueOnShift,
    actSearchStaffOnShift,
    actSelectDate,
    actSelectShift,
    actGetShiftsOnDate,
    actAddShiftSuccess
} from 'actions';
import { DatePicker } from '@material-ui/pickers';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ControlAdd from './ControlAdd';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyle = makeStyles(styles);

export default function TabManageShift(props) {
    const classes = useStyle();
    const keyword = useSelector(state => state.searchStaffOnShift.searchValue);
    const selectedDate = useSelector(state => state.dateAndShifts.selectedDate);
    const shiftsOnDate = useSelector(state => state.dateAndShifts.shiftsOnDate);
    const selectedShift = useSelector(state => state.dateAndShifts.selectedShift);
    const addShiftsSuccess = useSelector(state => state.addShifts.addShiftsSuccess);
    const dispatch = useDispatch();

    const onChange = (event) => {
        let target = event.target;
        let value = target.value;
        dispatch(actChangeSearchValueOnShift(value));
    };

    const onKeyDown = (event) => {
        if (event.keyCode === 13) {
            dispatch(actSearchStaffOnShift(keyword));
        }
    };

    const handleDateChange = (selectedDate) => {
        // Reset search value and keyword.
        dispatch(actChangeSearchValueOnShift(''));
        dispatch(actSearchStaffOnShift(''));
        // Call action Select date on action.
        dispatch(actSelectDate(selectedDate));
    };

    const onSearchStaff = () => {
        dispatch(actSearchStaffOnShift(keyword));
    };

    const handleShiftChange = (event) => {
        // Reset search value and keyword.
        dispatch(actChangeSearchValueOnShift(''));
        dispatch(actSearchStaffOnShift(''));
        let target = event.target;
        let value = target.value;
        dispatch(actSelectShift(value));
    };

    useEffect(() => {
        dispatch(actGetShiftsOnDate(selectedDate));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(actAddShiftSuccess(false));
    };

    const elementShiftMenuItem = shiftsOnDate.length > 0
        ? shiftsOnDate.map((shift, index) => <MenuItem key={index} value={shift}>Shift {index + 1}</MenuItem>)
        : <MenuItem value={-1}>None</MenuItem>;

    return (
        <Container component='div' maxWidth={false} className={classes.root}>
            <Box component='div' className='control'>
                <Box component='div' className='search-control'>
                    <TextField
                        name='keyword'
                        type='text'
                        label='Search Name'
                        variant='outlined'
                        fullWidth={true}
                        value={keyword}
                        onChange={onChange}
                        onKeyDown={onKeyDown}
                    />
                    <Button
                        variant='contained'
                        size='large'
                        className={clsx(classes.searchButton, classes.ml1)}
                        startIcon={<SearchIcon />}
                        onClick={onSearchStaff}
                    >
                        Search
                    </Button>
                </Box>
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
                        <TextField
                            disabled
                            label='Slot'
                            value={selectedShift === -1 ? '0' : selectedShift.slot}
                            className='slot'
                        />
                    </Box>
                    {/* Add shift component here. */}
                    <ControlAdd className='add-staff' />
                </Box>
            </Box>
            <StaffsAndShiftsTablePaginationActions />
            <Snackbar open={addShiftsSuccess} autoHideDuration={5000} onClose={handleCloseSnackBar}>
                <Alert onClose={handleCloseSnackBar} severity='success'>
                    Add shift successful
                    </Alert>
            </Snackbar>
        </Container>
    );
}