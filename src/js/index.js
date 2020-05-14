'use strict'
import '../styles/styles.css'
import Search from './models/Search';
import * as searchView from './views/searchView';
import {elements} from './views/base';

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

        try{
            await state.search.getResults();
            searchView.renderResults(state.search.musicSearch.data.data)
            console.log(state.search.musicSearch.data.data)
        }catch(error){
            alert('Something wrong with search....')
        }

    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})


