const mongoose = require('mongoose');

const employerSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true
  },
  website: {
    type: String,
    required: true
  },
  positionTitle: {
    type: String,
    required: true
  },
  vacancies: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  criteria: String,
  keySkills: {
    type: String // Assuming you want to store skills as a single string
  },
  jobDescription: String,
  specificQuestions: String,
  timeFrame: String,
  premiumPlan: {
    type: String,
    enum: ['basic', 'standard', 'premium'],
    default: 'basic'
  }
});

const Employer = mongoose.model('Employer', employerSchema);

module.exports = Employer;
