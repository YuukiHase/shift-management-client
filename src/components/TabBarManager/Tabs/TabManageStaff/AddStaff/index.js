import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { styles } from './styles';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddStaffBody from './AddStaffBody';
import AddStaffFooter from './AddStaffFooter';
import { actChangeOpenOnAddStaff } from 'actions';
import TabContainer from 'components/TabContainer';

const useStyles = makeStyles(styles);

export default function AddStaff(props) {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const open = useSelector(state => state.addStaff.open);
    const dispatch = useDispatch();

    const handleOpen = () => {
        dispatch(actChangeOpenOnAddStaff(true));
    }

    const handleClose = () => {
        dispatch(actChangeOpenOnAddStaff(false));
    }

    const handleChangeTab = (value) => {
        setValue(value);
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
                                    onChange={handleChangeTab}
                                    variant='scrollable'
                                >
                                    <Tab label='Add Staff' />
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
                                <AddStaffBody />
                            </TabContainer>
                        }
                        <AddStaffFooter />
                    </Container>
                </Fade>
            </Modal>
        </Box>
    )
}