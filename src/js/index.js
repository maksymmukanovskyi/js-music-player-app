'use strict'
import '../styles/styles.css'
import Search from './models/Search';
import Music from './models/Music';

import * as searchView from './views/searchView';
import * as musicView from './views/musicView';

import {elements, renderLoader, clearLoader, elementString} from './views/base';


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
            console.log(state.search.musicSearch.data.next)

            clearLoader();
        }catch(error){
            alert('Something wrong with search....')
            clearLoader();
        }
    }else{
        state.search = new Search(query);
        searchView.clearInput();
        searchView.clearResults();
        searchView.clearTitle();
        renderLoader(elements.mainContainer)

        try{
            await state.search.getDefaultLoad();
            searchView.renderResults(state.search.musicSearch.data)
            console.log(state.search.musicSearch.data.next)

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
        // const goToPage = parseInt(btn.dataset.goto, 10);
        if(btn){
            let type = btn.className.split('--')[1]
        try{
            await state.search.getBtnResult(type);
            searchView.renderResults(state.search.musicSearch.data, goToPage, state.search.activeTab);
            clearLoader();
            console.log(state.search)
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
    e.preventDefault();
    controlSearch();
})


elements.searchContent.addEventListener('click', e => {
    buttonsSearch(e);
})

elements.listType.addEventListener('click', e => {
    if(e.target.nodeName !== 'LI') return;
    let tabs = document.querySelectorAll('.chart-list__item');
    tabs.forEach(el => el.classList.remove('active'))
    e.target.classList.add('active');
    headerFiltering(e);
})
window.addEventListener('load', controlSearch)

////////////////////////MUSIC CONTROLLER/////////////////////////////

const controlMusic = async (e) => {
    const id = window.location.hash.replace('#', '');
    if(id){

    if(e.target.closest('.artist-card')){

        searchView.clearResults();
        renderLoader(elements.mainContainer);
        searchView.clearTitle();

        state.music = new Music(id);
        try{
        await state.music.getArtist()
        musicView.renderArtist(state.music)
        clearLoader();

        
        }catch(error){
            clearLoader();
            alert('Error processin music!')
        }
    }else if(e.target.closest('.album-card')){
        searchView.clearResults();
        renderLoader(elements.mainContainer);
        searchView.clearTitle();

        state.music = new Music(id);

        try{
        await state.music.getAlbum();
        musicView.renderAlbum(state.music)
        clearLoader();

        
        }catch(error){
            clearLoader();
            alert('Error processin music!')
        }
    }
    
       
    }
}

elements.musicMainBox.addEventListener('click', e => {
    controlMusic(e)
});