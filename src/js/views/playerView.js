import {elements} from './base';
import {currentlyDragged} from '../index';


const draggableClasses = ['pin'];



export const isDraggable = el =>{
  let canDrag = false;
  let classes = Array.from(el.classList);
  draggableClasses.forEach(draggable => {
    if(classes.indexOf(draggable) !== -1)
      canDrag = true;
  })

  return canDrag;
}

export const inRange = event => {
  let rangeBox = getRangeBox(event);
  let rect = rangeBox.getBoundingClientRect();
  let direction = rangeBox.dataset.direction;
  if(direction == 'horizontal') {
    let min = rangeBox.offsetLeft;
    let max = min + rangeBox.offsetWidth;   
    if(event.clientX < min || event.clientX > max) return false;
  } else {
    let min = rect.top;
    let max = min + rangeBox.offsetHeight; 
    if(event.clientY < min || event.clientY > max) return false;  
  }
  return true;
}

export const updateProgress = () => {
  console.log('works');
  let current = elements.player.currentTime;
  let percent = (current / elements.player.duration) * 100;
  elements.progress.style.width = percent + '%';
  elements.currentTime.textContent = formatTime(current);
}

export const updateVolume = () => {
  console.log(elements.volumeProgress.style.height)
    elements.volumeProgress.style.height = elements.player.volume * 100 + '%';
  if(elements.player.volume >= 0.5) {
    elements.speaker.attributes.d.value = 'M14.667 0v2.747c3.853 1.146 6.666 4.72 6.666 8.946 0 4.227-2.813 7.787-6.666 8.934v2.76C20 22.173 24 17.4 24 11.693 24 5.987 20 1.213 14.667 0zM18 11.693c0-2.36-1.333-4.386-3.333-5.373v10.707c2-.947 3.333-2.987 3.333-5.334zm-18-4v8h5.333L12 22.36V1.027L5.333 7.693H0z';  
  } else if(elements.player.volume < 0.5 && elements.player.volume > 0.05) {
    elements.speaker.attributes.d.value = 'M0 7.667v8h5.333L12 22.333V1L5.333 7.667M17.333 11.373C17.333 9.013 16 6.987 14 6v10.707c2-.947 3.333-2.987 3.333-5.334z';
  } else if(elements.player.volume <= 0.05) {
    elements.speaker.attributes.d.value = 'M0 7.667v8h5.333L12 22.333V1L5.333 7.667';
  }
}

export const getRangeBox = event => {
  let rangeBox = event.target;
  let el = currentlyDragged;
  if(event.type == 'click' && isDraggable(event.target)) {
    rangeBox = event.target.parentElement.parentElement;
  }
  if(event.type == 'mousemove') {
    rangeBox = el.parentElement.parentElement;
  }
  return rangeBox;
}

export const getCoefficient = event => {
  let slider = getRangeBox(event);
  let rect = slider.getBoundingClientRect();
  let K = 0;
  if(slider.dataset.direction == 'horizontal') {

    let offsetX = event.clientX - slider.offsetLeft;
    let width = slider.clientWidth;
    K = offsetX / width;    
    
  } else if(slider.dataset.direction == 'vertical') {
    
    let height = slider.clientHeight;
    let offsetY = event.clientY - rect.top;
    K = 1 - offsetY / height;
    
  }
  return K;
}





export const formatTime = time => {
  let min = Math.floor(time / 60);
  let sec = Math.floor(time % 60);
  return min + ':' + ((sec<10) ? ('0' + sec) : sec);
}

export const togglePlay = () => {
  if(elements.player.paused) {
    elements.playPause.attributes.d.value = "M0 0h6v24H0zM12 0h6v24h-6z";
    elements.player.play();
  } else {
    elements.playPause.attributes.d.value = "M18 12L0 24V0";
    elements.player.pause();
  }  
}

export const makePlay = () => {
    elements.playpauseBtn.style.display = 'block';
    elements.loading.style.display = 'none';
}

export const directionAware = () => {
  if(window.innerHeight < 250) {
    elements.volumeControls.style.bottom = '-54px';
    elements.volumeControls.style.left = '54px';
  } else if(elements.audioPlayer.offsetTop < 154) {
    elements.volumeControls.style.bottom = '-164px';
    elements.volumeControls.style.left = '-3px';
  } else {
    elements.volumeControls.style.bottom = '52px';
    elements.volumeControls.style.left = '-3px';
  }
}



export const activateMusicInterface = (e) => {
  elements.audioInterFace.style.display = 'block';
  togglePlay();
  console.log(source.src)
}
export const shotDownMusicInterface = data => {
  elements.audioInterFace.style.display = 'none';

}

export const clearPreviewPlayer = () => {
  const player = document.querySelector('.now-playing');
  if(player) player.parentElement.removeChild(player);
}

export const renderPreviewPlayer = e => {

   const markup = `
   <div class="now-playing" role="complementary">
<div class="holder">
    <div class="audio green-audio-player">

      <div class="loading">
        <div class="spinner"></div>
      </div>
      
      <div class="play-pause-btn">  
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="24" viewBox="0 0 18 24">
          <path fill="#566574" fill-rule="evenodd" d="M18 12L0 24V0" class="play-pause-icon" id="playPause"/>
        </svg>
      </div>
  
      <div class="controls">
        <span class="current-time">0:00</span>
        <div class="slider" data-direction="horizontal">
          <div class="progress">
            <div class="pin" id="progress-pin" data-method="rewind"></div>
          </div>
        </div>
        <span class="current-title">Preview of: Rammstein</span>

        <span class="total-time">0:00</span>
      </div>
  
      <div class="volume">
        <div class="volume-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="#566574" fill-rule="evenodd" d="M14.667 0v2.747c3.853 1.146 6.666 4.72 6.666 8.946 0 4.227-2.813 7.787-6.666 8.934v2.76C20 22.173 24 17.4 24 11.693 24 5.987 20 1.213 14.667 0zM18 11.693c0-2.36-1.333-4.386-3.333-5.373v10.707c2-.947 3.333-2.987 3.333-5.334zm-18-4v8h5.333L12 22.36V1.027L5.333 7.693H0z" id="speaker"/>
          </svg>
        </div>
        <div class="volume-controls hidden">
          <div class="slider" data-direction="vertical">
            <div class="progress volume-progress">
              <div class="pin" id="volume-pin" data-method="changeVolume"></div>
            </div>
          </div>
        </div>
      </div>
  
      <audio crossorigin>
        <source src=${e.target.dataset.link} type="audio/mpeg">
      </audio>
    </div>
    
  </div>

  <button class="preview-close">&#10060;</button>
</div> `;

elements.mainContainer.insertAdjacentHTML('afterbegin', markup);





  //  window.addEventListener('mousedown', function(event) {
  //   if(!playerView.isDraggable(event.target)) return false;
  //   currentlyDragged = event.target;
  //   let handleMethod = currentlyDragged.dataset.method;
  //   this.addEventListener('mousemove', window[handleMethod], false);
  //   window.addEventListener('mouseup', () => {
  //       currentlyDragged = false;
  //     window.removeEventListener('mousemove', window[handleMethod], false);
  //   }, false);  
  // });

console.log(elements.playpauseBtn)
//   elements.playpauseBtn.addEventListener('click', playerView.togglePlay);

//   elements.player.addEventListener('timeupdate', playerView.updateProgress);
//   elements.player.addEventListener('volumechange', playerView.updateVolume);

//   elements.player.addEventListener('loadedmetadata', () => {
//       elements.totalTime.textContent = playerView.formatTime(elements.player.duration);
//   });
//   elements.player.addEventListener('canplay', playerView.makePlay);
//   elements.player.addEventListener('ended', function(){
//     elements.playPause.attributes.d.value = "M18 12L0 24V0";
//     elements.player.currentTime = 0;
//   });
  
//   elements.volumeBtn.addEventListener('click', () => {
//     elements.volumeBtn.classList.toggle('open');
//     elements.volumeControls.classList.toggle('hidden');
//   })
  
// //   window.addEventListener('resize', playerView.directionAware);
//   elements.sliders.forEach(slider => {
//     let pin = slider.querySelector('.pin');
//     // slider.addEventListener('click', window[pin.dataset.method]);
//     slider.addEventListener('click', clickhandler);
//    function clickhandler(e){
//        window[pin.dataset.method](e)
//    }
//   });
}