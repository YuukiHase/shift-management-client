import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { styles } from './styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as callAPI from '../../../../../../utils/callAPI';
import { actLoadListStaffToControlAdd, actAgreeAddStaffToShift, actLoadingModal } from '../../../../../../actions';
import CardStaff from './CardStaff';
import { DOMAIN } from '../../../../../../constants/DomainAPI';

const useStyles = makeStyles(styles);

export default function AddStaffToShiftBody(props) {
    const classes = useStyles();
    let staffs = useSelector(state => state.controlAdd.staffs);
    const staffsOnShift = useSelector(state => state.staffsOnShift);
    const selectedShift = useSelector(state => state.dateAndShifts.selectedShift);
    const [open, setOpen] = useState(false);
    const [selectedStaff, setSelectedStaff] = useState(-1);
    const [isFullSlotOrNoneShift, setIsFullSlotOrNoneShift] = useState(false);
    const [alertTitle, setAlertTitle] = useState('Do you want to add staff?');
    const [alertContent, setAlertContent] = useState('This staff will be add to current shift.');
    const dispatch = useDispatch();

    const handleClickOpen = (staff) => {
        if (staffsOnShift.length < selectedShift.slot) {
            setSelectedStaff(staff);
            setOpen(true);
        } else if (selectedShift === -1) {
            setAlertTitle('Notice!');
            setAlertContent('Please create shift for this date.')
            setIsFullSlotOrNoneShift(true);
            setOpen(true);
        } else {
            setAlertTitle('Notice!');
            setAlertContent('This shift is full of slot.')
            setIsFullSlotOrNoneShift(true);
            setOpen(true);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAgree = () => {
        dispatch(actAgreeAddStaffToShift(selectedStaff, selectedShift));
        setOpen(false);
    };

    useEffect(() => {
        // Turn on loading modal.
        dispatch(actLoadingModal(true));
        callAPI.GET(`${DOMAIN}api/user/list-account`)
            .then(res => {
                if (res.error === false) {
                    if (res.data.length > 0) {
                        // Load data's staffs to redux.
                        dispatch(actLoadListStaffToControlAdd(res.data));
                        // Turn off loading modal.
                        dispatch(actLoadingModal(false));
                    } else {
                        console.log('Data empty.');
                        // Turn off loading modal.
                        dispatch(actLoadingModal(false));
                    }
                } else {
                    console.log(res.data);
                    // Turn off loading modal.
                    dispatch(actLoadingModal(false));
                }
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Only get STAFF and BARTENDER.
    staffs = staffs.filter(staff => staff.role !== 'MANAGER');
    // Only get STAFF and BARTENDER that not on shift.
    staffs = staffs.filter((staff, index) => {
        let alreadyInShift = false;
        for (let i = 0; i < staffsOnShift.length; i++) {
            const element = staffsOnShift[i];
            if (element.user.username === staff.username) {
                alreadyInShift = true;
                break;
            }
        }
        return alreadyInShift === false;
    });

    const bartenders = staffs.filter(staff => staff.role === 'BARTENDER');
    staffs = staffs.filter(staff => staff.role === 'STAFF');

    return (
        <Box component='div' className={classes.root}>
            <CardStaff title='Bartender' staffs={bartenders} handleClickOpen={handleClickOpen} />
            <CardStaff title='Staff' staffs={staffs} handleClickOpen={handleClickOpen} className={classes.mt2} />

            <Dialog
                open={open}
                onClose={handleClose}
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
                        isFullSlotOrNoneShift === false ?
                            <Button onClick={handleClose}>
                                Disagree
                            </Button> :
                            ''
                    }
                    <Button onClick={(isFullSlotOrNoneShift === false ? handleAgree : handleClose)} color='primary' autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
