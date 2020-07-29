export const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(2),
    },
    table: {
        minWidth: 500,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    present: {
        color: theme.palette.primary.main,
    },
    absent: {
        color: theme.palette.error.main,
    }
});