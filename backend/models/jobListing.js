const mongoose = require('mongoose');

const jobListingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  // Add additional fields that you need for your job listings
  description: String,
  requirements: [String], // This is an array of strings to hold multiple requirements
  postedDate: {
    type: Date,
    default: Date.now
  },
  // ... any other fields you want to include, like company details, salary, etc.
});

const JobListing = mongoose.model('JobListing', jobListingSchema);

module.exports = JobListing;


