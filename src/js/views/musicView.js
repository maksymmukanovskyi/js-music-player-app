import {elements, musicPlayList, limitString} from './base';

export const renderArtist = (music) => {
console.log(music.tracklist.map(el => musicPlayList(el)).join("'"))
    const markup = `
    <figure class="fig">
                 <button class="back__music"> BACK </button>
                <img src="${music.picture}" alt="${music.title}" class="music__img">
                <h1 class="music__title">${limitString(music.title, 31)}</h1>
                <p class="info-data">Album numbers: ${music.albumNumbers}</p>

    </figure>
                    <ul class="playlist">
                    ${music.tracklist.map(el => musicPlayList(el)).join('')}
                    <ul>`;
    

    elements.musicContainer.insertAdjacentHTML('afterbegin', markup);
}



export const renderAlbum = (music) => {

    const markup = `
    <figure class="fig">
                <button class="back__music"> BACK </button>
                <img src="${music.picture}" alt="${music.title}" class="music__img">
                <h1 class="album__title">${limitString(music.title, 31)}</h1>
                <div class="info">
                    <p class="album__info-data">Tracks numbers: ${music.tracksNumber}</p>
                    <p class="album__info-data">Music genre: ${music.genre}</p>
                </div>
    </figure>
                
                    <ul class="playlist">
                    ${music.tracklist.map(el => musicPlayList(el)).join('')}
                    <ul>`;
    elements.musicContainer.insertAdjacentHTML('afterbegin', markup);
}

