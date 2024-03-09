document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('employerRegistrationForm');
  

  const companyName = document.getElementById('companyName');
  const website = document.getElementById('website');
  const positionTitle = document.getElementById('positionTitle');
  const vacancies = document.getElementById('vacancies');
  const location = document.getElementById('location');
  const criteria = document.getElementById('criteria');
  const keySkills = document.getElementById('keySkills');
  const jobDescription = document.getElementById('jobDescription');
  const specificQuestions = document.getElementById('specificQuestions');
  const timeFrame = document.getElementById('timeFrame');
  const premiumPlan = document.getElementById('premiumPlan');
  form.addEventListener('submit', function(event) {
      event.preventDefault();

      // Get the values inside the event listener when the form is submitted
      
      // FormData will capture the inputs from the form for submission
      var formData = new FormData();
      console.log(companyName.value,website.value);
      // Append additional data to the formData
      formData.append("companyName", companyName.value);
      formData.append("website", website.value);
      formData.append("positionTitle", positionTitle.value);
      formData.append("vacancies", vacancies.value);
      formData.append("location", location.value);
      formData.append("criteria", criteria.value);
      formData.append("keySkills", keySkills.value);
      formData.append("jobDescription", jobDescription.value);
      formData.append("specificQuestions", specificQuestions.value);
      formData.append("timeFrame", timeFrame.value);
      formData.append("premiumPlan", premiumPlan.value);

      

      fetch('http://localhost:3000/api/employer-registrations', {
          method: 'POST',
          body: formData
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
          alert('Successfully Posted a job')
      })
      .catch(error => {
          console.error('Error:', error);
          alert('There was a problem with the form submission: ' + error.message);
      });
  });
});

