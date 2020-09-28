document.addEventListener("DOMContentLoaded", function() {

    const submitBtn = document.querySelector('#loginButton');
    submitBtn.addEventListener('click', function() {
        
        // store registered name to match in login, after form validations
        
        localStorage.setItem('userInfo', JSON.stringify({
            firstName: 'Anusree',
            lastName: 'M Nambiar'
        }))
        
        location.href = 'home.html'
    })

});
