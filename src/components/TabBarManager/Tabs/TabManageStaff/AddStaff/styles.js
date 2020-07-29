export const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& .add-control-icon': {
            color: theme.palette.primary.contrastText,
            backgroundColor: theme.palette.primary.dark,
            '&:hover': {
                backgroundColor: theme.palette.primary.light,
            },
        },
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Roboto',
        backgroundColor: theme.palette.background.paper,
        width: '50%',
        height: '90vh',
        borderRadius: '5px',
        border: `2px solid ${theme.palette.primary.main}`,
        '& .tab-control': {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        '& .icon-close-control-modal': {
            marginRight: 12,
            color: theme.palette.primary.contrastText,
            opacity: 0.7,
            '&:hover': {
                opacity: 1,
                backgroundColor: theme.palette.primary.light,
            }
        },
        '& .tab-container': {
            flexGrow: 1,
            overflow: 'auto',
        }
    },
});