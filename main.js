let pokeCards=document.getElementsByClassName("pokemon-cards")[0]
let searchBar=document.getElementsByClassName("search-input")[0]

document.getElementsByClassName("logo")[0].onclick= () => {
    pokeCards.innerHTML=""
    getPokemons(150)
}

window.onload = (event) => {
    getPokemons(150);
};

let search= async ()=>{
    try{
        pokeCards.innerHTML=""
        console.log(searchBar.value)
        await getOnePokemon(searchBar.value)
    }catch(e){
        console.log("Hubo un error",e)
        get404()
    }
}

let types={
    normal:"gray",
    electric:"darkkhaki",
    grass: "green",
    flying: "beige",
    fire: "red",
    water: "blue",
    poison: "purple",
    ground: "brown",
    fairy: "coral",
    bug: "orange",
    fighting: "olive",
    psychic: "pink",
    rock: "black",
    ice: "lightblue",
    ghost: "plum",
    dragon: "lightgreen"
}


class Pokemon{
    constructor(name,image,types,stats){
        this.name=name;
        this.image=image;
        this.types=types;
        this.stats=stats;
    }
}

let pad=(number, length)=> {
    let str = '' + number;
    while (str.length < length) {
      str = '0' + str;
    }
    return str;
}

let getOnePokemon= async (id)=>{
    const pokemonFetch= await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    const pokemonJson= await pokemonFetch.json()
    let getTypes=pokemonJson.types.map((type)=>{
        return type.type.name
    })
    let name=pokemonJson.name;
    let image=pokemonJson.sprites.front_default;
    let stats=pokemonJson.stats;
    let buildPokemon=new Pokemon(name,image,getTypes,stats)
    createCard(buildPokemon,id)
}

let getPokemons= async (limit)=>{
    for (let i=1;i<=limit;i++){
        await getOnePokemon(i)
    }
}

let createCard=(pokemon,counter)=>{
        let [hp,attack,defense,spAttack,spDefense,speed]=pokemon.stats
        let color=types[pokemon.types[0]]
        pokeCards.innerHTML+=`
        <li class="pokemon">
                <div class="card-header">
                    <p>${counter}</p>
                    <img src="${pokemon.image}" alt="bookmark"/>
                </div>
                <div class="card-body">
                    <img src="https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${pad(counter,3)}.png" alt="">
                    <p class="pokemon-type" style="background-color:${color}">${pokemon.types[0]}</p>
                    <h2>${pokemon.name.toUpperCase()}</h2>
                </div>
                <div class="card-footer">
                    <div class="characteristic">
                    <p class="legend">${hp.base_stat}/200</p>
                    <label for="hp">HP</label>
                    <progress id="hp" value="${hp.base_stat}" max="200"> ${hp.base_stat} </progress>
                    </div>
                    <div class="characteristic">
                    <p class="legend">${attack.base_stat}/200</p>
                    <label for="attack">ATTACK</label>
                    <progress id="attack" value="${attack.base_stat}" max="200"> ${attack.base_stat} </progress>
                    </div>
                    <div class="characteristic">
                    <p class="legend">${defense.base_stat}/200</p>
                    <label for="defense">DEFENSE</label>
                    <progress id="defense" value="${defense.base_stat}" max="200"> ${defense.base_stat} </progress>
                    </div>
                    <div class="characteristic">
                    <p class="legend">${spAttack.base_stat}/200</p>
                    <label for="special-attack">S. ATTACK</label>
                    <progress id="special-attack" value="${spAttack.base_stat}" max="200"> ${spAttack.base_stat} </progress>
                    </div>
                    <div class="characteristic">
                    <p class="legend">${spDefense.base_stat}/200</p>
                    <label for="special-defense">S. DEFENSE</label>
                    <progress id="special-defense" value="${spDefense.base_stat}" max="200"> ${spDefense.base_stat} </progress>
                    </div>
                    <div class="characteristic">
                    <p class="legend">${speed.base_stat}/200</p>
                    <label for="speed">SPEED</label>
                    <progress id="speed" value="${speed.base_stat}" max="200"> ${speed.base_stat} </progress>
                    </div>
                </div>
            </li>
        `
}

let get404 = ()=>{
    pokeCards.innerHTML=`
        <h2 class="error">404 Pokemon not found</h2>
    `
}

