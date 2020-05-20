import {elements} from './base';
export const getInput = () => elements.searchInput.value;
export const clearInput = () => elements.searchInput.value = '';
export const clearResults = () => elements.searchContent.innerHTML = '';

const renderMusicSearch = music => {
    const markup = `
    <li class="card-container">
        <a class="artist-card" href="#${music.id}">
            <figure>
                    <img src="${music.album.cover_medium}" alt="artist" class="artist-card__img">
                <figcaption>
                    <p class="artist-card__name">${music.title}</p>
                    <p class="artist-card__number-albums">${music.artist.name}</p>
                </figcaption>
            </figure>
        </a>
    </li>
    `;
    elements.searchContent.insertAdjacentHTML('beforeend', markup);
} 



const createButtons = (type) => `
    <div class="btn-inline results__btn--${type}"  type="button">
        <span>${type}</span>
    </div>`;



export const scrollHandler = (music) => {
    // console.log(pageYOffset)
    console.log(music.data.length)
    const pageBtns = document.querySelectorAll('.results__btn--prev, .results__btn--next')
    if(music.data.length > 15){
        pageBtns.forEach(el => pageYOffset > 1000 ? el.style.display = 'flex':el.style.display = 'none')
    }else{
        pageBtns.forEach(el =>  el.style.display = 'flex')
    }

    
    
}

const renderButtons = (music) => {
    const pages = 0;
    let button;
    if(music.next && !music.prev){
        button = createButtons('next');
        
    }else if(music.next  && music.prev ){
        button = `
        ${button = createButtons('prev')}
        ${button = createButtons('next')}
        `
    }else if(!music.next && music.prev){
        button = createButtons('prev')
    }
    elements.searchContent.insertAdjacentHTML('afterbegin' , button);
}



export const renderResults = (music, page = 1, resPerPage = 25) => {
    // const start = (page -1) * resPerPage;
    // const end = page * resPerPage;
    // // recipes.slice(start, end).forEach(renderRecipe)
    


    music.data.forEach(renderMusicSearch);
    renderButtons(music)
}
