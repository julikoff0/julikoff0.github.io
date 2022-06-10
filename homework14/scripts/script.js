const inputLength = document.querySelector('input[name="length"]');
const inputWidth = document.querySelector('input[name="width"]');
const inputLHeight = document.querySelector('input[name="height"]');
const submitButton = document.querySelector('input[type="button"]');
const result = document.querySelector('h3');
let itemLength;
let itemWidth;
let itemHeight;
let itemVolume;
let item;

inputLength.addEventListener('change', (ev) => {    
    itemLength = +ev.target.value;
    console.log(itemLength);
});

inputWidth.addEventListener('change', (ev) => {    
    itemWidth = +ev.target.value;
    console.log(itemWidth);
});

inputLHeight.addEventListener('change', (ev) => {    
    itemHeight = +ev.target.value;
    console.log(itemHeight);
});

submitButton.addEventListener('click', () => {
    if(itemLength === 0 || itemWidth === 0 || itemHeight === 0 || itemLength === undefined || itemWidth === undefined || itemHeight === undefined) {
        result.style.color = 'red';
        result.innerHTML = 'Введите в поле число больше чем 0 или воспользуйтесь конвертом так как ваш предмет нецелесообразно ложить в коробку, с ув. Администрация';
    }
    else {
        itemVolume = +(itemLength * itemWidth * itemHeight);
    item = [itemLength, itemWidth, itemHeight, itemVolume].sort(function(a,b) {
        return b-a;
    }); 
    if (whichBoxIsFited() === undefined || whichBoxIsFited() === null) {
        result.style.color = "red";
        result.innerHTML = "К сожалению ни одна коробка из тех что есть в наличии вам не подходит"
    }
    else {
        let boxCost = whichBoxIsFited()[0] / 100 + "грн.";
        result.style.color = 'green';
        result.innerHTML = `Подходящая для вас коробка есть в наличии и её стоимость ${boxCost}`;
    }
    }
});

function createBox (l, w, h) {
    return [l, w, h, l*w*h].sort(function(a,b) {
        return b-a;
    });
}

const box1 = createBox(3, 3, 3);
const box2 = createBox(10, 10, 10);
const box3 = createBox(15, 15, 15);
const boxes = [box1,box2,box3];

function boxFit (box) {    
    if (item[0] <= box[0] && item[1] <= box[1] && item[2] <= box[2] && item[3] <= box[3]) {
            return true;
        }    
    else {
        return false;
    }
}

function whichBoxIsFited () {
    for (let i = 0; i < boxes.length; i++) {
        if(boxFit(boxes[i])) {
            return boxes[i];            
        }
    }
}