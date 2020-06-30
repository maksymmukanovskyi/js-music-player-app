import {elements, limitString, musicPlayList} from './base';
import {state} from '../index';
export const getInput = () => elements.searchInput.value;
export const clearInput = () => elements.searchInput.value = '';
export const clearResults = () => [elements.searchContent,elements.songList, elements.musicContainer].forEach(el => el.innerHTML = '');
export const clearTitle = () => elements.artistTitle.innerHTML = '';

const renderMusicCard = (music, type) => {

    let markup;
    if(type == 'artist'){
        markup = `
        <li class="artist-card card" >
        <button class="music__love">
                        <svg class="header__likes" data-gotoid="${music.artist.id}"
                        data-gototitle="${music.artist.name}"
                        data-gotoimage="${music.artist.picture_medium}">
                            <use href=${state.likes.isLiked(state.likes.artistLikes, music.artist.id)?"./sprite.svg#icon-heart":"./sprite.svg#icon-heart-outlined"}
                            ></use>
                        </svg>
                        </button>

            <a  href="#${music.artist.id}">
                <figure>
                        <img src="${music.artist.picture_medium}" alt="artist" class="artist-card__img">
                    <figcaption>
                        <p  class="artist-card__name">${limitString(music.artist.name)}</p>
                        <p class="artist-card__number-albums" >${limitString(music.title)}</p>
                    </figcaption>
                </figure>
            </a>
        </li>
        `;
    }else if(type === 'albums'){
        markup = `
        <li class="album-card card">
        <button class="music__love">
                        <svg class="header__likes"
                        data-gotoid="${music.album.id}"
                        data-gototitle="${music.album.title}"
                        data-gotoimage="${music.album.cover_medium}">
                            <use href=${state.likes.isLiked(state.likes.albumLikes, music.album.id)?"./sprite.svg#icon-heart":"./sprite.svg#icon-heart-outlined"}></use>
                        </svg>
                        </button>
        <a  href="#${music.album.id}">
                            <figure>
                                <img src="${music.album.cover_medium}" alt="albums-picture" class="artist-card__img">
                        
                                <figcaption>
                                    <p class="artist-card__name">${limitString(music.album.title)}</p>
                                </figcaption>
                            </figure>
                            </a>
                            </li>
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
       
export const stateButtonCounter = (tab, type) => {
            if(tab == 'artist'){
                type == 'prev' ? state.pages.goToAristPage -=1 : state.pages.goToAristPage +=1;
            }else if(tab == 'albums'){
                type == 'prev' ? state.pages.goToAlbumPage -=1 : state.pages.goToAlbumPage +=1;
            }else if(tab == 'songs'){
                type == 'prev' ? state.pages.goToMusicPage -=1 : state.pages.goToMusicPage +=1;
            }
        };




const createButtons = (page, type) => `<div class="btn-inline results__btn--${type}"
         data-goto_artist="${page}"
         type="button">
         <span>Page ${type === 'prev' ? page -1 : page +1}</span>
        </div>`;





const renderButtons = (music, page) => {
    let button;
    if(music.next && !music.prev){
        button = createButtons(page, 'next');
    }else if(music.next  && music.prev ){
        button = `
        ${button = createButtons(page, 'prev')}
        ${button = createButtons(page, 'next')}
        `
    }else if(!music.next && music.prev){
        button = createButtons(page, 'prev');
    }
    elements.searchContent.insertAdjacentHTML('afterbegin' , button);
}

const getUniqueArtist = (arr, comp) => {
//colected all names
const unique =  arr.map(e => e.artist[comp])
//check if names arerepeated by index
         .map((e, i, final) => final.indexOf(e) === i && i)
//filter existing array by truethfull indexes (scipped objects with false parameters)
         .filter((e) => arr[e])
// render objects  with given indexes         
         .map(e => arr[e]);
            return unique;
}


export const renderResults = (music, page = 1, type = 'artist') => {
    let uniqueArtist = getUniqueArtist(music.data, 'name')

    if(type == 'artist'){
        uniqueArtist.forEach(el => renderMusicCard(el, type));
    }else{
        music.data.forEach(el => renderMusicCard(el, type));
    }
        


        // renderFavourite(music);
        renderButtons(music, page);
        renderScroll(music);
}


