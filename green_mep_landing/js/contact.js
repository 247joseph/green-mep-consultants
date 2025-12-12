const scriptURL = 'YOUR_WEB_APP_URL_HERE'; // User needs to replace this
const form = document.querySelector('form');
const statusMsg = document.getElementById('form-status');

form.addEventListener('submit', e => {
    e.preventDefault();
    statusMsg.innerHTML = "Sending...";
    
    // Basic frontend validation if needed
    
    fetch(scriptURL, {
        method: 'POST',
        body: new FormData(form)
    })
    .then(response => {
        statusMsg.innerHTML = "Message sent successfully!";
        statusMsg.className = "success";
        form.reset();
        setTimeout(() => {
            statusMsg.innerHTML = "";
            statusMsg.className = "";
        }, 5000);
    })
    .catch(error => {
        statusMsg.innerHTML = "Error sending message. Please try again.";
        statusMsg.className = "error";
        console.error('Error!', error.message);
    });
});
