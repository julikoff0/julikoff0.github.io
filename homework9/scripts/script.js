
const textShow = document.querySelector('.show');
const inputField = document.querySelector('input[type="text"]');
const submitBtn = document.querySelector('input[type="button"]')

submitBtn.addEventListener('click', (smt) => {
    let text = inputField.value;
    console.log(text)
    
    if (text) {
        textShow.innerHTML = text;
    }

    else {
        textShow.innerHTML = "You didn`t text anything"
    }
})