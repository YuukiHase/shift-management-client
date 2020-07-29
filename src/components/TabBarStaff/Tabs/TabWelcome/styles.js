export const styles = theme => ({
    root: {
        paddingTop: '24px',
        paddingBottom: '24px',
        '& .control': {
            display: 'flex',
            '& .manage-control': {
                display: 'flex',
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
                }
            }
        }
    },
    ml1: {
        marginLeft: theme.spacing(1),
    }
});