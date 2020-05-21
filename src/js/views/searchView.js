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


export const renderResults = (music, page = 1) => {
    console.log(page)

    music.data.forEach(renderMusicSearch);
    renderButtons(page, music)
    renderScroll(music)
}
