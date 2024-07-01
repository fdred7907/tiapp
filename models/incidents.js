// const incidents = [{
//     ti:"Ankit Raj Goyal",
//     place:"Hyderabad",
//     date:"13th June 2024",
//     description:"We hade gathered for a peaceful protest at gachibowli with four other tis when the police preventively detained us for 7 hours and I missed my pre booked return flight.",
//     action:"Send a letter to concerned PS via email and followed it up with RTI request.",
//     pictures:"",
//     videos:"",
//     audio:"",
//     documents:"",
//     links:"",
// },
// {
//     ti:"Reena",
//     place:"Kerala",
//     date:"19th June 2024",
//     description:"She made a media reachout and informed public about TI event. The channel backtracked and planted a doctor to lecy mental health accusations on her and all TIs.",
//     action:"Comments and phone calls to the channel and reach out to other media and people .",
//     pictures:"",
//     videos:"",
//     audio:"",
//     documents:"",
//     links:"",   
// }];

const mongoose = require('mongoose');
const incidentSchema = new mongoose.Schema({

    ti: String,
    place: String,
    date: Date,
    description: String,
    action: String,
    pictures: String,
    videos: String,
    audio: String,
    documents: String,
    links: String       
});

const Incident = mongoose.model('Incident', incidentSchema);

module.exports = Incident;
