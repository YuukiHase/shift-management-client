import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { styles } from './styles';
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
import { formatCurrency } from '../../../../../utils/utils';

const useStyles = makeStyles(styles);

export default function StaffsTablePaginationActions(props) {
    const classes = useStyles();
    let rows = useSelector(state => state.staffs.staffs);
    const keyword = useSelector(state => state.staffs.keyword);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, page) => {
        setPage(page);
    };

    const handleChangeRowsPerPage = event => {
        setPage(0);
        setRowsPerPage(event.target.value);
    };

    rows = rows.filter((row) => {
        return row.role !== 'MANAGER';
    });

    // Search if have keyword.
    if (keyword) {
        rows = rows.filter((row) => {
            return row.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
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
                            <TableCell>Username</TableCell>
                            <TableCell>Phone Number</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Sex</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align='right'>Weight</TableCell>
                            <TableCell>Salary</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * +rowsPerPage, page * +rowsPerPage + +rowsPerPage).map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    {row.name}
                                </TableCell>
                                <TableCell>
                                    {row.username}
                                </TableCell>
                                <TableCell>
                                    {row.phoneNumber}
                                </TableCell>
                                <TableCell>
                                    {row.email}
                                </TableCell>
                                <TableCell>
                                    {
                                        row.sex === true
                                            ? <Typography>Male</Typography>
                                            : <Typography>Female</Typography>
                                    }
                                </TableCell>
                                <TableCell>
                                    {row.role}
                                </TableCell>
                                <TableCell>
                                    {
                                        row.status === 'ACTIVE'
                                            ? <Typography className={classes.active}>ACTIVE</Typography>
                                            : <Typography className={classes.deactive}>DEACTIVE</Typography>
                                    }
                                </TableCell>
                                <TableCell align='right'>
                                    {row.weight}
                                </TableCell>
                                <TableCell>
                                    {formatCurrency(row.totalSalary, 0, 3, ',')}
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
    )
}
