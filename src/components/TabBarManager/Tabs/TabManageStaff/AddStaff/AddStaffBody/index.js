import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { styles } from './styles';
import { TextField, MenuItem } from '@material-ui/core';
import { ages } from '../../../../../../constants/Ages';
import { roles } from '../../../../../../constants/Roles';
import { sexs } from '../../../../../../constants/Sexs';
import { weights } from '../../../../../../constants/Weights';
import {
    actChangeNameOnAddStaff,
    actChangeEmailOnAddStaff,
    actChangeAgeOnAddStaff,
    actChangePhoneNumberOnAddStaff,
    actChangeRoleOnAddStaff,
    actChangeSexOnAddStaff,
    actChangeUsernameOnAddStaff,
    actChangePasswordOnAddStaff,
    actChangeWeightOnAddStaff
} from '../../../../../../actions';

const useStyle = makeStyles(styles);

export default function AddStaffBody(props) {
    const classes = useStyle();
    const name = useSelector(state => state.addStaff.name);
    const age = useSelector(state => state.addStaff.age);
    const email = useSelector(state => state.addStaff.email);
    const phoneNumber = useSelector(state => state.addStaff.phoneNumber);
    const role = useSelector(state => state.addStaff.role);
    const sex = useSelector(state => state.addStaff.sex);
    const username = useSelector(state => state.addStaff.username);
    const password = useSelector(state => state.addStaff.password);
    const weight = useSelector(state => state.addStaff.weight);
    const errors = useSelector(state => state.addStaff.errors);
    const dispatch = useDispatch();

    const handleChangeName = (event) => {
        dispatch(actChangeNameOnAddStaff(event.target.value));
    }

    const handleChangeAge = (event) => {
        dispatch(actChangeAgeOnAddStaff(event.target.value));
    };

    const handleChangeEmail = (event) => {
        dispatch(actChangeEmailOnAddStaff(event.target.value));
    };

    const handleChangePhoneNumber = (event) => {
        dispatch(actChangePhoneNumberOnAddStaff(event.target.value));
    };

    const handleChangeRole = (event) => {
        dispatch(actChangeRoleOnAddStaff(event.target.value));
    };

    const handleChangeSex = (event) => {
        dispatch(actChangeSexOnAddStaff(event.target.value));
    };

    const handleChangeUsername = (event) => {
        dispatch(actChangeUsernameOnAddStaff(event.target.value));
    };

    const handleChangePassword = (event) => {
        dispatch(actChangePasswordOnAddStaff(event.target.value));
    };

    const handleChangeWeight = (event) => {
        dispatch(actChangeWeightOnAddStaff(event.target.value));
    };

    return (
        <form className={classes.root}>
            <TextField
                error={errors.name.isError}
                label='Name'
                variant='filled'
                InputLabelProps={{
                    shrink: true,
                }}
                className='name'
                value={name}
                onChange={handleChangeName}
                helperText={errors.name.message}
            />
            <TextField
                id='select-age'
                select
                label='Select Age'
                value={age}
                onChange={handleChangeAge}
                variant='filled'
                className='age'
            >
                {
                    ages.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))
                }
            </TextField>
            <TextField
                error={errors.email.isError}
                label='Email'
                variant='filled'
                value={email}
                onChange={handleChangeEmail}
                InputLabelProps={{
                    shrink: true,
                }}
                className='email'
                helperText={errors.email.message}
            />
            <TextField
                error={errors.phoneNumber.isError}
                label='Phone Number'
                variant='filled'
                value={phoneNumber}
                onChange={handleChangePhoneNumber}
                InputLabelProps={{
                    shrink: true,
                }}
                type='number'
                className='phone-number'
                helperText={errors.phoneNumber.message}
            />
            <TextField
                id='select-role'
                select
                label='Select Role'
                value={role}
                onChange={handleChangeRole}
                variant='filled'
                className='role'
            >
                {
                    roles.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))
                }
            </TextField>
            <TextField
                id='select-sex'
                select
                label='Select Sex'
                value={sex}
                onChange={handleChangeSex}
                variant='filled'
                className='sex'
            >
                {
                    sexs.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))
                }
            </TextField>
            <TextField
                error={errors.username.isError}
                label='User Name'
                variant='filled'
                value={username}
                onChange={handleChangeUsername}
                InputLabelProps={{
                    shrink: true,
                }}
                autoComplete='username'
                className='username'
                helperText={errors.username.message}
            />
            <TextField
                error={errors.password.isError}
                label='Password'
                type='password'
                variant='filled'
                value={password}
                onChange={handleChangePassword}
                InputLabelProps={{
                    shrink: true,
                }}
                autoComplete='current-password'
                className='password'
                helperText={errors.password.message}
            />
            <TextField
                id='select-weight'
                select
                label='Select Weight'
                value={weight}
                onChange={handleChangeWeight}
                variant='filled'
                className='weight'
            >
                {
                    weights.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))
                }
            </TextField>
        </form>
    )
}
