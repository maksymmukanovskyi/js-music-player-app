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
            searchView.renderResults(state.search.musicSearch.data)
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
            searchView.renderResults(state.search.musicSearch.data)
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
        // renderLoader(elements.mainContainer)
        searchView.clearTitle();
        const btn = e.target.closest('.btn-inline');
        const goToPage = parseInt(btn.dataset.goto, 10);
        if(btn){
            let type = btn.className.split('--')[1]
        try{
            await state.search.getBtnResult(type);
            searchView.renderResults(state.search.musicSearch.data, goToPage, state.search.activeTab);
            clearLoader();
        }catch(error){
            alert('Something wrong with search....')
            clearLoader();
        }
    }
    }
}

const headerFiltering = (e) => {
    if(state){
        searchView.clearResults();
        searchView.clearTitle();
        window.pageYOffset;
        const btnType = e.target.textContent.toLowerCase();
        state.search.activeTab = btnType;
        searchView.renderResults(state.search.musicSearch.data, null, btnType);
    }
}


elements.searchForm.addEventListener('submit', e => {
    let tab = clearTabs();
    tab[0].classList.add('active');
    e.preventDefault();
    controlSearch();
})


elements.searchContent.addEventListener('click', e => {
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

