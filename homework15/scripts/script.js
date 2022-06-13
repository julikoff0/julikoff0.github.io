const textField = document.querySelector('input[type="text"]');
const addButton = document.querySelector('input[type="button"]');
const validationErrorMessage = document.querySelector('.form > p')
const dutyList = document.querySelector('ol');
const controlPanel = document.querySelector('div.controlPanel');
const deleteButton = document.getElementById('delete');
let text;
const dutyArray = [];

textField.addEventListener('change', (ev) => {
    text = ev.target.value;
});

addButton.addEventListener('click', () => {
    if (text === undefined || text === "" || text === null) {
        validationErrorMessage.innerHTML = "*Поле обязательно для заполнения";
    }
    else {
        dutyArray.push(text);
        validationErrorMessage.innerHTML = "";
        function render () {
            dutyList.innerHTML = dutyArray.map(item => {
                return `<li><p>${item}</p> ${controlPanel.innerHTML}</li>`
            }).join('');
        };
        textField.value = "";
        text = '';
        render();
        console.log(dutyArray);
    }
})
    
deleteButton.addEventListener('click', () => {
    console.log("delete");
})