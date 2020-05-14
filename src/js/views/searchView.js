import {elements} from './base';
export const getInput = () => elements.searchInput.value;
export const clearInput = () => elements.searchInput.value = '';
export const clearResults = () => elements.searchContent.innerHTML = '';

const renderMusicSearch = music => {
    const markup = `
        <a class="artist-card" href="#${music.id}">
            <figure>
                    <img src="${music.album.cover_medium}" alt="artist" class="artist-card__img">
                <figcaption>
                    <p class="artist-card__name">${music.artist.name}</p>
                    <p class="artist-card__number-albums">${music.title}</p>
                </figcaption>
            </figure>
        </a>
    `;
    elements.searchContent.insertAdjacentHTML('beforeend', markup);

} 

export const renderResults = (music) => {
    music.forEach(renderMusicSearch);
}