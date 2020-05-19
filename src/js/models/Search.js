import axios from 'axios';

export default class Search{
    constructor(query){
        this.query = query;
    }
    async getResults(){
        try{
            const result = await axios(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${this.query}`);

            this.musicSearch = result;
            console.log('te sho shukau', this.musicSearch)

        }catch(error){
            alert(error)
        }
    }

    async getBtnResult(type){
        try{
            const result = await axios(`https://cors-anywhere.herokuapp.com/${this.musicSearch.data.}${type}`);
        this.musicSearch = result;
        console.log('type result', this.musicSearch);

            }catch(error){
            alert(error)
        }
    }

   

}