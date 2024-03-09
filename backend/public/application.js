document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('jobApplicationForm');
    const formConfirmation = document.getElementById('form-submission-confirmation');

    const applicantName = document.getElementById('applicantName').value[0];
    const applicantEmail = document.getElementById('applicantEmail').value[0];
    const applicantCoverLetter = document.getElementById('applicantCoverLetter').value[0];
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Get the values inside the event listener when the form is submitted
        console.log(applicantName)
        // FormData will capture the inputs from the form for submission
        var formData = new FormData(form);
        
        // Append additional data to the formData
        formData.append("applicantName", applicantName);
        formData.append("applicantEmail", applicantEmail);
        formData.append("applicantCoverLetter", applicantCoverLetter);

        // Log the file object to check if it's being captured correctly
        console.log(formData.get('resume'));

        fetch('http://localhost:3000/api/job-applications', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            formConfirmation.style.display = 'block';
            formConfirmation.innerHTML = "<span class='checkmark'>&#10004;</span> Application Submitted Successfully!";
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was a problem with the form submission: ' + error.message);
        });
    });
});

