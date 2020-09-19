// Selectors
const newCases = document.getElementById('newCases');
const activeCases = document.getElementById('activeCases');
const recoveredCases = document.getElementById('recoveredCases');
const countryName = document.getElementById('countryName');

//display date and time
document.getElementById('dateTime').innerHTML = new Date();

//call API to populate global values before user input
fetch('https://api.covid19api.com/summary')
// summary returns an object called 'Global' which contains current stats for the whole world
    .then(response => {
        if (response.ok) {
            response = response.json()
            .then(response => {
// Before user interacts with site, display current global stats from response.Global.'desired-value'
                let globalStats = response.Global;
                newCases.innerHTML = globalStats.NewConfirmed;
                activeCases.innerHTML = globalStats.TotalConfirmed - globalStats.TotalRecovered - globalStats.TotalDeaths;
                recoveredCases.innerHTML = globalStats.TotalRecovered;
            });
        } else {
            console.log('Error, please try again');
        }
    });

//Create a variable from user Input and use it to fetch specific country data
document.getElementById('enterCountry').addEventListener('click', function() {getCountry()});
let getCountry = () => {
    fetch('https://api.covid19api.com/summary')
// summary returns an object called 'Countries' which contains an array of 100+ country names and stats
        .then(response => {
            if (response.ok) {
                response = response.json()
                .then(response => {
// Using the returned object, parse through and find the response.Countries['index position'].Slug value which matches the user input, then display those values
                    let countryInput = document.getElementById('countryInput').value.toLowerCase().replace(' ', '-');
                    let countryStats = response.Countries;
                    countryStats.forEach(country => {
                        if (country.Slug == countryInput) {
                            countryName.innerHTML = country.Country;
                            newCases.innerHTML = country.NewConfirmed;
                            activeCases.innerHTML = country.TotalConfirmed - country.TotalRecovered - country.TotalDeaths;
                            recoveredCases.innerHTML = country.TotalRecovered;
                        }
                    })
                });
            } else {
                console.log('Error, please try again');
            }
        });
}