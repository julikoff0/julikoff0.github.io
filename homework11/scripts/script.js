
const closedFridge = document.querySelector('img[class="closed"]');
const openFridge = document.querySelector('img[class="open"]');
const kolbasa = document.querySelector('img[class="kolbasa"]');
const text = document.querySelector('div[class="text"]');
const buttons = document.querySelector('div[class="control-buttons"]');
const searchButton = document.querySelector('button[name="search"]');
const takeButton = document.querySelector('button[name="take"]');
const buyButton = document.querySelector('button[name="buy"]');
const productList = ['kolbasa'];

setTimeout( () => {
    text.style.display = 'flex';
    text.insertAdjacentHTML ('afterbegin', "Чтобы открыть холодильник кликни по нему")
}, 1500);

closedFridge.addEventListener ('click', () => {
    closedFridge.style.display = 'none';
    openFridge.style.display = 'block';
    text.innerHTML = "Холодильник открыт, чтобы закрыть холодильник кликни по нему";
    buttons.style.display = 'flex';
});

openFridge.addEventListener ('click', () => {
    openFridge.style.display  = 'none';
    closedFridge.style.display = 'block';
    text.innerHTML = 'Чтобы открыть холодильник кликни по нему';
    buttons.style.display = 'none';
});

searchButton.addEventListener ('click', () => {
    if (productList[0] === 'kolbasa') {
        console.log ('kolbasa is finded')
        takeButton.style.display = 'block';        
        text.innerHTML = 'Колбаса найдена, нажмите кнопку "Взять", чтобы взять её';
        kolbasa.style.display = "block";
    } else {
        text.innerHTML = 'Колбасы нет в холодильнике, чтобы приобрести её нажми кнопку "Купить"';
        buyButton.style.display = 'block';          
    }
    searchButton.style.display = 'none';
});

takeButton.addEventListener ('click', () => {
    searchButton.style.display = 'block';
    text.innerHTML = 'Вы взяли колбасу, не забудьте закрыть холодильник';
    productList.pop();
    takeButton.style.display = 'none';   
    kolbasa.style.display = "none"; 
});




