document.getElementById('jobApplicationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const resumeUpload = document.getElementById('resumeUpload');
    if(resumeUpload.files.length > 0) {
        const fileName = resumeUpload.files[0].name;
        alert(`Resume Uploaded: ${fileName}`);
        // Here you would handle the form submission to your backend
        this.reset();
    } else {
        alert('Please upload a resume to proceed.');
    }
});
