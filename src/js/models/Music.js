import axios from 'axios';

export default class Music{
    constructor(id){
        this.id = id;
    }
    async getArtist(){
        try{
            const result = await axios(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/${this.id}`);

            const tracks = await axios(`https://cors-anywhere.herokuapp.com/${result.data.tracklist}`)
            this.title = result.data.name;
            this.albumNumbers = result.data.nb_album;
            this.picture = result.data.picture_xl;
            this.tracklist = tracks.data.data;
    console.log('tracks', result)

            
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