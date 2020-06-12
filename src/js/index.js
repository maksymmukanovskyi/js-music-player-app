'use strict'
import '../styles/styles.css'
import Search from './models/Search';
import Music from './models/Music';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as musicView from './views/musicView';
import {elements, renderLoader, clearLoader, elementString, clearTabs} from './views/base';

 export const state = {};
 


///////////////////////////    SEARCH CONTROLLER   ////////////////////////



const controlSearch = async () => {
    const query = searchView.getInput();
    state.pages = {
        goToAristPage: 1,
        goToAlbumPage: 1,
        goToMusicPage: 1,
    }
    if(query){
        state.search = new Search(query);
        searchView.clearInput();
        searchView.clearResults();
        searchView.clearTitle();
        renderLoader(elements.mainContainer)

        try{
            await state.search.getResults();
            searchView.renderResults(state.search.artistSearch.data)
            clearLoader();
        }catch(error){
            alert('Something wrong with search....')
            clearLoader();
        }
    }else{
        state.search = new Search(query);
        state.search.activeTab = "artist";
        searchView.clearInput();
        searchView.clearResults();
        searchView.clearTitle();
        renderLoader(elements.mainContainer)

        try{
            await state.search.getDefaultLoad();
            searchView.renderResults(
                state.search.artistSearch.data
                )
            clearLoader();
        }catch(error){
            alert('Something wrong with search....')
            clearLoader();
        }
    }
};



const buttonsSearch = async (e) => {
    if(state){
        searchView.clearResults();
        renderLoader(elements.mainContainer);
        searchView.clearTitle();
        const btn = e.target.closest('.btn-inline');
        

        if(btn){
            let type = btn.className.split('--')[1];
            let obj = state.search.activeTab;

        try{
            if(obj == 'artist'){
                await state.search.getArtistBtnResult(type);
                searchView.stateButtonCounter('artist', type);
                searchView.renderResults(state.search.artistSearch.data, state.pages.goToAristPage, state.search.activeTab);

            }else if(obj == 'albums'){
                await state.search.getAlbumBtnResult(type);
                searchView.stateButtonCounter('albums', type);
                searchView.renderResults(state.search.albumSearch.data, state.pages.goToAlbumPage, state.search.activeTab);

            }else if(obj == 'songs'){
                await state.search.getMusicBtnResult(type);
                searchView.stateButtonCounter('songs', type);
                searchView.renderResults(state.search.musicSearch.data, state.pages.goToMusicPage, state.search.activeTab);
            }
            clearLoader();
        }catch(error){
            alert('Something wrong with search....')
            clearLoader();
        }
    }
    }
}

const headerFiltering = async (e) => {
    if(state){
        searchView.clearResults();
        searchView.clearTitle();
        window.pageYOffset;
        const btnType = e.target.textContent.toLowerCase();
        state.search.activeTab = btnType;

        if(btnType == 'artist'){
    state.search.activeSelection = false;

        searchView.renderResults(state.search.artistSearch.data, state.pages.goToAristPage, btnType);
    }else if(btnType == 'albums'){
    state.search.activeSelection = false;

        searchView.renderResults(state.search.albumSearch.data, state.pages.goToAlbumPage, btnType);
    }else if(btnType == 'songs'){
        searchView.renderResults(state.search.musicSearch.data, state.pages.goToMusicPage, btnType);
    }
        
    }
}


elements.searchForm.addEventListener('submit', e => {
    let tab = clearTabs();
    tab[0].classList.add('active');
    e.preventDefault();
    controlSearch();
})


elements.searchContent.addEventListener('click', e => {
    if(!e.target.closest('.btn-inline')) return;
    buttonsSearch(e);
})

elements.listType.addEventListener('click', e => {
    if(e.target.nodeName !== 'LI') return;
    clearTabs();
    e.target.classList.add('active');
    headerFiltering(e);
})

window.addEventListener('load', controlSearch)

elements.logoSign.addEventListener('click', () => {
    let tab = clearTabs();
    tab[0].classList.add('active');
    controlSearch()
});
elements.homeBtn.addEventListener('click', () => {
    let tab = clearTabs();
    tab[0].classList.add('active');
    controlSearch()
});


////////////////////////MUSIC CONTROLLER/////////////////////////////

const controlMusic = async (e) => {
    const id = window.location.hash.replace('#', '');
    // const id = e.target.closest('.card').dataset.goto;
    if(id){
    if(!state.search.activeSelection && state.search.activeTab == 'artist'){
        searchView.clearResults();
        renderLoader(elements.mainContainer);
        searchView.clearTitle();
        state.music = new Music(id);
        try{
        await state.music.getArtist();
        musicView.renderArtist(state.music);
        window.history.replaceState(null, null, ' ');
        clearLoader();
        }catch(error){
            clearLoader();
            alert('Error processin music!')
        }
    }else if(!state.search.activeSelection && state.search.activeTab == 'albums'){
        searchView.clearResults();
        renderLoader(elements.mainContainer);
        searchView.clearTitle();
        state.music = new Music(id);
        try{
        await state.music.getAlbum();
        musicView.renderAlbum(state.music);
        window.history.replaceState(null, null, ' ');
        clearLoader();
        }catch(error){
            clearLoader();
            alert('Error processin music!')
        }
    }else if(state.search.activeSelection || state.search.activeTab == 'songs'){
        searchView.clearResults();
        renderLoader(elements.mainContainer);
        searchView.clearTitle();
        state.music = new Music(id);
        try{
        await state.music.getTrack();
        musicView.renderTrack(state.music);
        window.history.replaceState(null, null, ' ');
        clearLoader();
        }catch(error){
            clearLoader();
            alert('Error processin music!')
            }
        }
    }
}


elements.musicContainer.addEventListener('click', e => {
if(e.target.closest('.songs-item__discription') !== null && e.target.closest('.songs-item__discription').className == 'songs-item__discription'){
    return state.search.activeSelection = true;
}
})
window.addEventListener('hashchange', e => {
    console.log(e)
    controlMusic(e);
});





elements.musicContainer.addEventListener('click', (e) => {
    if(e.target.className !== 'back__music') return;
    state.search.activeSelection = false;
    if(state){
        searchView.clearResults();
        searchView.clearTitle();
        window.pageYOffset;
        let type = state.search.activeTab;
        if(type == 'artist'){
        searchView.renderResults(state.search.artistSearch.data, state.pages.goToAristPage, type);
    }else if(type == 'albums'){
        searchView.renderResults(state.search.albumSearch.data, state.pages.goToAlbumPage, type);
    }else if(type == 'songs'){
        searchView.renderResults(state.search.musicSearch.data, state.pages.goToMusicPage, type);
    }
    }
})


///////////////////////////////// LIKES CONROLLER ////////////////////////////
const controlLikes = (e) => {
    if(!state.likes) state.likes = new Likes();
    console.log(state.likes)
    console.log(!state.music)
    console.log(e.target.dataset)



    let currentId;
    let currentTitle;
    let currentPicture;

    if(!state.music){
        currentId = e.target.dataset.gotoid;
        currentTitle = e.target.dataset.gototitle;
        currentPicture = e.target.dataset.gotoimage;
    }else{
        currentId = state.music.id;
        currentTitle = state.music.title;
        currentPicture = state.music.picture;
    }

    if(!state.search.activeSelection && state.search.activeTab == 'artist'){
        if(!state.likes.isLiked(state.likes.artistLikes, currentId)){
            const newLike = state.likes.addArtistLike(
            currentId,
            currentTitle,
            currentPicture,
            )}

    }else if(!state.search.activeSelection && state.search.activeTab == 'albums'){
        if(!state.likes.isLiked(state.likes.albumLikes, currentId)){
            const newLike = state.likes.addAlbumLike(
            currentId,
            currentTitle,
            currentPicture,
            )}
    }else if(state.search.activeTab == 'songs'){
        if(!state.likes.isLiked(state.likes.songLikes, currentId)){
            const newLike = state.likes.addSongLike(
            currentId,
            currentTitle,
            currentPicture,
            )}
    }
    }

// elements.musicContainer.addEventListener('click', (e) => {

//     if(e.target.matches('.header__likes, header__likes *'))
//     console.log('pressed')
//         controlLikes(e)
// })

elements.musicMainBox.addEventListener('click', e => {
    if(!e.target.matches('.header__likes')) return;
    console.log('clicked')
    controlLikes(e);
})

