// jobSeeker.js

const mongoose = require('mongoose');

const jobSeekerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  coverLetter: {type:String},
  resume: {  // This field is named 'resume', which should match the server.js code
    type: String,
    required: true
  }
  // Add any other fields you might need for a job seeker
});

const JobSeeker = mongoose.model('JobSeeker', jobSeekerSchema);

module.exports = JobSeeker;



