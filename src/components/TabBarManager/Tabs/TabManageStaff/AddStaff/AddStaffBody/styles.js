export const styles = theme => ({
    root: {
        overflow: 'auto',
        padding: theme.spacing(2),
        '& .name, .age, .email, .phone-number, .role, .sex, .username, .password, .weight': {
            width: '100%'
        },
        '& .age, .email, .phone-number, .role, .sex, .username, .password, .weight': {
            marginTop: theme.spacing(2),
        },
    }
});