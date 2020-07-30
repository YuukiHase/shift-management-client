import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { styles } from './styles';
import background from 'assets/images/undraw_page_not_found_su7k.svg'

const useStyle = makeStyles(styles);

export default function NotFoundPage() {
    const classes = useStyle();
    return (
        <img className={classes.root} src={background} alt='404 Background' />
    )
}
