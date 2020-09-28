document.addEventListener("DOMContentLoaded", function() {

    const submitBtn = document.querySelector('#registerButton');
    submitBtn.addEventListener('click', function() {
        
        // on successful form validations, 
        // show success popup and store registered details to match in login

        document.querySelector('#successPopup').style.display = "block";
    })

});
