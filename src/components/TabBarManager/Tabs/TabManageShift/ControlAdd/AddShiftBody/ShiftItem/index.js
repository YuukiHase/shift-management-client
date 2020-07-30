import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { styles } from './styles';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { TimePicker } from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Slider from '@material-ui/core/Slider';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import {
    actChangeBonusRateOnAddShift,
    actChangeSlotOnAddShift,
    actChangeStartTimeOnAddShift,
    actChangeFinishTimeOnAddShift
} from '../../../../../../../actions';
import { bonusRates } from '../../../../../../../constants/BonusRate';

ShiftItem.propTypes = {
    index: PropTypes.number
}

const useStyles = makeStyles(styles);

export default function ShiftItem(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const start = useSelector(state => state.addShifts.shifts[props.index].start);
    const finish = useSelector(state => state.addShifts.shifts[props.index].finish);
    const [startTime, setStartTime] = useState(new Date(`Thu Mar 12 1998 ${start} GMT+0700`));
    const [finishTime, setFinishTime] = useState(new Date(`Thu Mar 12 1998 ${finish} GMT+0700`));
    const slot = useSelector(state => state.addShifts.shifts[props.index].slot);
    const bonusRate = useSelector(state => state.addShifts.shifts[props.index].bonusRate);
    const dispatch = useDispatch();

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleBonusRateChange = (event) => {
        dispatch(actChangeBonusRateOnAddShift(event.target.value, props.index));
    };

    const handleSlotChange = (event, newValue) => {
        dispatch(actChangeSlotOnAddShift(newValue, props.index));
    };

    const onChangeStartTime = (time) => {
        setStartTime(time);
        dispatch(actChangeStartTimeOnAddShift(time, props.index));
    };

    const onChangeFinishTime = (time) => {
        setFinishTime(time);
        dispatch(actChangeFinishTimeOnAddShift(time, props.index));
    };

    useEffect(() => {
        setStartTime(new Date(`Thu Mar 12 1998 ${start} GMT+0700`));
    }, [start]);

    useEffect(() => {
        setFinishTime(new Date(`Thu Mar 12 1998 ${finish} GMT+0700`));
    }, [finish]);

    return (
        <Card className={classes.root}>
            <CardHeader
                className={clsx(classes.cardHeader, {
                    [classes.cardHeaderOpen]: expanded,
                })}
                action={
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label='show more'
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                }
                title={`Shift ${(props.index + 1)}`}
            />
            <Collapse in={expanded} timeout='auto' unmountOnExit>
                <CardContent>
                    <TimePicker
                        ampm={false}
                        label='Start Time'
                        value={startTime}
                        onChange={onChangeStartTime}
                        className='time-picker'
                        inputVariant='filled'
                    />
                    <TimePicker
                        ampm={false}
                        label='Finish Time'
                        value={finishTime}
                        onChange={onChangeFinishTime}
                        className={clsx('time-picker', classes.mt2s)}
                        inputVariant='filled'
                    />
                    <TextField
                        id='select-bonus-rate'
                        select
                        label='Select Bonus Rate'
                        value={bonusRate}
                        onChange={handleBonusRateChange}
                        variant='filled'
                        className={clsx('bonus-rate', classes.mt2s)}
                    >
                        {bonusRates.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Box component='div' className={clsx('slot', classes.mt2s)}>
                        <InputLabel
                            variant='filled'
                        >
                            Slot:
                        </InputLabel>
                        <Slider
                            aria-label='slot slider'
                            value={slot}
                            valueLabelDisplay='on'
                            className='slot-slider'
                            onChange={handleSlotChange}
                        />
                    </Box>
                </CardContent>
            </Collapse>
        </Card>
    )
}
