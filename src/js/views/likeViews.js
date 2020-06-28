

export const toggleLikeBtn = (isLiked, target) => {
    const iconString = isLiked? 'icon-heart' : 'icon-heart-outlined';
    // document.querySelector('.header__likes use').setAttribute('href', `./sprite.svg#${iconString}`)
    target.children[0].setAttribute('href', `./sprite.svg#${iconString}`)

    
}

