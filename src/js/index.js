'use strict'
import '../styles/styles.css'
import Search from './models/Search';
import * as searchView from './views/searchView';
import {elements} from './views/base';

let albumMethods = 'https://api.deezer.com/album/103248';
let chatsMethod = 'https://api.deezer.com/chart/';
let songMethod = 'https://api.deezer.com/track/3135556';


// fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=eminem`)

// .then(response => {
//     if(response.ok) return response.json();
//     throw new Error(`Error while fething: ${response.statusText}`)
// })

// .then(data => console.log(data))

// .catch(error => console.log(error));

const state = {};
///////////////////////////    SEARCH CONTROLLER   ////////////////////////
const controlSearch = async () => {
    const query = searchView.getInput();

    if(query){
        state.search = new Search(query);
        searchView.clearInput();

        try{
            await state.search.getResults();
            console.log(state.search);
        }catch(error){
            alert('Something wrong with search....')
        }

    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})


