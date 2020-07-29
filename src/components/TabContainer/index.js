import React from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

TabContainer.propTypes = {
    style: PropTypes.object
}

export default function TabContainer(props) {
    return (
        <Typography component='div' style={props.style} className={props.className}>
            {props.children}
        </Typography>
    );
}