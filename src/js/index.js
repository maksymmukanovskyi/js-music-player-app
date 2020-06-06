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
        searchView.renderResults(state.search.artistSearch.data, state.pages.goToAristPage, btnType);
    }else if(btnType == 'albums'){
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
    if(id){
    if(state.search.activeTab == 'artist'){

        searchView.clearResults();
        renderLoader(elements.mainContainer);
        searchView.clearTitle();
        state.music = new Music(id);
        try{
        await state.music.getArtist()
console.log('music state', state.music)

        musicView.renderArtist(state.music)
        window.history.replaceState(null, null, ' ');
        clearLoader();
        }catch(error){
            clearLoader();
            alert('Error processin music!')
        }
    }else if(state.search.activeTab == 'albums'){
        searchView.clearResults();
        renderLoader(elements.mainContainer);
        searchView.clearTitle();
        state.music = new Music(id);
        try{
        await state.music.getAlbum();
console.log('album state', state.music)

        musicView.renderAlbum(state.music);
        window.history.replaceState(null, null, ' ');
        clearLoader();
        }catch(error){
            clearLoader();
            alert('Error processin music!')
        }
    }
    }
}

window.addEventListener('hashchange', e => {
    controlMusic(e)
});
elements.musicContainer.addEventListener('click', (e) => {
    if(e.target.className !== 'back__music') return;
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
const controlLikes = () => {
    if(!state.likes) state.likes = new Likes();
    const currentArtisrId = state.music.id;
    const currentAlbumId = state.music.id;
    const currentId = state.music.id;


    if(state.search.activeTab == 'artist'){
        if(!state.likes.isLiked(currentId)){
            const newLike = state.likes.addArtistLike(
                currentId,
                state.music.title,
                state.music.picture,
            );
    }else if(state.search.activeTab == 'albums'){

    }else if(state.search.activeTab == 'songs'){

    }

    
    }
}

elements.musicContainer.addEventListener('click', (e) => {
    console.log(e.target)

    if(e.target.matches('.music__love__music, .music__love__music *, .music__love__tracks, music__love__tracks *, .header__likes, header__likes *'))
        controlLikes()
})

