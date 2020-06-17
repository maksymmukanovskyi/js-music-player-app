export default class Likes{
constructor(){
    this.artistLikes = [];
    this.albumLikes = [];
    this.songLikes = [];

}

addArtistLike(id, title, picture){
     const like = {id, title, picture}
     this.artistLikes.push(like);
     this.persistData('artistLikes', this.artistLikes);
     return like;
};
addAlbumLike(id, title, picture){
    const like = {id, title, picture}
    this.albumLikes.push(like);
    this.persistData('albumLikes', this.albumLikes);
    return like;
};
addSongLike(id, title, picture){
    const like = {id, title, picture}
    this.songLikes.push(like);
    this.persistData('songLikes', this.songLikes);
    return like;
};

removeLike(activeArray, id){
const index = activeArray.findIndex(el => el.id === id);
activeArray.splice(index, 1);
if(activeArray == this.artistLikes){
    this.persistData( 'artistLikes' , activeArray);
}else if(activeArray == this.albumLikes){
    this.persistData( 'albumLikes' , activeArray);
}else if(activeArray == this.songLikes){
    this.persistData( 'songLikes' , activeArray);
}
};

isLiked(activeArray, id){
    return activeArray.findIndex(el => el.id === id) !== -1;
}

// getNumLikes(){

// }

persistData(string, item){
localStorage.setItem(string, JSON.stringify(item));
}

// readStorageData(){

// }



}