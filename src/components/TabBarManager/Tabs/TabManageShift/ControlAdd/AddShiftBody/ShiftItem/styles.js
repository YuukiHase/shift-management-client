export const styles = theme => ({
    root: {
        marginTop: theme.spacing(2),
        '& .MuiCardHeader-content': {
            '& .MuiCardHeader-title': {
                fontSize: '0.875em',
            }
        },
        '& .MuiCardHeader-action': {
            marginTop: '0px',
            marginRight: '0px',
        },
        '& .time-picker': {
            width: '100%',
            '& label': {
                cursor: 'pointer',
            },
            '& input': {
                cursor: 'pointer',
            }
        },
        '& .bonus-rate': {
            width: '100%',
        },
        '& .slot': {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.09)',
            borderRadius: '4px 4px 0 0',
            '& .slot-slider': {
                alignSelf: 'center',
                width: '80%',
                marginTop: theme.spacing(6),
            }
        }
    },
    cardHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: `4px 0px 4px ${theme.spacing(1)}px`,
        transition: 'all 0.3s ease',
        backgroundColor: 'rgba(0, 0, 0, 0.09)',
    },
    cardHeaderOpen: {
        fontWeight: 'bold',
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.dark,
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.dark,
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
        }
    },
    mt2s: {
        marginTop: theme.spacing(2)
    },
});