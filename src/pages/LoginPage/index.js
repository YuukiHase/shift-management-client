import React from 'react';
import PropTypes from 'prop-types';
import auth from 'auth';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';
import avatar from 'assets/images/staff.png';
import backgroundOne from 'assets/images/bg-01.png';
import backgroundTwo from 'assets/images/bg-02.png';
import { connect } from 'react-redux';
import { actLogin, actLoginSuccess } from 'actions';
import { CircularProgress, Button } from '@material-ui/core';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    onChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
    };

    onChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    };

    login = () => {
        const { username, password } = this.state;
        this.props.onLogin(username, password);
    };

    onKeyDownEnter = (event) => {
        if (event.keyCode === 13) {
            this.login();
        }
    };

    onKeyDownOther = (event) => {
    };

    componentDidMount() {
        if (auth.isAuthenticated === true) {
            this.props.onLoginSuccess();
        }
    };

    render() {
        const { classes, redirectToReferrer, error, loadingLogin } = this.props;

        if (redirectToReferrer === true) {
            return <Redirect to='/' />
        }

        return (
            <div className={classes.container}>
                <div className='login'>
                    <img src={avatar} alt='Avatar' className='avatar' />
                    <h2>Log In</h2>
                    <form>
                        <p>Email address</p>
                        <input type='text' name='username' placeholder='Enter Email' onChange={this.onChangeUsername} onKeyDown={(loadingLogin === false) ? this.onKeyDownEnter : this.onKeyDownOther} />
                        <p>Password</p>
                        <input type='password' name='password' placeholder='••••••••' autoComplete='on' onChange={this.onChangePassword} onKeyDown={(loadingLogin === false) ? this.onKeyDownEnter : this.onKeyDownOther} />
                        {
                            (error === true) ? <p style={{ color: 'red', marginBottom: '20px' }}>*Invalid username or password!!!</p> : ''
                        }
                        {
                            (loadingLogin === false) ?
                                <Button className='btn-submit' onClick={this.login}>Sign In</Button> :
                                <Button className='btn-submit' disabled><CircularProgress className='cuicular-progress' size={23} /></Button>
                        }
                    </form>
                </div>
                <img className='background-01' src={backgroundOne} alt='backgroun-1'></img>
                <img className='background-02' src={backgroundTwo} alt='backgroun-2'></img>
            </div>
        );
    }
}

LoginPage.propTypes = {
    classes: PropTypes.object,
    error: PropTypes.bool,
    redirectToReferrer: PropTypes.bool,
    loadingLogin: PropTypes.bool,
    onLogin: PropTypes.func,
    onLoginSuccess: PropTypes.func
}

export default connect(
    state => ({
        redirectToReferrer: state.login.redirectToReferrer,
        error: state.login.error,
        loadingLogin: state.loading.loadingLogin
    }),
    dispatch => ({
        onLogin: (username, password) => {
            dispatch(actLogin(username, password));
        },
        onLoginSuccess: () => {
            dispatch(actLoginSuccess());
        }
    })
)(withStyles(styles)(LoginPage));