import {elements} from './base';
export const getInput = () => elements.searchInput.value;
export const clearInput = () => elements.searchInput.value = '';
export const clearResult = () => elements.searchContent.innerHTML = '';

const renderMusicSearch = music => {
    const markup = `
    <li>
        <a class="artist-card" href="#76767">
            <figure>
                    <img src="./assets/Ember.jpg" alt="artist" class="artist-card__img">
                <figcaption>
                    <p class="artist-card__name">Rammstein</p>
                    <p class="artist-card__number-albums">5 albums</p>
                </figcaption>
            </figure>
        </a>
                </li>
    `;
    

} 