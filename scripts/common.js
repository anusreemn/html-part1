const notFoundPage = 'pageNotFound.html';

function getPageUrl(menuObj) {
    return menuObj.not_found ? notFoundPage : (menuObj.href || '#');
}

function setCurrentClickedMenu(menuObj) {
    if (location.pathname.indexOf(menuObj.href) !== -1) {

        // dynamically set h2 title of every page
        document.querySelector('h2').innerHTML = menuObj.title;

        if (menuObj.not_found) {
            location.href = notFoundPage;
        }
    }
}

function loadMenu() {
    getJson('apis/menu.json', function(response) {
        if (response) {
            const menus = response.data;
            if (menus && menus.length) {
                const parent = document.querySelector('#menuContainer'),
                    menuLength = menus.length,
                    navEl = parent.appendChild(document.createElement('nav')),
                    ulEl = navEl.appendChild(document.createElement('ul'));
                
                for(let idx = 0; idx < menuLength; idx++) {
                    const aElement = document.createElement('a');
                    aElement.setAttribute('href', getPageUrl(menus[idx])); // set href
                    aElement.innerHTML = menus[idx].title; // place text

                    // Assign menu object to global variable in window context, if it is the one that is loaded in view
                    setCurrentClickedMenu(menus[idx]);

                    // insert a tag into an li, and li into the ul
                    ulEl.appendChild(document.createElement('li').appendChild(aElement));

                }
            }
        }
    });

}

function getJson(url, callbackFunction) {
    // below handling can be done in one's own way
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function(event) {
        if (xhr.status !== 200) {
            alert('Oops! Something went wrong.');
            callbackFunction(false);
        } else {
            callbackFunction(JSON.parse(xhr.response));
        }
    });

    xhr.addEventListener('error', function(event) {
        alert('Oops! Something went wrong.');
    });

    xhr.open('GET', url, true);
    xhr.send();
}

function setUserProfileData() {
    const userData = isSignedIn();
    if (userData) {
        const profileSection = document.querySelector('#profileHolder');
        const userNameEl = profileSection.appendChild(document.createElement('em'));
        userNameEl.innerHTML = `${userData.firstName} ${userData.lastName}`;

        const logoutLink = profileSection.appendChild(document.createElement('a'));
        logoutLink.setAttribute('href', '/' + getBaseUrl())
        logoutLink.innerHTML = 'Logout'
    }
}
