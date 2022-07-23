const numberInput = document.querySelector('input[name="item-number"]');
const searchButton = document.querySelector('button#search');
const errorText = document.querySelector('p#error');
const resultDiv = document.querySelector('div.request-result');
let maxValue;
let result;
let itemNumber;


async function getMaxValue(){
    let info = await axios.get('https://swapi.dev/api/planets/');
    maxValue = +info.data.count
}
getMaxValue();

const init = async function(){
    resultDiv.innerHTML = `<h3>Search result:</h3>`
    let allData = await axios.get(`https://swapi.dev/api/planets/${itemNumber}`);
    result = allData.data;
    function water() {
        if (+result.surface_water > 0) {
            return "Да"
        }
        else {
            return "Нет"
        }
    }
    const stringsArr = [];
    stringsArr.push(`Название: ${result.name}`)
    stringsArr.push(`Популяция: ${result.population}`)
    stringsArr.push(`Диаметр: ${result.diameter}`)
    stringsArr.push(`Гравитация:${result.gravity.replace(/[0-9]/g, '')}`)
    stringsArr.push(`Наличие воды: `+ water())
    stringsArr.push(`Территория: ${result.terrain}`)
    stringsArr.push(`Климат: ${result.climate}`)
    stringsArr.push(`Орбитальный период: ${result.orbital_period}`)
    stringsArr.push(`Период вращения: ${result.rotation_period}`)
    stringsArr.forEach( (item) => {
        resultDiv.insertAdjacentHTML('beforeend',`<p>${item}</p>`);
    })    
}

numberInput.addEventListener('change', (ev) => {
    itemNumber = +ev.target.value;
})

searchButton.addEventListener('click', () => {
    if (itemNumber >= 1 && itemNumber <= maxValue) {        
        errorText.style.color = "rgb(99, 98, 98)";        
        init();   
        resultDiv.style.display = 'block';          
    }
    else {
        errorText.style.color = "red";
    }
})

