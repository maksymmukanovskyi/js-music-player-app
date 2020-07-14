'use strict'
import '../styles/styles.css';
import Search from './models/Search';
import Music from './models/Music';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as musicView from './views/musicView';
import * as likeViews from './views/likeViews';
import * as playerView from './views/playerView';
import {inRange, getCoefficient} from  './views/playerView';
import {elements, renderLoader, clearLoader, elementString, clearTabs, setActiveTab} from './views/base';

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
            searchView.renderResults(state.search.artistSearch.data);
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
        state.music = null;
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

// window.addEventListener('load', controlSearch)

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
    controlMusic(e);
});





elements.musicContainer.addEventListener('click', (e) => {
    if(e.target.className !== 'back__music') return;
    state.search.activeSelection = false;
    state.music = null;
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
const controlLikes = (target) => {
    if(!state.likes) state.likes = new Likes();
    console.log('state', state.likes)

    let currentId;
    let currentTitle;
    let currentPicture;
    

    if(!state.music || target.className.baseVal == 'track__likes'){
        currentId = target.dataset.gotoid;
        currentTitle = target.dataset.gototitle;
        currentPicture = target.dataset.gotoimage;
    }else{
        currentId = state.music.id;
        currentTitle = state.music.title;
        currentPicture = state.music.picture;
    }

    if(!state.search.activeSelection && state.search.activeTab == 'artist' && target.className.baseVal !== 'track__likes'){
        if(!state.likes.isLiked(state.likes.artistLikes, currentId)){
            const newLike = state.likes.addArtistLike(
            currentId,
            currentTitle,
            currentPicture,
            );

                likeViews.toggleLikeBtn(true, target);
            }else{

                state.likes.removeLike(state.likes.artistLikes, currentId);
                likeViews.toggleLikeBtn(false, target);
            };

    }else if(!state.search.activeSelection && state.search.activeTab == 'albums'&& target.className.baseVal !== 'track__likes'){
        if(!state.likes.isLiked(state.likes.albumLikes, currentId)){
            const newLike = state.likes.addAlbumLike(
            currentId,
            currentTitle,
            currentPicture,
            );
            likeViews.toggleLikeBtn(true, target);

        }else{
                state.likes.removeLike(state.likes.albumLikes, currentId);
                likeViews.toggleLikeBtn(false, target);
            };
    }
    
    else if(state.search.activeSelection || state.search.activeTab == 'songs' || target.className.baseVal == 'track__likes'){
        if(!state.likes.isLiked(state.likes.songLikes, currentId)){
            const newLike = state.likes.addSongLike(
            currentId,
            currentTitle,
            currentPicture,
            );
            likeViews.toggleLikeBtn(true, target);
        }else{
                state.likes.removeLike(state.likes.songLikes, currentId);
                likeViews.toggleLikeBtn(false, target);
            };
    }

    likeViews.toggleLikesCount(
        [elements.artistsLikeCount,
        elements.albumsLikeCount,
        elements.songsLikeCount
        ],
        [state.likes.getNumLikes(state.likes.artistLikes),
        state.likes.getNumLikes(state.likes.albumLikes),
        state.likes.getNumLikes(state.likes.songLikes),  
        ]
        );

    }

elements.mainContainer.addEventListener('click', e => {

    if(e.target.matches('.header__likes')){
        controlLikes(e.target);
    }else if(e.target.nodeName == 'use'){
        controlLikes(e.target.parentNode);
    }else if(e.target.matches('.track__likes')){
        controlLikes(e.target);
    }
})

window.addEventListener('load', () => {
    state.likes = new Likes();
    state.likes.readStorageData();

    window.rewind = event => {
        if(inRange(event)) {
          elements.player.currentTime = elements.player.duration * getCoefficient(event);
        }
      };
      window.changeVolume = event => {

        if(inRange(event)) {
          elements.player.volume = getCoefficient(event);
        }
      };

    likeViews.toggleLikesCount(
        [elements.artistsLikeCount,
        elements.albumsLikeCount,
        elements.songsLikeCount
        ],
        [state.likes.getNumLikes(state.likes.artistLikes),
        state.likes.getNumLikes(state.likes.albumLikes),
        state.likes.getNumLikes(state.likes.songLikes),  
        ]
        );
    console.log(state);
})

//////////////////////  LIKES NAVIGATION CONTROLLER  //////////////////////////

const controlLikesNavigationButtons = type => {
    searchView.clearResults();
    searchView.clearTitle();
    window.pageYOffset;
    renderLoader(elements.mainContainer);
    state.search.activeTab = type;
    setActiveTab(type);

    if (type == 'artist') {
        likeViews.renderFavourite(state.likes.artistLikes, type);
      } else if (type == 'albums') {
        likeViews.renderFavourite(state.likes.albumLikes, type);
      } else if (type == 'songs') {
        likeViews.renderFavourite(state.likes.songLikes, type);
      } 

    clearLoader();


}


elements.likesNavigation.addEventListener('click', e => {
let target = e.target.closest('.sub-menu__link').textContent.split(' ')[0].toLowerCase();
clearTabs();
controlLikesNavigationButtons(target.trim());
})

///////////////////////PLAY TRACK CONTROLLER//////////////////////////////////
export let currentlyDragged = null;

window.addEventListener('mousedown', function(event) {
  
    if(!playerView.isDraggable(event.target)) return false;

    currentlyDragged = event.target;

    let handleMethod = currentlyDragged.dataset.method;


    this.addEventListener('mousemove', window[handleMethod], false);
    window.addEventListener('mouseup', () => {
        currentlyDragged = false;
      window.removeEventListener('mousemove', window[handleMethod], false);
    }, false);  
  });

  elements.playpauseBtn.addEventListener('click', playerView.togglePlay);
  elements.player.addEventListener('timeupdate', playerView.updateProgress);
  elements.player.addEventListener('volumechange', playerView.updateVolume);
console.log(elements.volumeProgress.style.height);

  elements.player.addEventListener('loadedmetadata', () => {
      elements.totalTime.textContent = playerView.formatTime(elements.player.duration);
  });
  elements.player.addEventListener('canplay', playerView.makePlay);
  elements.player.addEventListener('ended', function(){
    elements.playPause.attributes.d.value = "M18 12L0 24V0";
    elements.player.currentTime = 0;
  });
  
  elements.volumeBtn.addEventListener('click', () => {
      console.log(elements.volumeControls);
    elements.volumeBtn.classList.toggle('open');
    elements.volumeControls.classList.toggle('hidden');
  })
  
//   window.addEventListener('resize', playerView.directionAware);
  
  elements.sliders.forEach(slider => {
      
    let pin = slider.querySelector('.pin');
    // let callFunction = pin.dataset.method;
    // slider.addEventListener('click', window[pin.dataset.method]);
    // slider.addEventListener('click', dragHandler);
    // function dragHandler(e){
    //     console.log(callFunction);

    //     console.log(window[callFunction]);

    // }

    slider.addEventListener('click', clickhandler);
   function clickhandler(e){
       window[pin.dataset.method](e)
   }
  });
  
//   playerView.directionAware();
