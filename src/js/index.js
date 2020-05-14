'use strict'
import '../styles/styles.css'
console.log('hello world');
const API_KEY = '3818b23a1afa6fe7d3e14819840cafc5';
// const SHARED_SECRET = 4d6463398d29c80b23da38978551ae0e;




const ctx = new AudioContext();
let audio;
fetch(`http://ws.audioscrobbler.com/2.0/?method=track.search&track=Believe&api_key=${API_KEY}&format=json`)
.then(response => {
    if(response.ok) return response.json();
    throw new Error(`Error while fething: ${response.statusText}`)
})
.then(data => console.log(data.results.trackmatches.track[0].url))





.catch(error => console.log(error));


function playback(){
    const playSound = ctx.createBufferSource();
    playSound.buffer = audio;
    playSound.connect(ctx.destination);
    playSound.start(ctx.currentTime);
}

// window.addEventListener('click', playback);

// const data = {
//     "artist": {
//         "name": "Cher",
//         "mbid": "bfcc6d75-a6a5-4bc6-8282-47aec8531818",
//         "url": "https://www.last.fm/music/Cher",
//         "image": [
//             {
//                 "#text": "https://lastfm-img2.akamaized.net/i/u/34s/345a7b45ef442c8340f9b19263021c68.png",
//                 "size": "small"
//             }]
//         }};

//         'use strict';
// const contentArtist = document.querySelector('#artist');
// const contentAlbum = document.querySelector('#albums');
// const content = document.querySelector('.content');
// const chart = document.querySelectorAll('.chart-list');
// const album = document.querySelector('.content__album');
// const divChart = document.querySelector('.chart');
// const contentSongs = document.querySelector('#songs');