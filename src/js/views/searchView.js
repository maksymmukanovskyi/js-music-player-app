import {elements} from './base';
export const getInput = () => elements.searchInput.value;
export const clearInput = () => elements.searchInput.value = '';
export const clearResults = () => elements.searchContent.innerHTML = '';

const renderMusicSearch = music => {
    const markup = `
    <li class="card-container">
        <a class="artist-card" href="#${music.id}">
            <figure>
                    <img src="${music.album.cover_medium}" alt="artist" class="artist-card__img">
                <figcaption>
                    <p class="artist-card__name">${music.title}</p>
                    <p class="artist-card__number-albums">${music.artist.name}</p>
                </figcaption>
            </figure>
        </a>
    </li>
    `;
    elements.searchContent.insertAdjacentHTML('beforeend', markup);
} 



const createButtons = (page, type) => `
    <div class="btn-inline results__btn--${type}" data-goto="${type === 'prev'? page - 1: page + 1}" type="button">
        <span>PAGE ${type === 'prev'? page - 1: page + 1}</span>
    </div>`;



export const scrollHandler = () => {
    console.log(pageYOffset)
    const pageBtns = document.querySelectorAll('.results__btn--prev, .results__btn--next')
    pageBtns.forEach(el => pageYOffset > 1000 ? el.style.display = 'flex':el.style.display = 'none')
}

const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);
    let button;
    if(page === 1 && pages > 1){
        button = createButtons(page, 'next')
    }else if(page < pages){
        button = `
        ${button = createButtons(page, 'prev')}
        ${button = createButtons(page, 'next')}
        `
    }else if(page === pages && pages > 1){
        button = createButtons(page, 'prev')
    }
    elements.searchContent.insertAdjacentHTML('afterbegin' , button);
}



export const renderResults = (music, page = 1, resPerPage = 21) => {
    const start = (page -1) * resPerPage;
    const end = page * resPerPage;
    // recipes.slice(start, end).forEach(renderRecipe)


    music.data.slice(start, end).forEach(renderMusicSearch);
    console.log(page)
    renderButtons(page, music.total, resPerPage)
}
