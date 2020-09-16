document.getElementById('jokeBtn').addEventListener('click', getJoke);
const jokeText = document.getElementById('joke');

function getJoke() {   
    fetch("https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "matchilling-chuck-norris-jokes-v1.p.rapidapi.com",
            "x-rapidapi-key": "bcc5916f3fmsh7a7008a40588716p13011fjsn1915a9686573",
            "accept": "application/json"
        }
    })
        .then(response => response.json())
        .then(data => {
            return jokeText.innerHTML = data.value;
        })
        .catch(err => {
        console.log(err)
        });
}