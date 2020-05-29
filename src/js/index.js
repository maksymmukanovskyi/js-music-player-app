'use strict'
import '../styles/styles.css'
import Search from './models/Search';
import Music from './models/Music';
import * as searchView from './views/searchView';
import * as musicView from './views/musicView';
import {elements, renderLoader, clearLoader, elementString, clearTabs} from './views/base';


const state = {};
///////////////////////////    SEARCH CONTROLLER   ////////////////////////
const controlSearch = async () => {
    const query = searchView.getInput();

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
}

const buttonsSearch = async (e) => {
    if(state){
        searchView.clearResults();
        renderLoader(elements.mainContainer);
        searchView.clearTitle();
        const btn = e.target.closest('.btn-inline');
        console.log(state.search.activeTab)
        

        if(btn){
            state.pages = {
                goToAristPage: parseInt(btn.dataset.goto_artist, 10),
                goToAlbumPage: parseInt(btn.dataset.goto_album, 10),
                goToMusicPage: parseInt(btn.dataset.goto_song, 10),

            }
            let type = btn.className.split('--')[1];
            let obj = state.search.activeTab;
            console.log(state.pages.goToAristPage)
            console.log(state.pages.goToAlbumPage)
            console.log(state.pages.goToMusicPage)

        try{
            if(obj == 'artist'){
                await state.search.getArtistBtnResult(type);
                searchView.renderResults(state.search.artistSearch.data, state.pages.goToAristPage, state.search.activeTab);

            }else if(obj == 'albums'){
                await state.search.getAlbumBtnResult(type);
                searchView.renderResults(state.search.albumSearch.data, state.pages.goToAlbumPage, state.search.activeTab);

            }else if(obj == 'songs'){
                await state.search.getMusicBtnResult(type);
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
        console.log(state.search.artistSearch.data)
    }else if(btnType == 'albums'){
        searchView.renderResults(state.search.albumSearch.data, state.pages.goToAlbumPage, btnType);
        console.log(state.search.albumSearch.data)
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
    console.log(e.target.closest('.btn-inline'))
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

