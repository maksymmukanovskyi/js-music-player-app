import {elements, musicPlayList, limitString} from './base';

export const renderArtist = (music) => {
    const markup = `
    <figure class="fig">
                 <button class="back__music"> BACK </button>
                 <button class="music__love__music">
                        <svg class="header__likes">
                            <use href="./sprite.svg#icon-heart-outlined"></use>
                        </svg>
                </button>
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
    console.log('music.tracklist', music.tracklist);

    const markup = `
    <figure class="fig">
                <button class="back__music"> BACK </button>
                <button class="music__love__music">
                        <svg class="header__likes">
                            <use href="./sprite.svg#icon-heart-outlined"></use>
                        </svg>
                </button>
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

export const renderTrack = (music) => {

    const markup = `
    <figure class="fig">
                <button class="back__music"> BACK </button>
                <button class="music__love__music">
                        <svg class="header__likes">
                            <use href="./sprite.svg#icon-heart-outlined"></use>
                        </svg>
                </button>
                <img src="${music.picture}" alt="${music.title}" class="music__img">
                <h1 class="album__title">${limitString(music.title, 31)}</h1>
                <h2 class="album__title">${limitString(music.artistName, 31)}</h2>

                <div class="info">
                    <p class="album__info-data">Preview: ${music.preview}</p>
                    <p class="album__info-data">Time: ${music.time}</p>
                    <p class="album__info-data">Release: ${music.releaseDate}</p>
                    <p class="album__info-data">Original link: ${music.originalLink}</p>
                </div>
    </figure>`;
    elements.musicContainer.insertAdjacentHTML('afterbegin', markup);
}
