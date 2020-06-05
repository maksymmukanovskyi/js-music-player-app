export default class Likes{
constructor(){
    this.artistLikes = [];
    this.albumtLikes = [];
    this.songLikes = [];

}

addLike(id, title, picture){
     const like = {id, title, picture}
     this.likes.push(like);
     this.persistData();
     return like;
};

// removeLike(){

// };

isLiked(id){
    return this.likes.findIndex(el => el.id === id) !== -1;
}

// getNumLikes(){

// }

persistData(){
localStorage.setItem('likes', JSON.stringify(this.likes));
}

// readStorageData(){

// }



}