export const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'row-reverse',
        padding: theme.spacing(2),
        '& .btn-create-staff': {
            marginRight: theme.spacing(1),
        },
        '& .btn-cancel-create-staff': {
            backgroundColor: theme.palette.error.main,
            color: theme.palette.error.contrastText,
        }
    }
});