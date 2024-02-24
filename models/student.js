const { text } = require('express');
const { number } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    name: String,
    batchno: Number,
    username: Number,
    password: { type: String, default: 'welcome' },
    department: String,
    address: String,
    dob: Date,
    gender: String,
    admissionNumber: Number,
    mobileNumber: Number,
    attendance: Number,
    eventName: String,
    eventDate: Date,
    subject1: String,
    mark1: Number,
    subject2: String,
    mark2: Number,
    subject3: String,
    mark3: Number,
    subject4: String,
    mark4: Number,
    subject5: String,
    mark5: Number,
    subject6: String,
    mark6: Number
});

module.exports = mongoose.model('Student', StudentSchema);