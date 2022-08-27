
const button = document.createElement('button.upload');
const input = document.createElement('form');


button.addEventListener('click', async () => {
    const data = await axios.post('./photo', { photo : input.photo });
    console.log(data);    
})