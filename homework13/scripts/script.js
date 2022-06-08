const cat = document.querySelector('div.cat');


cat.addEventListener('mouseenter', () => {
    let catPosition = cat.offsetLeft;
    console.log(catPosition)
    if (catPosition === 20) {
        cat.style.left = 1250 + 'px';
    }
    else if (catPosition > 20 && catPosition <= 645) {
        cat.style.left = 0 + 'px';
    }
    else if (catPosition === 1270) {
        cat.style.left = 0 + 'px';
    }
    else if (catPosition < 1270 && catPosition > 645) {
        cat.style.left = 1250 + 'px';
    }
})




