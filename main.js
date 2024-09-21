const ul = document.getElementById('list-planets')

const fetchPlanets = () => {
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
                          <button
                            onClick="fetchSinglePlanet(${index})"
                            class="btn btn-primary"
                            >
                            See More
                            </button>
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
  fetch(url)
    .then((data) => data.json())
    .then((response) => {
      renderPlanet(response)
      renderPeople(response)
  })
}

const fetchByName = async () => {
  const text = document.getElementById('search-input').value;
  let url = `https://swapi.dev/api/planets/`
  let planetDiscovery = false;
  while (url && !planetDiscovery) {
    const response = await fetch(url);
    const data = await response.json();
    const planet = data.results
      .find((plan) => plan.name.toLowerCase() === text.toLowerCase());
    if (planet) {
      renderPlanet(planet);
      renderPeople(planet)
      planetDiscovery = true;
    } else {
      url = data.next; 
      if (!url) {
        window.alert('Planet not found!')
      }
    }
  }
}

const renderPlanet = (planet) => {
  ul.innerHTML = ''; 
  const li = document.createElement('li');
  const card = `
                <div id="single-planet">
                  <h1>${planet.name}</h1>
                  <p>Climate: ${planet.climate}</p>
                  <p>Population: ${planet.population}</p>
                  <p>Terrain: ${planet.terrain}</p>
                  <button onClick="fetchPlanets()">See List of Planets</button>
                </div>
              `
  li.innerHTML = card;
  ul.appendChild(li)
}

const renderPeople = (planet) => {
  const div = document.getElementById('single-planet');
  const h2 = document.createElement('h2')
  const newContainer = document.createElement('div')
  newContainer.setAttribute('class', 'card-info-people')
  h2.innerText = "Illustrious inhabitants"
  div.appendChild(h2);
  planet.residents.forEach((people) => {
  fetch(people)
    .then((data) => data.json())
    .then((response) => {
      const divPeoples = document.createElement('div')
      divPeoples.setAttribute('class', 'people-card' )
      const text = `
                    <h3>${response.name}</h3>
                    <p>Birth Year: ${response.birth_year}</p>
                    `
     divPeoples.innerHTML = text;
     newContainer.appendChild(divPeoples)
    })
  })
  div.appendChild(newContainer)
}

window.onload = () => {
    fetchPlanets()
}