const fetchPlanets = () => {
    const ul = document.getElementById('list-planets')
    ul.innerHTML = "";
    fetch('https://swapi.dev/api/planets/')
        .then((data) => data.json())
        .then((response) => {
            response.results.forEach((planet, index) => {
                const li = document.createElement('li');
                const card = `<div class="card">
                                <div class="header">
                                ${planet.name}
                                </div>
                                <div class="body">
                                <button onClick="fetchSinglePlanet(${index})" class="btn btn-primary">See More</button>
                                </div>
                              </div>`
                li.innerHTML = card;
                ul.appendChild(li);
            })
        })
}

const fetchSinglePlanet = (index) => {
    const id = index + 1;
    const url = `https://swapi.dev/api/planets/${id}`;
    const ul = document.getElementById('list-planets')
    fetch(url).then((data) => data.json()).then((response) => {
        ul.innerHTML = ''; 
        const li = document.createElement('li');
        const card = `
                        <div id="single-planet">
                            <h1>${response.name}</h1>
                            <p>Climate: ${response.climate}</p>
                            <p>Population: ${response.population}</p>
                            <p>Terrain: ${response.terrain}</p>
                            <button onClick="fetchPlanets()">See List of Planets</button>
                        </div>
                    `
        li.innerHTML = card;
        ul.appendChild(li)
    })
}

window.onload = () => {
    fetchPlanets()
}