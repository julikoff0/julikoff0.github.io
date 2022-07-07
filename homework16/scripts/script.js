
const linkorCheckbox = document.querySelector('input[name="linkor-in-game"]'); 
const aircraftCheckbox = document.querySelector('input[name="aircraft-in-game"]');
const cruiserCheckbox = document.querySelector('input[name="cruiser-in-game"]');
const boatCheckbox = document.querySelector('input[name="boat-in-game"]');
const shipAmountInput = document.querySelector('input[name="ships-amount"]');
const startBattleButton = document.querySelector('button#start-game');
const fireButton = document.querySelector('button#fire');
const nextMoveButton = document.querySelector('button#next-move');
const shipAmountError = document.querySelector('p#error');
const battleStatictick = document.querySelector('div.battle-statistic');

let clicked = false;

let shipAmount;
let shipAtGunpoint;
const yourTeamDiv = document.querySelector('div.your-team');
const enemyTeamDiv = document.querySelector('div.enemy-team ');
const shotButtons = [];
let yourTeam;
let enemyTeam;
const shipTypes = [];
const linkor = {
    name : 'linkor',
    hp : 250,
    damage : 100,
    energy : 1,
};
const aircraft = {
    name : 'aircraft-carrier',
    hp : 200,
    damage : 75,
    energy : 2,
};
const cruiser = {
    name : 'cruiser',
    hp : 150,
    damage : 50,
    energy : 3
};
const boat = {
    name : 'boat',
    hp : 100,
    damage : 25,
    energy : 4,
};






function isCheckboxChecked(checkbox) {
   return checkbox.checked
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};

function teamShips(arr) {
    arr = new Map()
    for (let i= 1; arr.size < shipAmount; i++) {
        arr.set( i , {...shipTypes[getRandomInt(0, shipTypes.length)]})
    } 
    arr.forEach((value, key) => {
        value.id = key
      })
    return arr;
    };

function yourTeamFilling() {
    yourTeam.forEach( (value) => {
        let your_warship = document.createElement('div');
        your_warship.className = `your-warship ${value.name}`;
        your_warship.id = `your-ship-${value.id}`;
        let img = document.createElement('img');
        img.src = `./images/${value.name}.png`; 
        img.id = `img-${value.id}`;   
        let hp = document.createElement('div');
        hp.className = 'heat-point';
        hp.innerHTML = `${value.hp}`;
        let energy = document.createElement('div');
        energy.className = 'energy';
        energy.innerHTML = `${value.energy}`;
        your_warship.appendChild(img);
        your_warship.appendChild(hp);
        your_warship.appendChild(energy);
        yourTeamDiv.appendChild(your_warship);
    })
};

function enemyTeamFilling() {
    enemyTeam.forEach( (value) => {
        let enemy_warship = document.createElement('div');
        enemy_warship.className = `enemy-warship ${value.name}`;
        enemy_warship.id = `enemy-ship-${value.id}`;
        let img = document.createElement('img');
        img.src = `./images/${value.name}.png`;
        img.id = `img-${value.id}`;
        let button = document.createElement('button');
        button.id = value.id;
        let i = document.createElement('i');
        i.className = 'fa-solid fa-crosshairs';
        i.id = `icon-${value.id}`;
        shotButtons.push(button);
        button.appendChild(i);
        let hp = document.createElement('div');
        hp.className = 'heat-point';
        hp.id = value.id;
        hp.innerHTML = `${value.hp}`;
        let energy = document.createElement('div');
        energy.className = 'energy';
        energy.id = value.id;
        energy.innerHTML = `${value.energy}`;
        enemy_warship.appendChild(img);
        enemy_warship.appendChild(button);
        enemy_warship.appendChild(hp);
        enemy_warship.appendChild(energy);
        enemyTeamDiv.appendChild(enemy_warship);
    })
};

function battleStatictickFilling(text,color) {
    battleStatictick.insertAdjacentHTML ('afterbegin', `<p style='color:${color}'>${text}</p>`);
};

function shipChoosing(id) { 
    clicked = true;    
    let shipId = +id.replace(/[^\d]/g, '')
    if (+shipId !== undefined && +shipId !== null && +shipId !== '') {        
        let icon = document.querySelector(`i#icon-${shipId}`);
        icon.style.color = 'grey'; 
        shipAtGunpoint = enemyTeam.get(+shipId);
        fireButton.style.display = 'block'; 
        nextMoveButton.style.display = 'none';         
    }
};

function yourTeamDeathChecking() {
    if(yourTeam.size === 0) {
        alert("Вы проиграли!");
        window.location.reload()
    }
    else {
        yourTeam.forEach((value, key) => {
            if(value.hp <= 0) {
                yourTeam.delete(key);
                let removalShip = yourTeamDiv.querySelector(`div#your-ship-${key}`)
                removalShip.remove()  
            }
        })
    }    
}

function enemyTeamDeathChecking() {
    if(enemyTeam.size === 0) {
        alert("Вы выиграли!");  
        window.location.reload()      
    }
    else {
        enemyTeam.forEach((value, key) => {
            if(value.hp <= 0) {
                enemyTeam.delete(key);
                let removalShip = enemyTeamDiv.querySelector(`div#enemy-ship-${key}`)
                removalShip.remove()
            }
        })
    }    
}

shipAmountInput.addEventListener('change', (ev) => {
    shipAmount = +ev.target.value;
});

startBattleButton.addEventListener('click', () => {    
    shipTypes.splice(0, shipTypes.length);
    if (isCheckboxChecked(linkorCheckbox)) {
        shipTypes.push({...linkor})
    }
    if (isCheckboxChecked(aircraftCheckbox)) {
        shipTypes.push({...aircraft})
    }
    if (isCheckboxChecked(cruiserCheckbox)) {
        shipTypes.push({...cruiser})
    }
    if (isCheckboxChecked(boatCheckbox)) {
        shipTypes.push({...boat})
    }

    if (shipTypes.length === 0) {
        shipAmountError.innerHTML = '*Выберите хотя бы один тип корабля';
    } 
    else {  
        shipAmountError.innerHTML = '';
        if (+shipAmount !== undefined && +shipAmount !== null && +shipAmount !== '') {
            if (+shipAmount > 0 && +shipAmount <= 8) {                
                shipAmountError.innerHTML = ''; 
                yourTeam = teamShips(yourTeam);
                enemyTeam = teamShips(enemyTeam);

                yourTeamFilling();   
                enemyTeamFilling();

                console.log(yourTeamDiv)
                console.log(enemyTeamDiv)

                startBattleButton.style.display = 'none';
                nextMoveButton.style.display = 'block'
                battleStatictickFilling('Ваш ход...(выберите корабль который хотите атаковать)','green');
                enemyTeamDiv.addEventListener('click' , function (ev) {
                    if(!clicked) {
                        shipChoosing(ev.target.id)
                    }
                })         
            }        
            else {
                shipAmountError.innerHTML = "*Введите целое число от 1 до 8 включительно"
            }
        }
        else {
            shipAmountError.innerHTML = "*Введите целое число от 1 до 8 включительно"
        }   
    }
});

fireButton.addEventListener('click', () => {
    yourTeamDeathChecking();
    enemyTeamDeathChecking();

    let attackingShip = yourTeam.get(getRandomInt(1, +yourTeam.size + 1))
    attackingShip.energy -= 1;

    shipAtGunpoint.hp -= getRandomInt(+attackingShip.damage - 10, +attackingShip.damage + 10);

    battleStatictickFilling(`Ваш корабль №${attackingShip.id}, подбил вражеский корабль №${shipAtGunpoint.id}`,'green')

    let attakingShipDiv = document.querySelector(`div#your-ship-${attackingShip.id}`);
    attakingShipDiv.querySelector('div.energy').innerHTML = +attackingShip.energy;

    let attakedShipDiv = document.querySelector(`div#enemy-ship-${shipAtGunpoint.id}`);
    attakedShipDiv.querySelector('div.heat-point').innerHTML = +shipAtGunpoint.hp;

    yourTeamDeathChecking();
    enemyTeamDeathChecking();

    fireButton.style.display = 'none'; 
    nextMoveButton.style.display = 'block';  
    
    setTimeout(() => {
        let icon = document.querySelector(`i#icon-${shipAtGunpoint.id}`);
        icon.style.color = 'red';
    }, 500)
});

nextMoveButton.addEventListener('click', () => { 
    yourTeamDeathChecking();
    enemyTeamDeathChecking();

    battleStatictickFilling('Ход противника...','red');

    let attackingShip = enemyTeam.get(getRandomInt(1, +enemyTeam.size + 1))
    attackingShip.energy -= 1;

    shipAtGunpoint = yourTeam.get(getRandomInt(1, yourTeam.size))
    shipAtGunpoint.hp -= getRandomInt(+attackingShip.damage - 10, +attackingShip.damage + 10);

    let attakingShipDiv = document.querySelector(`div#enemy-ship-${attackingShip.id}`);
    attakingShipDiv.querySelector('div.energy').innerHTML = +attackingShip.energy;

    let attakedShipDiv = document.querySelector(`div#your-ship-${shipAtGunpoint.id}`);
    attakedShipDiv.querySelector('div.heat-point').innerHTML = +shipAtGunpoint.hp;

    yourTeamDeathChecking();
    enemyTeamDeathChecking();

    fireButton.style.display = 'none'; 
    nextMoveButton.style.display = 'block'; 

    let icon = document.querySelector(`i#icon-${attackingShip.id}`);
    icon.style.color = 'red'; 

    setTimeout(() => {
        battleStatictickFilling(`Корабль противника №${attackingShip.id}, подбил Ваш корабль №${shipAtGunpoint.id}`,'red')
        setTimeout(() => {
            battleStatictickFilling('Ваш ход...(выберите корабль который хотите атаковать)','green');
        }, 500)
    }, 500);

    clicked = false;
    enemyTeamDiv.addEventListener('click' , function (ev) {
        if(!clicked) {
            shipChoosing(ev.target.id)
        }
    }) 
});