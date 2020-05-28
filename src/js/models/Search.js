import axios from 'axios';

export default class Search{
    constructor(query){
        this.query = query;
        this.activeTab = "artist";
    }
    async getResults(){
        try{
            const result = await axios(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${this.query}`);
            this.artistSearch = result;
            this.albumSearch = result;
            this.musicSearch = result;

        }catch(error){
            alert(error)
        }
    }
    async getDefaultLoad(){
        try {
            const result = await axios(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/track?q=music`);
            this.artistSearch = result;
            this.albumSearch = result;
            this.musicSearch = result;
        }catch(error){
            alert(error)
        }
    }

    async getMusicBtnResult(type){
        try{
            let link; 
            type === 'next'? link = this.musicSearch.data.next: link = this.musicSearch.data.prev

            const result = await axios(`https://cors-anywhere.herokuapp.com/${link}`);  
            this.musicSearch = result;
            }catch(error){
            alert(error)
        }
    }

    async getAlbumBtnResult(type){
        try{
            let link; 
            type === 'next'? link = this.albumSearch.data.next: link = this.albumSearch.data.prev
            const result = await axios(`https://cors-anywhere.herokuapp.com/${link}`);  
            this.albumSearch = result;
            }catch(error){
            alert(error)
        }
    }
    async getArtistBtnResult(type){
        try{
            let link; 
            type === 'next'? link = this.artistSearch.data.next: link = this.artistSearch.data.prev
            const result = await axios(`https://cors-anywhere.herokuapp.com/${link}`);  
            this.artistSearch = result;
            }catch(error){
            alert(error)
        }
    }
}


