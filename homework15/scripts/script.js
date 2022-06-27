const up = document.querySelector('button[name="up"]');
const left = document.querySelector('button[name="left"]');
const down = document.querySelector('button[name="down"]');
const right = document.querySelector('button[name="right"]');
const area = document.querySelector('div.area');
const columnsInput = document.querySelector('input[name="columns"]');
const rowsInput = document.querySelector('input[name="rows"]');
const obstaclesInput = document.querySelector('input[name="obstacles"]');
const generateButton = document.querySelector('input[type="button"]');
const moveDiv = document.createElement('div');
moveDiv.className = 'move';
const finishDiv = document.createElement('div');
finishDiv.className = 'finish';
let columnsAmount;
let rowsAmount;
let obstaclesAmount;
let objectsAmount = [];
let gridContainer = [];
let gridActiveElement;
let activeGridArrayIndex;
const keyNames = ['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown']

function createFreeAreas() {
    objectsAmount.forEach((item, index) => {
        const freeDivs = document.createElement('div');
        freeDivs.className = `free free-${index + 1}`;
        area.appendChild(freeDivs);
    });

    const startIndex = getRandomInt(objectsAmount.length - 1)
    objectsAmount = objectsAmount.filter(item => item !== startIndex)
    area.querySelector(`.free-${startIndex}`).className += ' move'

    gridContainer.forEach(item => {
        item.forEach((element) => {
            if (element === `free-${startIndex}`) {
                gridActiveElement = element;
            }
        })
    })

    const finishIndex = getRandomInt(objectsAmount.length - 1)
    objectsAmount = objectsAmount.filter(item => item !== finishIndex)
    area.querySelector(`.free-${finishIndex}`).className += ' finish'


    for (let i = 1; i <= obstaclesAmount; i++) {
        const index = getRandomInt(objectsAmount.length - 1)
        objectsAmount = objectsAmount.filter(item => item !== index)
        area.querySelector(`.free-${index}`).className += ' obstacle'
    }

}

function getRandomInt(max) {
    return objectsAmount[Math.floor(Math.random() * (max + 1))]; //Максимум не включается, минимум включается
}

columnsInput.addEventListener('change', (ev) => {
    columnsAmount = ev.target.value; 
    
});

rowsInput.addEventListener('change', (ev) => {
    rowsAmount = ev.target.value; 
    
});

obstaclesInput.addEventListener('change', (ev) => {
    obstaclesAmount = ev.target.value; 
    
});

generateButton.addEventListener('click', () => {
    if ((rowsAmount * columnsAmount) - 2 > obstaclesAmount) {
        objectsAmount = []
        let inc = 1;
        for (let i = 0; i < columnsAmount; i++) {
            gridContainer[i] = [];
            for (let j = 0; j < rowsAmount; j++){
                gridContainer[i][j] = `free-${inc}`;
                inc++;
            }
        }
        for (let i = 1; i <= columnsAmount * rowsAmount; i++) {
            objectsAmount.push(i)
        }


        area.innerHTML = ""

        area.style.gridTemplateColumns = `repeat(${columnsAmount}, 1fr)`;
        area.style.gridTemplateRows = `repeat(${rowsAmount}, 1fr)`;

        createFreeAreas();

    } else {
        throw Error()
    }
});


up.addEventListener('click', () => {

});

down.addEventListener('click', () => {

});
    
left.addEventListener('click', () => {

});
    
right.addEventListener('click', () => {

});

function moveRect(e){
    if (keyNames.includes(e.key)) {
        gridContainer.forEach((item, index) => {
            if (item.find((element) => element === gridActiveElement)){
                activeGridArrayIndex = [index];
            }
        })
        const activeElement = document.querySelector('.move');
        const activeIndexElement = parseInt(activeElement.className.replace(/[^\d]/g, ''))
        let isElementAfterObstacleInSameArray = false;
        const nextElement = document.querySelector(`.free-${getNextElementMove(e.key, activeIndexElement)}`)
        if (isObstacle(nextElement.className)) {
            isElementAfterObstacleInSameArray = gridContainer[activeGridArrayIndex].includes(`free-${getNextElementMove(e.key, getNextElementMove(e.key, activeIndexElement))}`);
        }
        if ((rightLeftButtonsPressed(e.key)
            && gridContainer[activeGridArrayIndex].includes(`free-${getNextElementMove(e.key, activeIndexElement)}`))) {
            if (isObstacle(nextElement.className)) {
                return isElementAfterObstacleInSameArray ? moveElement(activeElement, activeIndexElement, e.key) : null;
            }
        }
        moveElement(activeElement, activeIndexElement, e.key);

    }
}

function moveElement(activeElement, nextIndexElement, action) {
    nextIndexElement = getNextElementMove(action, nextIndexElement)
    const nextEl = document.querySelector(`.free-${nextIndexElement}`)
    if (nextEl) {

        if (nextEl.className.includes('finish')) {
            nextEl.className = takeOnlyIndexClass(nextEl.className) + ' move';
            activeElement.className = takeOnlyIndexClass(activeElement.className)
            setTimeout(() => {
                generateButton.click();
                return alert('you won')                
            }, 100)
        }

        if (isObstacle(nextEl.className)) {
            if (moveObstacle(action, nextIndexElement)) {
                gridActiveElement = takeOnlyIndexClass(nextEl.className).split(' ')[1]
                nextEl.className = takeOnlyIndexClass(nextEl.className) + ' move';
            } else {
                return false;
            }
        } else {
            gridActiveElement = takeOnlyIndexClass(nextEl.className).split(' ')[1]
            nextEl.className = takeOnlyIndexClass(nextEl.className) + ' move';
        }

        activeElement.className = takeOnlyIndexClass(activeElement.className)
    }
}

function getNextElementMove(action, nextIndexElement) {
    switch (action) {
        case 'ArrowLeft':
            return nextIndexElement - 1;
        case 'ArrowUp':
            return nextIndexElement -= Number(rowsAmount);
        case 'ArrowRight':
            return nextIndexElement + 1;
        case 'ArrowDown':
            return nextIndexElement += Number(rowsAmount);
    }
}

function moveObstacle(action, nextIndexElement) {
    nextIndexElement = getNextElementMove(action, nextIndexElement)
    let elementAfterObstacle = document.querySelector(`.free-${nextIndexElement}`)
    if (elementAfterObstacle && !isObstacle(elementAfterObstacle?.className)) {
        elementAfterObstacle.className = takeOnlyIndexClass(elementAfterObstacle.className) + ' obstacle';
        return true;
    } return false;
}

function takeOnlyIndexClass(className) {
    return className.split(/(\d+)/)[0] + className.split(/(\d+)/)[1]
}

function isObstacle(className) {
    return className.includes('obstacle');
}

function rightLeftButtonsPressed(key) {
    return key === 'ArrowLeft' || key === 'ArrowRight';
}

addEventListener("keydown", moveRect);
