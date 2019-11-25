
const axios = require('axios');
const {
    getCode,
    getName
} = require('country-list');
const ora = require('ora');
const chalk = require('chalk');
const boxen = require('boxen');
let country = "";
let year = "";

process.argv.forEach((val, index) => {
    if (index === 2) {
        country = val;
    } else if (index === 3) {
        year = val;
    }
});

countryID = getCode(country);
if (year === "") {
    year = new Date().getFullYear();
}

if (countryID != undefined) {
    const spinner = ora('On cherche...').start();
    setTimeout(rqtAxios, 2000);

    function rqtAxios() {
        let url = `https://date.nager.at/api/v2/publicholidays/${year}/${countryID}`;
        axios({
                method: 'get',
                url: url
            })
            .then(function (response) {
                spinner.stop();
                for (let i = 0; i < response.data.length; i++) {
                    let text = `${chalk.white(response.data[i].date)} - ${chalk.red(response.data[i].localName)}`;


                    console.log(chalk.magenta(boxen(`${text}`, {padding: 1, margin: 1, borderStyle: 'double'})));
                }
            }).catch(function (response) {
                console.log("error");
                console.log(response.status);
            });
    }
}
