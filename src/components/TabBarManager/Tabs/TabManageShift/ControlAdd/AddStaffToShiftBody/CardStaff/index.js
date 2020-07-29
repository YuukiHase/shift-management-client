import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { styles } from './styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import Box from '@material-ui/core/Box';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import avatar from '../../../../../../../static/staff.png';

CardStaff.propTypes = {
    title: PropTypes.string,
    staffs: PropTypes.array,
    handleClickOpen: PropTypes.func
}

const useStyle = makeStyles(styles);

export default function CardStaff(props) {
    const classes = useStyle();
    return (
        <Card className={clsx(classes.root, props.className)}>
            <CardHeader
                title={props.title}
            />
            <Divider />
            <CardContent className='card-content'>
                <List dense={false} className={'list-staff'}>
                    {props.staffs.map((staff) => {
                        return (
                            <Box component='div' className='list-staff-item' key={staff.username}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar
                                            alt={`Avatar n°${staff.username}`}
                                            src={avatar}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={`${staff.name}`}
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton
                                            edge='end'
                                            aria-label='add-staff-to-shift'
                                            className='add-staff-to-shift'
                                            onClick={() => props.handleClickOpen(staff)}
                                        >
                                            <AddAlertIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <Divider />
                            </Box>
                        );
                    })}
                </List>
            </CardContent>
        </Card>
    )
}
