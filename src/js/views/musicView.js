import {elements} from './base';

export const renderMusic = (music) => {
    const markup = `
    <figure class="music__fig">
                <img src="${music.picture}" alt="${music.title}" class="recipe__img">
                <h1 class="music__title">
                    <span>${music.title}</span>
                </h1>
    </figure>
            <div class="music__details">
                
                <div class="recipe__info">
                    <span class="music__info-data">${music.albumNumbers}</span>
                </div>
                <div class = "music__container">

                </div>
           
            </div>
    `;


    elements.musicMainBox.insertAdjacentHTML('afterbegin', markup);
}