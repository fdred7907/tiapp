const moment = require('moment');
const dateParser = ((dateISO) =>{
    let date;
    if ( dateISO !== null) { 
    date = moment(dateISO).format('MMMM Do YYYY ,dddd'); 
    } else 
    { date = "" };
    return date;
});

module.exports = {dateParser}
