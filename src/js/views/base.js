export const elements = {
    searchInput: document.querySelector('.search__input'),
    searchForm: document.querySelector('.search__form'),
    searchContent: document.querySelector('.content'),
    musicMainBox: document.querySelector('.main'),
    mainContainer: document.querySelector('.container'),
    artistTitle: document.querySelector('.artist-title'),
    cardContainer: document.querySelectorAll('.card-container'),
    songList:document.querySelector('.songs-list'),
    listType:document.querySelector('.chart-list'),
    musicContainer:document.querySelector('.music__view')
}

export const timeConvert = num =>{ 
  var min = Math.floor(num / 60);  
  var sec = num % 60;
  return min + ":" + sec;         
}

export const limitString = (string , limit = 15) => {
  const newString = [];
  if(string.length > limit){
    string.split(' ').reduce((acc, el) => {
      if(acc + el.length < limit){
        newString.push(el);
      }
      return acc + el.length;
    }, 0)
    return  `${newString.join(' ')}...`
  }
  return string;
}

export const elementString = {
    loader: 'scene',
}

export const musicPlayList = music => `
<li class="songs-item">
    <a class="songs-link" href="#${music.artist.id}">
    <figure class="songs-item__figure">
         <button class="play">&#x23ef;</button>
        <figcaption class="songs-item__discription" >
             <div class="discription__left-part">
                 <p class="songs-item__music-name">${limitString(music.title)}</p>
                <p class="songs-item__singer">${music.artist.name}</p>
            </div>
            <p class="songs-item__music-time">${timeConvert(music.duration)}</p>
        </figcaption>
    </figure>
</a>
</li>
`;

export const renderLoader = parent => {
    const loader = `
    <div class = "${elementString.loader}">
    <svg 
    version="1.1" 
    id="dc-spinner" 
    xmlns="http://www.w3.org/2000/svg" 
    x="0px" y="0px"
    width:"38"
    height:"38"
    viewBox="0 0 38 38" 
    preserveAspectRatio="xMinYMin meet"
    >
    <text x="14" y="21" font-family="Monaco" font-size="2px" style="letter-spacing:0.6" fill="grey">LOADING
       <animate 
         attributeName="opacity"
         values="0;1;0" dur="1.8s"
         repeatCount="indefinite"/>
    </text>
    <path fill="#373a42" d="M20,35c-8.271,0-15-6.729-15-15S11.729,5,20,5s15,6.729,15,15S28.271,35,20,35z M20,5.203
      C11.841,5.203,5.203,11.841,5.203,20c0,8.159,6.638,14.797,14.797,14.797S34.797,28.159,34.797,20
      C34.797,11.841,28.159,5.203,20,5.203z">
    </path>
  
    <path fill="#373a42" d="M20,33.125c-7.237,0-13.125-5.888-13.125-13.125S12.763,6.875,20,6.875S33.125,12.763,33.125,20
      S27.237,33.125,20,33.125z M20,7.078C12.875,7.078,7.078,12.875,7.078,20c0,7.125,5.797,12.922,12.922,12.922
      S32.922,27.125,32.922,20C32.922,12.875,27.125,7.078,20,7.078z">
    </path>
  
    <path fill="#2AA198" stroke="red" stroke-width="0.6027" stroke-miterlimit="10" d="M5.203,20
              c0-8.159,6.638-14.797,14.797-14.797V5C11.729,5,5,11.729,5,20s6.729,15,15,15v-0.203C11.841,34.797,5.203,28.159,5.203,20z">
    <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 20 20"
          to="360 20 20"
          calcMode="spline"
          keySplines="0.4, 0, 0.2, 1"
          keyTimes="0;1"
          dur="2s"
          repeatCount="indefinite" />      
     </path>
  
    <path fill="#859900" stroke="white" stroke-width="0.2027" stroke-miterlimit="10" d="M7.078,20
    c0-7.125,5.797-12.922,12.922-12.922V6.875C12.763,6.875,6.875,12.763,6.875,20S12.763,33.125,20,33.125v-0.203
    C12.875,32.922,7.078,27.125,7.078,20z">
     <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 20 20"
        to="360 20 20"
        dur="1.8s"  
        repeatCount="indefinite" />
      </path>
    </svg>
    </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
}

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementString.loader}`);
    if(loader) loader.parentElement.removeChild(loader);
}