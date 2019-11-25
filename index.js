
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


//Get the arguments we need (2 {country} and 3 {year})
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
    const spinner = ora('Je cherche quels jours tu pourras glander').start();
    setTimeout(rqtAxios, 4000);

    function rqtAxios() {
        let url = `https://date.nager.at/api/v2/publicholidays/${year}/${countryID}`;
        axios({
                method: 'get',
                url: url
            })
            .then(function (response) {
                // Sucess
                // Stop the loading animation
                spinner.stop();
                // Display the list of element {date - name}
                for (let i = 0; i < response.data.length; i++) {
                    // chalk.blue put in blue the text
                    let text = `${chalk.white(response.data[i].date)} - ${chalk.red(response.data[i].localName)}`;
                    console.log(chalk.magenta(boxen(`${text}`, {padding: 1, margin: 1, borderStyle: 'round'})));
                }
            }).catch(function (response) {
                console.log("error");
                console.log(response.status);
            });
    }
}
