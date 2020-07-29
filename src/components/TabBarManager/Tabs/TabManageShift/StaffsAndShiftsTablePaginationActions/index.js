import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { styles } from './styles';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePaginationActions from '../../../../TablePaginationActions';
import Typography from '@material-ui/core/Typography';
import * as actions from '../../../../../actions';
import * as callAPI from '../../../../../utils/callAPI';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import { formatCurrency } from '../../../../../utils/utils';
import { DOMAIN } from '../../../../../constants/DomainAPI';

const useStyles = makeStyles(styles);

export default function StaffsAndShiftsTablePaginationActions(props) {
    const classes = useStyles();
    let rows = useSelector(state => state.staffsOnShift);
    const keyword = useSelector(state => state.searchStaffOnShift.keyword);
    const selectedShift = useSelector(state => state.dateAndShifts.selectedShift);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const dispatch = useDispatch();

    const handleChangePage = (event, page) => {
        setPage(page);
    };

    const handleChangeRowsPerPage = event => {
        setPage(0);
        setRowsPerPage(event.target.value);
    };

    const takeAttendance = (staffOnShift) => {
        if (staffOnShift.userShift.status === 'PRESENT') {
            // Do nothing.
            console.log('This user already PRESENT.');
        } else {
            dispatch(actions.actTakeAttendance(staffOnShift, selectedShift));
        }
    }

    useEffect(() => {
        // -1 mean that there are no shift on date.
        if (selectedShift !== -1) {
            // Turn on loading modal.
            dispatch(actions.actLoadingModal(true));
            callAPI.GET(`${DOMAIN}api/shift-request/list-user-shift?shiftId=${selectedShift.id}`)
                .then(res => {
                    if (res.error === false) {
                        // Load list staffs on shift to redux.
                        dispatch(actions.actLoadListStaffsOnShift(res.data));
                        // Turn off loading modal.
                        dispatch(actions.actLoadingModal(false));
                    } else {
                        // Get message if error.
                        console.log(res.data);
                        // Turn off loading modal.
                        dispatch(actions.actLoadingModal(false));
                    }
                })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedShift.id]);

    // Search if have keyword.
    if (keyword) {
        rows = rows.filter((row) => {
            return row.user.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
        });
    }

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
        <Paper className={classes.root}>
            <div className={classes.tableWrapper}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align='right'>Wages</TableCell>
                            <TableCell>Attendance</TableCell>
                            <TableCell>Check</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * +rowsPerPage, page * +rowsPerPage + +rowsPerPage).map((row, index) => (
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
                                <TableCell>
                                    <Button
                                        variant='contained'
                                        color='primary'
                                        size='small'
                                        className={classes.button}
                                        startIcon={<CheckIcon />}
                                        onClick={() => takeAttendance(row)}
                                    >
                                        Check
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 48 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                colSpan={3}
                                count={rows.length}
                                rowsPerPage={+rowsPerPage}
                                page={page}
                                SelectProps={{
                                    native: true,
                                }}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </Paper >
    );
}

StaffsAndShiftsTablePaginationActions.propTypes = {
    keyword: PropTypes.string,
    staffs: PropTypes.array,
    onLoadListAllStaff: PropTypes.func
};