export const styles = theme => ({
    container: {
        fontFamily: 'Roboto',
        letterSpacing: '1px',
        '& .login': {
            border: '1px solid ' + theme.palette.primary.main,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '360px',
            height: '400px',
            padding: '80px 40px',
            boxSizing: 'border-box',
            background: 'rgba(0, 0, 0, .8)',
            '&:before': {
                content: '""',
                position: 'absolute',
                top: '0',
                left: '0',
                width: '50%',
                height: '100%',
                background: 'rgba(255, 255, 255, .1)',
                pointerEvents: 'none',
            },
            '& .avatar': {
                width: '100px',
                height: '100px',
                position: 'absolute',
                top: 'calc(-100px/2)',
                left: 'calc(50% - 50px)',
            },
            '& h2': {
                margin: '0',
                padding: '0 0 20px',
                color: theme.palette.primary.main,
                textAlign: 'center',
            },
            '& p': {
                margin: '0',
                padding: '0',
                fontWeight: 'bold',
                color: theme.palette.primary.contrastText,
            },
            '& input, & .btn-submit': {
                width: '100%',
                marginBottom: '20px',
            },
            '& input[type="text"], & input[type="password"]': {
                border: 'none',
                borderBottom: '1px solid ' + theme.palette.primary.contrastText,
                background: 'transparent',
                outline: 'none',
                color: theme.palette.primary.contrastText,
                fontSize: '16px',
                height: '40px',
            },
            '& .btn-submit': {
                color: theme.palette.primary.contrastText,
                background: theme.palette.primary.main,
                '&:hover': {
                    background: theme.palette.primary.light,
                    color: theme.palette.primary.contrastText,
                },
                '& .cuicular-progress': {
                    color: theme.palette.primary.contrastText
                }
            }
        },
        '& .background-01': {
            zIndex: '-1',
            position: 'absolute',
            width: '50%',
            height: '60vh',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
        },
        '& .background-02': {
            zIndex: '-1',
            position: 'absolute',
            width: '50%',
            height: '60vh',
            bottom: '0',
            right: '0',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
        }
    },
})