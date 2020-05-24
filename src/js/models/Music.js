import axios from 'axios';

export default class Music{
    constructor(id){
        this.id = id;
    }

    async getArtist(){
        try{
            const result = await axios(`https://api.deezer.com/artist/${this.id}`);
            const tracks = await axios(`https://cors-anywhere.herokuapp.com/${result.tracklist}`)
            this.title = result.name;
            this.albumNumbers = result.nb_album;
            this.picture = result.picture_xl;
            this.tracklist = tracks.data;
            
        }catch(error){
            alert(error)
        }
    }

    async getAlbum(){
        try{

        }catch(error){

        }
    }

}