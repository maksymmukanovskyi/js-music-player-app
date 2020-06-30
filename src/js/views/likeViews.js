

export const toggleLikeBtn = (isLiked, target) => {
    const iconString = isLiked? 'icon-heart' : 'icon-heart-outlined';
    // document.querySelector('.header__likes use').setAttribute('href', `./sprite.svg#${iconString}`)
    target.children[0].setAttribute('href', `./sprite.svg#${iconString}`)
}
export const toggleLikesCount = (types, numLikes) => {
    for(let i = 0;i < types.length; i++){
        types[i].style.visibility = numLikes[i] > 0? 'visible': 'hidden';
        if(numLikes[i] > 0)types[i].textContent = numLikes[i];
    }
}

