export const styles = theme => ({
    root: {
        overflow: 'auto',
        padding: theme.spacing(2),
        '& .date-picker': {
            cursor: 'pointer',
            width: '100%',
            marginBottom: theme.spacing(2),
            '& label': {
                cursor: 'pointer',
            },
            '& input': {
                cursor: 'pointer',
            }
        },
    }
});