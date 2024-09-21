const fetchPlanets = () => {
    const ul = document.getElementById('list-planets')

    fetch('https://swapi.dev/api/planets/')
        .then((data) => data.json())
        .then((response) => {
            response.results.forEach((planet) => {
                const li = document.createElement('li');
                const card = `<div class="card">
                                <div class="header">
                                ${planet.name}
                                </div>
                                <div class="body">
                                <button class="btn btn-primary">See More</button>
                                </div>
                              </div>`
                li.innerHTML = card;
                ul.appendChild(li);
            })
        })
}

window.onload = () => {
    fetchPlanets()
}