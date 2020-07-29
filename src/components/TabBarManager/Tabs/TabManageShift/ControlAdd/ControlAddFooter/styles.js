export const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'row-reverse',
        alignItems: 'center',
        padding: theme.spacing(2),
        '& .btn-create-add-shift, .slot': {
            marginRight: theme.spacing(1),
        },
        '& .btn-cancel-add-shift': {
            backgroundColor: theme.palette.error.main,
            color: theme.palette.error.contrastText,
        },
    }
});