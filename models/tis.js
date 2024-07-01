// const tis = [{
//     name:"Ankit Raj Goyal",
//     country:"India",
//     city:"Delhi",
//     gender:"Male",
//     symptoms:["rnm","dew","v2k","synthetic telepathy","gangstalking"],
//     activism:["protest","media reachout","political outreach","campaigning","social media"]
    
// },
// {
//     name:"Roy Eacups",
//     country:"UK",
//     city:"Bristol",
//     gender:"male"
// },
// {
//     name:"Ana Toledo",
//     country:"USA/Puerto Rico",
//     city:"Florida",
//     gender:"Female"
// },
// {
//     name:"Saroja Angadi",
//     country:"India",
//     city:"Bangalore",
//     gender:"Female"
// }];

const mongoose = require('mongoose');
const tiSchema = new mongoose.Schema({
    name:String,
    country:String,
    city:String,
    gender:String,
    symptoms:Array,
    activism:Array
});
const TI = mongoose.model('ti',tiSchema);

module.exports = TI;



