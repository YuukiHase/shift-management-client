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
    active: {
        color: theme.palette.primary.main
    },
    deactive: {
        color: theme.palette.error.main
    },
});