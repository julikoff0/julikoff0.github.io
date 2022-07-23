const moment = require('moment');
const axios = require('axios');
const fs = require('fs/promises');
let whatTimeNow;
let path;

const timeNow = async () => {
    whatTimeNow = await moment().format("X");
    path =`./logs/${whatTimeNow}.log`
    let reqData = await axios.get(`https://swapi.dev/api/planets/3`);
    fs.mkdir(`${__dirname}/logs`);
    fs.writeFile(path, JSON.stringify(reqData.data), 'utf8');
    console.log(fs.readFile(path, 'utf8'));       
};

timeNow()