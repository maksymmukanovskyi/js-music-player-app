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



const createButtons = () => `
<div class="results__pages">
    <div class="results__btn--prev" type="button">
        <span>PAGE 1</span>
    </div>
    <div class="results__btn--next" type="button">
        <span>PAGE 3</span>
    </div>
</div>`;



export const scrollHandler = () => {
    console.log(pageYOffset)
    const pageBtn = document.querySelector('.results__pages')
    
    // pageYOffset > 900 ? pageBtn.style.display = 'flex':pageBtn.style.display = 'none';
    pageYOffset > 1000 ? pageBtn.style.display = 'flex':pageBtn.style.display = 'none';

}

const renderButtons = () => {
    let button = createButtons()
    elements.searchContent.insertAdjacentHTML('afterbegin' , button);
}



export const renderResults = (music) => {
    music.forEach(renderMusicSearch);
    renderButtons()
}
