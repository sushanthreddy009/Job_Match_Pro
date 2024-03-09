// server.js

const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const cors = require('cors'); // Ensure you have cors installed: npm install cors
const path = require('path');
const JobSeeker = require('./models/jobSeeker'); // Ensure this path is correct
const Employer = require('./models/employer'); // Make sure this path is correct and the Employer model exists

const app = express();

// Middleware
app.use(cors()); // Enable All CORS Requests for development
app.use(express.json());
express.json()
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/jobPortal')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));

// Multer setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Make sure this path exists
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Job application submission route

app.post('/api/job-applications',upload.single('resume'), async (req, res) => {
    try {
        console.log(req.body,req.file)
        const { applicantName, applicantEmail, applicantCoverLetter } = await req.body;
        if (!req.file) {
            return res.status(400).send({ message: 'Resume file is required.' });
        }
        console.log(applicantName[0])
        const jobSeeker = new JobSeeker({
            name: applicantName[0],
            email: applicantEmail[0],
            coverLetter: applicantCoverLetter[0],
            resume: req.file.path // Store the file path in the 'resume' field
        });
        await jobSeeker.save();
        res.status(201).send({ message: 'Application submitted successfully' });
    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).send({ message: 'Internal Server Error', error: error._message });
    }
});

// Route for employers to view job applications
app.get('/api/job-applications', async (req, res) => {
    try {
        const applications = await JobSeeker.find();
        res.status(200).send(applications);
    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).send({ message: 'Internal Server Error', error: error.message });
    }
});

// Employer registration route
app.post('/api/employer-registrations', upload.none(), async (req, res) => {
    try {
        const {companyName,website,positionTitle,vacancies,location,criteria,keySkills,jobDescription,specificQuestions,timeFrame,premiumPlan} = await req.body;
        console.log(req.body);
        const employer = new Employer({
            companyName: companyName,
            website: website,
            positionTitle: positionTitle,
            vacancies: vacancies,
            location: location,
            criteria: criteria,
            keySkills: keySkills,
            jobDescription: jobDescription,
            specificQuestions: specificQuestions,
            timeFrame: timeFrame,
            premiumPlan: premiumPlan
        });
        await employer.save();
        res.status(201).send({ message: 'Employer registered successfully' });
    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).send({ message: 'Internal Server Error', error: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
