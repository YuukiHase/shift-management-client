export const formatDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

export const formatTime = (date) => {
    var d = new Date(date),
        hour = '' + d.getHours(),
        minute = '' + d.getMinutes(),
        second = '00';

    if (hour.length < 2)
        hour = '0' + hour;
    if (minute.length < 2)
        minute = '0' + minute;

    return [hour, minute, second].join(':');
}

export const timeToNumber = (time) => {
    // format time '00:00:00'
    return +(time.slice(0, 2) + time.slice(3, 5));
}

/**
 * formatCurrency(number, n, x, s, c)
 * 
 * @param integer number: number
 * @param integer n: length of decimal
 * @param integer x: length of whole part
 * @param mixed   s: sections delimiter
 * @param mixed   c: decimal delimiter
 */
export const formatCurrency = (number, n, x, s, c) => {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = number.toFixed(Math.max(0, ~~n));

    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
};

// If firstDate is bigger than secondDate. Then return true.
export const compareDate = (firstDate, secondDate) => {
    let dateOne = firstDate.split("-", 3);
    let dateTwo = secondDate.split("-", 3);

    if (dateOne[0] > dateTwo[0]) {
        return true;
    } else if (dateOne[0] === dateTwo[0]) {
        if (dateOne[1] > dateTwo[1]) {
            return true;
        } else if (dateOne[1] === dateTwo[1]) {
            if (dateOne[2] > dateTwo[2]) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } else {
        return false;
    }
}