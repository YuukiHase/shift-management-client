import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { styles } from './styles';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import * as callAPI from '../../../../../utils/callAPI';
import { formatCurrency } from '../../../../../utils/utils';
import { actLoadListStaffsOnShiftOnWelcome, actLoadingModal } from '../../../../../actions';
import { DOMAIN } from '../../../../../constants/DomainAPI';

const useStyles = makeStyles(styles);

export default function StaffAndShiftTable(props) {
    const classes = useStyles();
    let user = useSelector(state => state.login.user);
    let rows = useSelector(state => state.welcome.staffsOnShift);
    const selectedShift = useSelector(state => state.welcome.selectedShift);
    const dispatch = useDispatch();

    useEffect(() => {
        // -1 mean that there are no shift on date.
        if (selectedShift !== -1) {
            // Turn on loading modal.
            dispatch(actLoadingModal(true));
            callAPI.GET(`${DOMAIN}api/shift-request/list-user-shift?shiftId=${selectedShift.id}`)
                .then(res => {
                    if (res.error === false) {
                        // Turn off loading modal.
                        dispatch(actLoadingModal(false));
                        // Load list staffs on shift to redux.
                        dispatch(actLoadListStaffsOnShiftOnWelcome(res.data));
                    } else {
                        // Get message if error.
                        console.log(res.data);
                        // Turn off loading modal.
                        dispatch(actLoadingModal(false));
                    }
                })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedShift.id]);

    rows = rows.filter((row) => {
        return row.user.username === user.username;
    });

    return (
        <Paper className={classes.root}>
            <div className={classes.tableWrapper}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align='right'>Wages</TableCell>
                            <TableCell>Attendance</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            rows.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        {row.user.name}
                                    </TableCell>
                                    <TableCell align='right'>{formatCurrency(row.userShift.wages, 0, 3, ',')}</TableCell>
                                    <TableCell>
                                        {
                                            row.userShift.status === 'PRESENT'
                                                ? <Typography className={classes.present}>Present</Typography>
                                                : <Typography className={classes.absent}>Absent</Typography>
                                        }
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>
        </Paper >
    );
}

StaffAndShiftTable.propTypes = {
    keyword: PropTypes.string,
    staffs: PropTypes.array,
    onLoadListAllStaff: PropTypes.func
};