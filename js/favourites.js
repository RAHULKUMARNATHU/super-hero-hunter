const Favourites = (function () {
    const searchList = document.getElementById('search-results-list');

    function renderFavourites() {
        const favouritesData = Common.getFavouriteSuperheroes();

        // First empty the list
        searchList.innerHTML = '';

        if (!favouritesData || favouritesData.length === 0) {
            searchList.innerHTML = '<li class="no-results">No results found!</li>';
        } else {
            favouritesData.forEach((element) => {
                const li = document.createElement('li');
                li.classList.add('search-result');
                li.innerHTML = `
                    <div class="search-left">
                      <img src=${element.image.url} alt="" />
                    </div>
                    <div class="search-right">
                      <a href="superhero.html?id=${element.id}">
                        <div class="name">${element.name}</div>
                      </a>
                      <div class="full-name">${element.biography['full-name']}</div>
                      <div class="address">${element.biography['place-of-birth']}</div>
                      <button class="btn remove-from-fav" data-id=${element.id}>Remove from favourites</button>
                    </div>
                  `;
                searchList.appendChild(li);
            });
        }

        Common.hideLoader();
        return;
    }

    /* Handle search key down event and make an API all */
    function handleDocumentClick(e) {
        const target = e.target;

        if (target.classList.contains('remove-from-fav')) {
            // Find the hero data and store it in favourites and localstorage
            const searchResultClickedId = target.dataset.id;
            Common.removeHeroFromFavourites(searchResultClickedId);
            renderFavourites();
        }
    }

    function init() {
        Common.showLoader();
        renderFavourites();
        document.addEventListener('click', handleDocumentClick);
    }

    return {
        init
    };
})();