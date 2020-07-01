import {elements, limitString, musicPlayList} from './base';
import {state} from '../index';



export const toggleLikeBtn = (isLiked, target) => {
    const iconString = isLiked? 'icon-heart' : 'icon-heart-outlined';
    // document.querySelector('.header__likes use').setAttribute('href', `./sprite.svg#${iconString}`)
    target.children[0].setAttribute('href', `./sprite.svg#${iconString}`)
}
export const toggleLikesCount = (types, numLikes) => {
    for(let i = 0;i < types.length; i++){
        types[i].style.visibility = numLikes[i] > 0? 'visible': 'hidden';
        if(numLikes[i] > 0)types[i].textContent = numLikes[i];
    }
}

export const renderFavourite = (music, type) => {
    let markup;
    if(type == 'artist'){
        markup =`<div>
        <button class="back__music"> BACK </button>
        <h1 class="love__title">LOVED ${type.toUpperCase()}</h1>
        <ul class="playlist">
        ${music.map(el => 
            `<li class="songs-item">
            
                <a class="songs-link" href="#${el.id}">
                <figure class="songs-item__figure">
                
                    <figcaption class="songs-item__discription__love" >
                         <div >
                         <img src="${el.picture}" alt="albums-picture" class="artist-card__img__love">
                             <p class="songs-item__music-name__love">${limitString(el.title)}</p>
                        </div>
                        <button class="music__love__tracks">
                                    <svg class="track__likes" data-gotoid="${el.id}"
                                    data-gototitle="${el.title}"
                                    data-gotoimage="${el.picture}">
                                        <use href=${state.likes.isLiked(state.likes.artistLikes, el.id)?"./sprite.svg#icon-heart":"./sprite.svg#icon-heart-outlined"}></use>
                                    </svg>
                            </button>
                    </figcaption>
                </figure>
            </a>
            </li>`
            ).join('')}
        </ul>
    </div>`;
    }else if(type == 'albums'){
        markup =`<div>
        <button class="back__music"> BACK </button>
        <h1 class="love__title">LOVED ${type.toUpperCase()}</h1>
        <ul class="playlist">
        ${music.map(el => 
            `<li class="songs-item">
            
                <a class="songs-link" href="#${el.id}">
                <figure class="songs-item__figure">
                
                    <figcaption class="songs-item__discription__love" >
                         <div >
                         <img src="${el.picture}" alt="albums-picture" class="artist-card__img__love">
                             <p class="songs-item__music-name__love">${limitString(el.title)}</p>
                        </div>
                        <button class="music__love__tracks">
                                    <svg class="track__likes" data-gotoid="${el.id}"
                                    data-gototitle="${el.title}"
                                    data-gotoimage="${el.picture}">
                                        <use href=${state.likes.isLiked(state.likes.albumLikes, el.id)?"./sprite.svg#icon-heart":"./sprite.svg#icon-heart-outlined"}></use>
                                    </svg>
                            </button>
                    </figcaption>
                </figure>
            </a>
            </li>`
            ).join('')}
        </ul>
    </div>`;
    }else if(type == 'songs'){
        markup =`<div>
        <button class="back__music"> BACK </button>
        <h1 class="love__title">LOVED ${type.toUpperCase()}</h1>
        <ul class="playlist">
        ${music.map(el => 
            `<li class="songs-item">
            
                <a class="songs-link" href="#${el.id}">
                <figure class="songs-item__figure">
                
                    <figcaption class="songs-item__discription__love" >
                         <div >
                         <img src="${el.picture}" alt="albums-picture" class="artist-card__img__love">
                             <p class="songs-item__music-name__love">${limitString(el.title)}</p>
                        </div>
                        <button class="music__love__tracks">
                                    <svg class="track__likes" data-gotoid="${el.id}"
                                    data-gototitle="${el.title}"
                                    data-gotoimage="${el.picture}">
                                        <use href=${state.likes.isLiked(state.likes.songLikes, el.id)?"./sprite.svg#icon-heart":"./sprite.svg#icon-heart-outlined"}></use>
                                    </svg>
                            </button>
                    </figcaption>
                </figure>
            </a>
            </li>`
            ).join('')}
        </ul>
    </div>`;      
    }

    
    elements.musicContainer.insertAdjacentHTML('beforeend', markup);
}

