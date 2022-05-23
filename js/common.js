const Common = (function () {
    const apiToken = '2525910377721194';
    const apiUrl = `https://www.superheroapi.com/api.php/${apiToken}/`;
    const toastContainer = document.getElementById('toast');
    const FAVOURITES = 'favourites';
    const loader = document.querySelector('.loader');

    function setRandomBackgroundImage() {
        const urls = [
            'https://images.unsplash.com/photo-1580164631075-b3f1304f4051?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170',
            'https://images.unsplash.com/photo-1556707752-481d500a2c58?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170',
            'https://www.superherodb.com/pictures2/portraits/10/100/1496.jpg',
            'https://cdn.wallpapername.com/1680x1050/20140526/superheroes%20villains%20pixel%20art%20black%20background_www.wallpapername.com_81.jpg',
            
        ];

        const randomBackgroundImageUrl =
            urls[Math.floor(Math.random() * urls.length)];

       
        const html = document.querySelector('html');
        html.style.backgroundImage = `url(${randomBackgroundImageUrl})`;
    }

    function showLoader() {
        loader.style.display = 'block';
    }

    function hideLoader() {
        loader.style.display = 'none';
    }

    /* Notification handler */
    function showNotification(type, message) {
        if (type === 'error') {
            toastContainer.classList.remove('toast-success');
            toastContainer.classList.add('toast-error');
        } else if (type === 'success') {
            toastContainer.classList.remove('toast-error');
            toastContainer.classList.add('toast-success');
        }
        toastContainer.style.display = 'block';
        toastContainer.innerText = message;

        setTimeout(() => {
            toastContainer.style.display = 'none';
        }, 3000);
    }

    /* Send api requests */
    async function apiRequest(url) {
        try {
            const response = await fetch(url);
            const data = await response.json();

            return {
                data,
                success: true,
            };
        } catch (error) {
            console.log('error', error);
            return {
                error: error.message,
                success: false,
            };
        }
    }

    /* Add hero to localstorage */
    function addHeroToFavourites(hero) {
        if (!hero) return;

        const favouritesFromLocalStorage = getFavouriteSuperheroes();
        favouritesFromLocalStorage.push(hero);

        // Save in localstorage
        localStorage.setItem(
            FAVOURITES,
            JSON.stringify(favouritesFromLocalStorage)
        );

        showNotification('success', 'Added to favourites');
    }

    /* Remove hero from localstorage */
    function removeHeroFromFavourites(heroId) {
        if (!heroId) return;

        let favouritesFromLocalStorage = getFavouriteSuperheroes();

        // Remove hero from localstorage
        favouritesFromLocalStorage = favouritesFromLocalStorage.filter(
            (item) => item.id !== heroId
        );

        // Save in localstorage
        localStorage.setItem(
            FAVOURITES,
            JSON.stringify(favouritesFromLocalStorage)
        );

        showNotification('success', 'Removed from favourites');
    }

    /* Get fav superheroes from the local storage */
    function getFavouriteSuperheroes() {
        return localStorage.getItem(FAVOURITES) ?
            JSON.parse(localStorage.getItem(FAVOURITES)) :
            [];
    }

    function debounce(func, delay) {
        let timeout;
        return function () {
            const context = this;
            const args = arguments;

            clearTimeout(timeout);

            timeout = setTimeout(function () {
                timeout = null;
                func.apply(context, args);
                // handleSearch(args);
            }, delay);
        };
    }

    setRandomBackgroundImage();

    return {
        apiRequest,
        apiUrl,
        showNotification,
        addHeroToFavourites,
        removeHeroFromFavourites,
        getFavouriteSuperheroes,
        showLoader,
        hideLoader,
        debounce
    };
})();