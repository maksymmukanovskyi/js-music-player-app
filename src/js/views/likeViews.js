import {elements, limitString, musicPlayList} from './base';


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
    console.log(music);
    console.log(type)
    let markup;
    // if(type == 'artist'){
    //     markup =`<div>
    //     <h2>${music.data[0].artist.name}</h2>
    //     <ul>
    //     ${music.map(el => 
    //         `<li class="album-card">
    //         <a  href="#${el.artist.id}">
    //             <figure>
    //                 <img src="${el.artist.cover_medium}" alt="albums-picture" class="artist-card__img">
    //                 <figcaption>
    //                     <p class="artist-card__name">${limitString(el.artist.title)}</p>
    //                 </figcaption>
    //             </figure>
    //             </a>
    //             </li>`  
    //         )}
    //     </ul>
    // </div>`;
    // }else if(type == 'albums'){
    // markup =`<div>
    // <h2>${music.data[0].album.name}</h2>
    //     <ul>
    //     ${music.map(el => 
    //         `<li class="album-card">
    //         <a  href="#${el.album.id}">
    //             <figure>
    //                 <img src="${el.album.cover_medium}" alt="albums-picture" class="artist-card__img">
    //                 <figcaption>
    //                     <p class="artist-card__name">${limitString(el.album.title)}</p>
    //                 </figcaption>
    //             </figure>
    //             </a>
    //             </li>`  
    //         )}
    //     </ul>
    // </div>`;
    // }else if(type == 'songs'){
    //     markup =`<div>
    //     <h2>${music.data[0].album.name}</h2>
    //         <ul>
    //         ${music.map(el => 
    //     `<li class="album-card">
    //         <a  href="#${el.album.id}">
    //         <figure>
    //             <img src="${el.album.cover_medium}" alt="albums-picture" class="artist-card__img">
    //             <figcaption>
    //                 <p class="artist-card__name">${limitString(el.album.title)}</p>
    //              </figcaption>
    //         </figure>
    //         </a>
    //         </li>`  
    //     )}
    //         </ul>
    //     </div>`;        
    // }

    
    elements.searchContent.insertAdjacentHTML('beforeend', markup);
}

