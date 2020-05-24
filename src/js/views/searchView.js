import {elements, limitString, musicPlayList} from './base';
export const getInput = () => elements.searchInput.value;
export const clearInput = () => elements.searchInput.value = '';
export const clearResults = () => [elements.searchContent,elements.songList].forEach(el => el.innerHTML = '');
export const clearTitle = () => elements.artistTitle.innerHTML = '';


const renderMusicCard = (music, type) => {
    


    let markup;
    if(type == 'artist'){
        markup = `
        <li class="card-container">
            <a class="artist-card" href="#${music.artist.id}">
                
                <figure>
                        <img src="${music.album.cover_medium}" alt="artist" class="artist-card__img">
                        <button class="music__love">
                        <svg class="header__likes">
                            <use href="./sprite.svg#icon-heart-outlined"></use>
                        </svg>
                        </button>
                        <button class="youtube__play">
                            <p>YOUTUBE PLAY</p>
                        </button>
                        <button class="preview__play">
                            <p>PREVIEW PLAY</p>
                        </button>
                    <figcaption>
                        <p class="artist-card__number-albums">${music.artist.name}</p>
                        <p class="artist-card__name">${limitString(music.title)}</p>
                    </figcaption>
                </figure>
            </a>
        </li>
        `;
    }else if(type === 'albums'){
        markup = `
        <a class="artist-card" href="#${music.album.id}">
                            <figure>
                                <img src="${music.album.cover_medium}" alt="albums-picture" class="artist-card__img">
                                <figcaption>
                                    <p class="artist-card__name">${limitString(music.album.title)}</p>
                                </figcaption>
                            </figure>
                            </a>
        `
    }else if(type === 'songs'){
        markup = musicPlayList(music);
    }

    if(type === 'songs'){
        elements.songList.insertAdjacentHTML('beforeend', markup);
    }else{
        elements.searchContent.insertAdjacentHTML('beforeend', markup);
    }
    
} 

const renderTitle = (music) => {
    const markup =` <h1>${music.data[0].artist.name}</h1>`
    elements.artistTitle.insertAdjacentHTML('afterbegin', markup);
}






const scrollHandler = (pageBtns) => {
        pageBtns.forEach(el => pageYOffset > 250 ? el.style.display = 'flex':el.style.display = 'none')
    }


const renderScroll = music => {
        const pageBtns = document.querySelectorAll('.results__btn--prev, .results__btn--next');
        
            if(music.data.length > 10){
                window.addEventListener('scroll',e =>{
                    scrollHandler(pageBtns); 
                });
            }else{
                pageBtns.forEach(el =>  el.style.display = 'flex')
            }
        }


const createButtons = (page, type) => `
    <div class="btn-inline results__btn--${type}" data-goto="${type === 'prev' ? page -1 : page +1}" type="button">
        <span>Page ${type === 'prev' ? page -1 : page +1}</span>
    </div>`;

    
const renderButtons = (page, music) => {
    let button;
    if(music.next && !music.prev){
        button = createButtons(page,'next');
        
    }else if(music.next  && music.prev ){
        button = `
        ${button = createButtons(page, 'prev')}
        ${button = createButtons(page, 'next')}
        `
    }else if(!music.next && music.prev){
        button = createButtons(page, 'prev')
    }
    elements.searchContent.insertAdjacentHTML('afterbegin' , button);
}


export const renderResults = (music, page = 1, type = 'artist') => {
        music.data.forEach(el => renderMusicCard(el, type));
        renderTitle(music);
        renderButtons(page, music);
        renderScroll(music);
}
