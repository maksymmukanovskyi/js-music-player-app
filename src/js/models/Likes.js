export default class Likes{
constructor(){
    this.artistLikes = [];
    this.albumtLikes = [];
    this.songLikes = [];

}

addArtistLike(id, title, picture){
     const like = {id, title, picture}
     this.artistLikes.push(like);
     this.persistData();
     return like;
};
addAlbumLike(id, title, picture){
    const like = {id, title, picture}
    this.likes.push(like);
    this.persistData();
    return like;
};
addSongLike(id, title, picture){
    const like = {id, title, picture}
    this.likes.push(like);
    this.persistData();
    return like;
};

// removeLike(){

// };

isLiked(id){
    return this.artistLikes.findIndex(el => el.id === id) !== -1;
}

// getNumLikes(){

// }

persistData(){
localStorage.setItem('artistLikes', JSON.stringify(this.likes));
}

// readStorageData(){

// }



}