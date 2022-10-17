const pokeContainer = document.querySelector(".poke-container")
const pokeCount = 150;
const colors = {
    fire: "#FDDFDF",
    grass: "#DEFDE0",
    electric: "#FCF7DE",
    water: "#DEF3FD",
    ground: "#F4E7DA",
    rock: "#D5D5D4",
    fairy: "#FCEAFF",
    poison: "#98D7A5",
    bug: "#F8D5A3",
    dragon: "#97B3E6",
    psychic: "#EAEDA1",
    flying: "#F5F5F5",
    fighting: "#E6E0D4",
    normal: "#F5F5F5",
}

const fetchPokemons = async () => {
    for(let i = 1; i <= pokeCount; i++){
        let pokemon = await getPokemon(i)
        createCard(pokemon)
    }
}

const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const res = await fetch(url)
    const data = await res.json()
    // console.log(data)
    return data
}

function createCard(pokemon){
    const card = document.createElement('div')

    card.innerHTML = 
    `
    <div class="pokemon" style="background-color: ${colors[pokemon.types[0].type.name]};">
            <div class="img-container">
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            </div>
            <div class="info">
                <span class="number">#${pokemon.id.toString().padStart(3, '0')}</span>
                <h3 class="name">${pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</h3>
                <small class="type">Type: <span>${pokemon.types[0].type.name}</span></small>
            </div>
        </div>
    `

    pokeContainer.append(card)
}



fetchPokemons()