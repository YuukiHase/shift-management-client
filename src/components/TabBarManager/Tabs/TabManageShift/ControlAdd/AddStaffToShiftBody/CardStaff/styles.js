export const styles = theme => ({
    root: {
        '& .card-content': {
            padding: 0,
            '& .list-staff': {
                '& .add-staff-to-shift': {
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                },
            },
        }
    }
});