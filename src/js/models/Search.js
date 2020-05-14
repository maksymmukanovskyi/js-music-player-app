import axios from 'axios';

export default class Search{
    constructor(query){
        this.query = query;
    }
    async getResults(){
        try{
            const result = await axios(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${this.query}`);

            this.musicSearch = result;

        }catch(error){
            alert(error)
        }
    }
}