const display = document.getElementById("displayPic");
const name = document.getElementById("name");
const type = document.getElementById("type");
const height = document.getElementById("height");
const weight = document.getElementById("weight");
const description = document.getElementById("description");
const keys = document.querySelector(".blueButtons");
const input = document.getElementById("idInput");
const newSearch = document.getElementById('yellowBox1');
const enter = document.getElementById('yellowBox2');
let GLOBALCANINPUT = false;

keys.addEventListener('click', e =>{
    if(GLOBALCANINPUT && e.target.matches('.blueButton')){
        input.value += e.target.id;
    }
})

enter.addEventListener('click', e =>{
    GLOBALCANINPUT = false;
    callApi(input.value);
})

newSearch.addEventListener('click', e =>{
    GLOBALCANINPUT = true;
    clearInput(input.value);
})

function callApi(pokeId){
    const pokemon = fetch("https://pokeapi.co/api/v2/pokemon/" + pokeId)
        .then(response => response.json())
        .then(data => updateInfo(data));
    const description = fetch("https://pokeapi.co/api/v2/pokemon-species/" + pokeId)
        .then(response => response.json())
        .then(data => updateDescription(data));
    return pokemon;
}

function updateInfo(pokemon){
    display.src = pokemon["sprites"]["other"]["official-artwork"]["front_default"];
    name.textContent = pokemon["species"]["name"];
    type.textContent = getTypes(pokemon);
    height.textContent = pokemon["height"] + " decimeters";
    weight.textContent = pokemon["weight"] + " hectograms";
}

function updateDescription(pokemon){
    description.textContent = pokemon["flavor_text_entries"][4]["flavor_text"].replace(/(\f)/gm," ");
}

function clearInput(id){
    input.value = '';
    input.placeholder = id;
}

function getTypes(pokemon){
    let typeString = '';
    for(t in pokemon["types"]){
        typeString += pokemon["types"][t]["type"]["name"] + ' ';
    }
    return typeString;
}