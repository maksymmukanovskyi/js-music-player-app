export default class Likes{
constructor(){
    this.artistLikes = [];
    this.albumtLikes = [];
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
    this.albumtLikes.push(like);
    this.persistData('albumtLikes', this.albumtLikes);
    return like;
};
addSongLike(id, title, picture){
    const like = {id, title, picture}
    this.songLikes.push(like);
    this.persistData('songLikes', this.songLikes);
    return like;
};

// removeLike(){

// };

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