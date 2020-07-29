export const styles = theme => ({
    root: {
        paddingTop: '24px',
        paddingBottom: '24px',
        '& .control': {
            display: 'flex',
            '& .search-control': {
                display: 'flex',
                width: '50%',
            },
            '& .manage-control': {
                width: '50%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'stretch',
                '& .manage-control-left': {
                    display: 'flex',
                    '& .date-picker': {
                        cursor: 'pointer',
                        '& label': {
                            cursor: 'pointer',
                        },
                        '& input': {
                            cursor: 'pointer',
                        }
                    },
                }
            }
        }
    },
    button: {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.dark,
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
        }
    },
    ml1: {
        marginLeft: theme.spacing(1),
    },
    '@media (max-width: 1388px)': {
        root: {
            '& .control': {
                flexDirection: 'column',
                '& .search-control': {
                    width: '100%',
                },
                '& .manage-control': {
                    width: '100%',
                    marginTop: theme.spacing(2),
                }
            }
        }
    }
});