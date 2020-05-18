import axios from 'axios';

export default class Search{
    constructor(query, increment){
        this.query = query;
        this.increment = increment;
    }
    async getResults(){
        try{
            const result = await axios(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${this.query}&index=${this.increment}`);

            this.musicSearch = result;
            console.log(this.musicSearch)

        }catch(error){
            alert(error)
        }
    }
}