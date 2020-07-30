import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { styles } from './styles';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import ControlAddFooter from './ControlAddFooter';
import AddShiftBody from './AddShiftBody';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabContainer from '../../../../TabContainer';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { actChangeControlAddValue, actChangeOpenControlAdd } from '../../../../../actions';
import AddStaffToShiftBody from './AddStaffToShiftBody';

const useStyles = makeStyles(styles);

export default function ControlAdd(props) {
    const classes = useStyles();
    const value = useSelector(state => state.controlAdd.value);
    const open = useSelector(state => state.controlAdd.open);
    const dispatch = useDispatch();

    const handleOpen = () => {
        dispatch(actChangeOpenControlAdd(true));
    };

    const handleClose = () => {
        dispatch(actChangeOpenControlAdd(false));
    };

    const handleChange = (event, value) => {
        dispatch(actChangeControlAddValue(value));
    };

    return (
        <Box component='div' className={classes.root}>
            <IconButton aria-label='add-constrol' className='add-control-icon' onClick={handleOpen} >
                <AddCircleOutline />
            </IconButton>
            <Modal
                aria-labelledby='transition-modal-title'
                aria-describedby='transition-modal-description'
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
                disableBackdropClick={true}
            >
                <Fade in={open}>
                    <Container component='div' disableGutters={true} maxWidth={false} className={classes.paper}>
                        <AppBar position='static' className='app-bar'>
                            <Box component='div' className='tab-control'>
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    variant='scrollable'
                                >
                                    <Tab label='Add Shift' />
                                    <Tab label='Add Staff To Shift' />
                                </Tabs>
                                {/* Close modal here */}
                                <IconButton className='icon-close-control-modal' onClick={handleClose}>
                                    <ExitToAppIcon />
                                </IconButton>
                            </Box>
                        </AppBar>
                        {
                            value === 0 &&
                            <TabContainer className='tab-container'>
                                <AddShiftBody />
                            </TabContainer>
                        }
                        {
                            value === 1 &&
                            <TabContainer className='tab-container'>
                                <AddStaffToShiftBody />
                            </TabContainer>
                        }
                        <ControlAddFooter />
                    </Container>
                </Fade>
            </Modal>
        </Box>
    )
}