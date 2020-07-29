export const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        '& .app-bar': {
            color: theme.palette.primary.contrastText,
            backgroundColor: theme.palette.primary.dark,
        },
        '& .logout': {
            marginRight: 12,
            color: theme.palette.primary.contrastText,
            opacity: 0.7,
            '&:hover': {
                opacity: 1,
                backgroundColor: theme.palette.primary.light,
            }
        },
        '& .tab-control': {
            display: 'flex',
            justifyContent: 'space-between',
        }
    },
    loadingModal: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& .MuiCircularProgress-root': {
            outline: 'none'
        }
    }
});