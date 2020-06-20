

export const toggleLikeBtn = (isLiked, target) => {
    console.log('targ', isLiked)
    const iconString = isLiked? 'icon-heart' : 'icon-heart-outlined';
    // document.querySelector('.header__likes use').setAttribute('href', `./sprite.svg#${iconString}`)
    target.children[0].setAttribute('href', `./sprite.svg#${iconString}`)

    
}


// , .music__love__tracks use