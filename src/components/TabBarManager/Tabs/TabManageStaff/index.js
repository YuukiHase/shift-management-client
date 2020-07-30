import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { styles } from './styles';
import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import SearchIcon from '@material-ui/icons/Search';
import {
    actSearchStaffOnManageStaff,
    actLoadListAllStaff,
    actChangeSearchValueOnManageStaff,
    actChangeStartDateOnStaffs,
    actChangeEndDateOnStaffs,
    actGetSalary,
    actAddStaffSuccess,
    actLoadingModal
} from '../../../../actions';
import StaffsTablePaginationActions from './StaffsTablePaginationActions';
import * as callAPI from '../../../../utils/callAPI';
import AddStaff from './AddStaff';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { DatePicker } from '@material-ui/pickers';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { compareDate, formatDate } from '../../../../utils/utils';
import { DOMAIN } from '../../../../constants/DomainAPI';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(styles);

export default function TabManageStaff(props) {
    const classes = useStyles();
    const keyword = useSelector(state => state.staffs.searchValue);
    const addStaffSuccess = useSelector(state => state.addStaff.addStaffSuccess);
    const selectedStartDate = useSelector(state => state.staffs.selectedStartDate);
    const selectedEndDate = useSelector(state => state.staffs.selectedEndDate);
    const staffs = useSelector(state => state.staffs.staffs);
    const [openAlert, setOpenAlert] = useState(false);
    const [alertTitle, setAlertTitle] = useState('Notice!');
    const [alertContent, setAlertContent] = useState('End date must be bigger than start date.');
    const [isCorrectDate, setIsCorrectDate] = useState(false);
    const dispatch = useDispatch();

    const onChange = (event) => {
        let target = event.target;
        let value = target.value;
        dispatch(actChangeSearchValueOnManageStaff(value));
    };

    const onKeyDown = (event) => {
        if (event.keyCode === 13) {
            dispatch(actSearchStaffOnManageStaff(keyword));
        }
    };

    const onSearchStaff = () => {
        dispatch(actSearchStaffOnManageStaff(keyword));
    };

    const handleStartDateChange = (selectedDate) => {
        dispatch(actChangeStartDateOnStaffs(selectedDate));
    };

    const handleEndDateChange = (selectedDate) => {
        dispatch(actChangeEndDateOnStaffs(selectedDate));
    };

    const getSalary = () => {
        if (compareDate(formatDate(selectedStartDate), formatDate(selectedEndDate)) === true) {
            setIsCorrectDate(false);
            setAlertTitle('Notice!');
            setAlertContent('End date must be bigger than start date.');
            setOpenAlert(true);
        } else {
            setIsCorrectDate(true);
            setAlertTitle('Get Salary');
            setAlertContent('Do you want to get salary?');
            setOpenAlert(true);
        }
    };

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(actAddStaffSuccess(false));
    };

    const handleCloseAlert = () => {
        setOpenAlert(false);
    };

    const handleAgreeAlert = () => {
        // Get salary.
        dispatch(actGetSalary(selectedStartDate, selectedEndDate, staffs));
        setOpenAlert(false);
    };

    useEffect(() => {
        // Turn on loading modal.
        dispatch(actLoadingModal(true));
        callAPI.GET(`${DOMAIN}api/user/list-account`)
            .then(res => {
                if (res.error === false) {
                    // Turn off loading modal.
                    dispatch(actLoadingModal(false));
                    if (res.data.length > 0) {
                        // Load data's staffs to redux.
                        dispatch(actLoadListAllStaff(res.data));
                    } else {
                        console.log('Data empty.');
                    }
                } else {
                    console.log(res.data);
                    // Turn off loading modal.
                    dispatch(actLoadingModal(false));
                }
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
                        className={clsx(classes.button, classes.ml1)}
                        startIcon={<SearchIcon />}
                        onClick={onSearchStaff}
                    >
                        Search
                    </Button>
                </Box>
                <Box component='div' className='manage-control'>
                    <Box component='div' className='manage-control-left'>
                        <DatePicker
                            format='dd/MM/yyyy'
                            label='Start Date'
                            views={['year', 'month', 'date']}
                            value={selectedStartDate}
                            onChange={selectedDate => handleStartDateChange(selectedDate)}
                            className={clsx('date-picker', classes.ml1)}
                        />
                        <DatePicker
                            format='dd/MM/yyyy'
                            label='End Date'
                            views={['year', 'month', 'date']}
                            value={selectedEndDate}
                            onChange={selectedDate => handleEndDateChange(selectedDate)}
                            className={clsx('date-picker', classes.ml1)}
                        />
                        <Button
                            variant='contained'
                            size='large'
                            color='primary'
                            className={clsx(classes.button, classes.ml1)}
                            startIcon={<CheckIcon />}
                            onClick={getSalary}
                        >
                            Get Salary
                        </Button>
                    </Box>
                    {/* Add staff here */}
                    <AddStaff />
                </Box>
            </Box>
            <StaffsTablePaginationActions />
            <Snackbar open={addStaffSuccess} autoHideDuration={5000} onClose={handleCloseSnackBar}>
                <Alert onClose={handleCloseSnackBar} severity='success'>
                    Add staff successful
                </Alert>
            </Snackbar>

            <Dialog
                open={openAlert}
                onClose={handleCloseAlert}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogTitle id='alert-dialog-title'>{alertTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-description'>
                        {alertContent}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {
                        isCorrectDate === true ?
                            <Button onClick={handleCloseAlert}>
                                Disagree
                            </Button> :
                            ''
                    }
                    <Button onClick={(isCorrectDate === true ? handleAgreeAlert : handleCloseAlert)} color='primary' autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}