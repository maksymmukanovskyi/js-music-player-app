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
            
        }catch(error){
            alert(error)
        }
    };

    async getAlbum(){
        try{
            const result = await axios(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/album/${this.id}`);
            const tracks = await axios(`https://cors-anywhere.herokuapp.com/${result.data.tracklist}`)
            this.title = result.data.title;
            this.picture = result.data.cover_xl;
            this.genre = result.data.genres.data[0].name;
            this.tracksNumber =  result.data.nb_tracks;
            this.tracklist = tracks.data.data;


        }catch(error){
            alert(error)
        }
    }

}