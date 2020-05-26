import axios from 'axios';

export default class Search{
    constructor(query){
        this.query = query;
        this.activeTab = "artist";
    }
    async getResults(){
        try{
            const result = await axios(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${this.query}`);

            this.musicSearch = result;
            

        }catch(error){
            alert(error)
        }
    }
    async getDefaultLoad(){
        try {
            const result = await axios(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/track?q=top music`);
            this.musicSearch = result;
        }catch(error){
            alert(error)
        }
    }

    async getBtnResult(type){
        try{
            let link; 
            type === 'next'? link = this.musicSearch.data.next: link = this.musicSearch.data.prev

            const result = await axios(`https://cors-anywhere.herokuapp.com/${link}`);  
            this.musicSearch = result;

            }catch(error){
            alert(error)
        }
    }
}


