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
                display: 'flex',
                width: '50%',
                alignItems: 'center',
                justifyContent: 'space-between',
                '& .control-table': {
                    '& .date-picker': {
                        cursor: 'pointer',
                        '& label': {
                            cursor: 'pointer',
                        },
                        '& input': {
                            cursor: 'pointer',
                        }
                    },
                    '& .select-shift, .start-time, .finish-time, .slot': {
                        marginLeft: theme.spacing(1),
                        width: '100px',
                    }
                },
                '& .add-staff': {

                }
            }
        }
    },
    searchButton: {
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