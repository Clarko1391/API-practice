// Selectors
const newCases = document.getElementById('newCases');
const activeCases = document.getElementById('activeCases');
const recoveredCases = document.getElementById('recoveredCases');
const countryName = document.getElementById('countryName');

//display date and time
document.getElementById('dateTime').innerHTML = new Date().toUTCString();

//call API to populate global values before user input
fetch('https://api.covid19api.com/summary')
    .then(response => {
        if (response.ok) {
            response = response.json()
            .then(response => {
                let globalStats = response.Global;
                newCases.innerHTML = globalStats.NewConfirmed;
                activeCases.innerHTML = globalStats.TotalConfirmed - globalStats.TotalRecovered;
                recoveredCases.innerHTML = globalStats.TotalRecovered;
            });
        } else {
            console.log('Error, please try again');
        }
    });

//Create a variable from user Input
document.getElementById('enterCountry').addEventListener('click', function() {getCountry()});
let getCountry = () => {
    let liveDateTo = new Date().toISOString().split('');
    liveDateTo.splice(-5, 4);
    liveDateTo = liveDateTo.join('')
    let liveDateFrom = new Date().toISOString().split('');
    liveDateFrom.splice(-13, 13);
    liveDateFrom.push('00:00:00Z');
    liveDateFrom = liveDateFrom.join('')
    let countryInput = document.getElementById('countryInput').value.toLowerCase();
    let url = `https://api.covid19api.com/live/country/${countryInput}/status/confirmed/date/2020-05-06T00:00:00Z`
    fetch(url)
        .then(response => {
            if (response.ok) {
                response = response.json()
                .then(response => {
                    // let countryStats = response.Countries.name;
                    console.log(response);
                    // console.log(countryStats);
                });
            } else { 
                alert('please check country name and try again');
            }
        });
}

