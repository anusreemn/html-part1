
function isSignedIn() { // redirect to signup if not already logged in
    let userData = localStorage.getItem('userInfo');
    if (!userData) {
        location.href = '/';
    } else {
        userData = JSON.parse(userData);
        return userData;
    }
}

if (location.pathname === '/' || location.pathname.includes('index.html')) {
    if (isSignedIn()) {
        location.href = 'home.html'
    }
} else if (location.pathname.includes('register') || location.pathname.includes('login')) {
    // do nothing
} else {
    // for any other inner pages, trigger the below
    loadMenu();

    // set profile data in every page
    setUserProfileData();

}


