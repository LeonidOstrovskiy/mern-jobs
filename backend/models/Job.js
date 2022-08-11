const mongoose = require('mongoose');

const JobSchema = mongoose.Schema({
    function: { type: String, required: true },
    company: { type: String, required: true },
    started: { type: String },
    finished: { type: String },
    createdBy: {
        //type: mongoose.Schema.Types.ObjectId,
        //ref: 'User',
        required: true,
        type: String,
    },
    name: {
        required: true,
        type: String,
    },
}, { timestamps: true });

module.exports = mongoose.model('Job', JobSchema);