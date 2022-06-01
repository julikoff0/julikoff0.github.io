
const moveBlock = document.querySelector("div.move");
const up = document.querySelector('button[name="up"]');
const left = document.querySelector('button[name="left"]');
const down = document.querySelector('button[name="down"]');
const right = document.querySelector('button[name="right"]');
let topValue;
let leftValue;

up.addEventListener('click', () => {
    topValue = Number(getComputedStyle(moveBlock).getPropertyValue('top').replace(/[\D]+/g, ''))
    if (topValue > 0) {
        moveBlock.style.top = (topValue - 25) + 'px';
        return;
    }
}); 

down.addEventListener('click', () => {
    topValue = Number(getComputedStyle(moveBlock).getPropertyValue('top').replace(/[\D]+/g, ''))
    if (topValue < 650) {
        moveBlock.style.top = (topValue + 25) + 'px';
        return;
    }
}); 
    
left.addEventListener('click', () => {
    leftValue = Number(getComputedStyle(moveBlock).getPropertyValue('left').replace(/[\D]+/g, ''))
    if (leftValue > 0) {
        moveBlock.style.left = (leftValue - 25) + 'px';
        return;
    }
}); 
    
right.addEventListener('click', () => {
    leftValue = Number(getComputedStyle(moveBlock).getPropertyValue('left').replace(/[\D]+/g, ''))
    if (leftValue < 950) {
        moveBlock.style.left = (leftValue + 25) + 'px';
        return;
    }
});

function moveRect(e){
     
    switch(e.key){
         
        case "ArrowLeft":
            leftValue = Number(getComputedStyle(moveBlock).getPropertyValue('left').replace(/[\D]+/g, ''));
            if(leftValue > 0)
                moveBlock.style.left = (leftValue - 25) + 'px';
            break;
        case "ArrowUp":
            topValue = Number(getComputedStyle(moveBlock).getPropertyValue('top').replace(/[\D]+/g, ''));
            if(topValue > 0)
                moveBlock.style.top = (topValue - 25) + 'px';
            break;
        case "ArrowRight":
            leftValue = Number(getComputedStyle(moveBlock).getPropertyValue('left').replace(/[\D]+/g, ''));
            if(leftValue < 950)
                moveBlock.style.left = (leftValue + 25) + 'px';
            break;
        case "ArrowDown":
            topValue = Number(getComputedStyle(moveBlock).getPropertyValue('top').replace(/[\D]+/g, ''));
            if(topValue < 650)
                moveBlock.style.top = (topValue + 25) + 'px';
            break;
    }
}
 
addEventListener("keydown", moveRect);