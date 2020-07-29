import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { styles } from './styles';
import TabContainer from '../TabContainer';
import TabManageShift from './Tabs/TabManageShift';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import auth from '../../auth';
import { Link } from 'react-router-dom';
import TabManageStaff from './Tabs/TabManageStaff';
import { actLogout } from '../../actions';
import { connect } from 'react-redux';
import { Modal, CircularProgress } from '@material-ui/core';

class TabBarManager extends React.Component {
    state = {
        value: 0,
    };

    logout = () => {
        auth.signout(this.props.onLogout());
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes, loadingModal } = this.props;
        const { value } = this.state;

        return (
            <Container component='div' disableGutters={true} maxWidth={false} className={classes.root}>
                <AppBar position='static' className='app-bar'>
                    <Box component='div' className='tab-control'>
                        <Tabs
                            value={value}
                            onChange={this.handleChange}
                            variant='scrollable'
                        >
                            <Tab label='Manage Shift' />
                            <Tab label='Manage Staff' />
                        </Tabs>
                        <Link to='/login'>
                            <IconButton aria-label='Logout' className='logout' onClick={this.logout}>
                                <ExitToAppIcon />
                            </IconButton>
                        </Link>
                    </Box>
                </AppBar>
                {
                    value === 0 &&
                    <TabContainer>
                        <TabManageShift />
                    </TabContainer>
                }
                {
                    value === 1 &&
                    <TabContainer>
                        <TabManageStaff />
                    </TabContainer>
                }
                <Modal
                    open={loadingModal}
                    className={classes.loadingModal}
                >
                    <CircularProgress />
                </Modal>
            </Container>
        );
    }
}

TabBarManager.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default connect(
    state => ({
        loadingModal: state.loading.loadingModal
    }),
    dispatch => ({
        onLogout: () => {
            dispatch(actLogout());
        }
    })
)(withStyles(styles)(TabBarManager));