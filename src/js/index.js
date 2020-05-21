'use strict'
import '../styles/styles.css'
import Search from './models/Search';
import * as searchView from './views/searchView';
import {elements, renderLoader, clearLoader, elementString} from './views/base';

let albumMethods = 'https://api.deezer.com/album/103248';
let chatsMethod = 'https://api.deezer.com/chart/';
let songMethod = 'https://api.deezer.com/track/3135556';


const state = {};
///////////////////////////    SEARCH CONTROLLER   ////////////////////////
const controlSearch = async () => {
    const query = searchView.getInput();


    if(query){
        state.search = new Search(query);
        searchView.clearInput();
        searchView.clearResults();
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


    }
}

const buttonsSearch = async (e) => {
    if(state){
        searchView.clearResults();
        renderLoader(elements.mainContainer)
        const btn = e.target.closest('.btn-inline');
        const goToPage = parseInt(btn.dataset.goto, 10);
        if(btn){
            let type = btn.className.split('--')[1]
        try{
            await state.search.getBtnResult(type);
            searchView.renderResults(state.search.musicSearch.data, goToPage)
            console.log(state.search.musicSearch.data)
            clearLoader();
        }catch(error){
            alert('Something wrong with search....')
            clearLoader();
        }
    }
    }

    
}




elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})



// elements.searchContent.addEventListener('click', e => {
//     const btn = e.target.closest('.btn-inline');
//     if(btn){
//         const goToPage = parseInt(btn.dataset.goto, 10);
//         searchView.clearResults();
//         searchView.renderResults(state.search.musicSearch.data, goToPage)
//     }
// })

elements.searchContent.addEventListener('click', e => {
    buttonsSearch(e);
})


