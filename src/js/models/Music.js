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

    async getTrack(){
        try{
            const result = await axios(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/track/${this.id}`);
            this.artistName = result.data.artist.name;
            this.title = result.data.title;
            this.picture = result.data.album.cover_big;
            this.time = result.data.duration;
            this.originalLink = result.data.link;
            this.preview = result.data.preview;
            this.releaseDate = result.data.release_date;

        }catch(error){
            alert(error)
        }
    }

}