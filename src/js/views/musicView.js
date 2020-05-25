import {elements, musicPlayList} from './base';

export const renderArtist = (music) => {
    console.log(music)

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
                    <ul class="music__playlist">
                    ${music.tracklist.map(el => musicPlayList(el))}
                    <ul>
                </div>
           
            </div>
    `;
    

    elements.musicContainer.insertAdjacentHTML('afterbegin', markup);
}



export const renderAlbum = (music) => {

    const markup = `
    <figure class="music__fig">
                <img src="${music.picture}" alt="${music.title}" class="recipe__img">
                <h1 class="music__title">
                    <span>${music.title}</span>
                </h1>
    </figure>
            <div class="music__details">
                
                <div class="recipe__info">
                    <span class="music__info-data">${music.tracksNumber}</span>
                    <span class="music__info-data">${music.genre}</span>

                </div>
                <div class = "music__container">
                    <ul class="music__playlist">
                    ${music.tracklist.map(el => musicPlayList(el))}
                    <ul>
                </div>
           
            </div>
    `;
    elements.musicContainer.insertAdjacentHTML('afterbegin', markup);
}