console.log("hola mundo")
const namePokemon = document.getElementById('input-pokemon');
const searchBtn = document.getElementById('btn-pokemon');
const errorMsg = document.getElementById('error-msg');
const infoPokemon = document.getElementById('results');
const imgPokemon = document.getElementById('img-pokemon');
const historialList = document.getElementById('historial');
const imgList = [];

function consultaPk(pokemon) {
    const {id,name}= pokemon;
    infoPokemon.innerHTML=`
    <p>N° ${pokemon.id}</p>
    <p>${pokemon.name}</p>`
    imgPokemon.setAttribute('src', pokemon.sprites.other.dream_world.front_default);
}

function historialFn(){
    const historial = localStorage.getItem('historial');
    historialList.innerHTML=historial;
    console.log(historial);
}


window.addEventListener('DOMContentLoaded',historialFn())

async function fetchFn(){
    try {
        if (namePokemon.value==='') {
            const error='Ingrese un nombre';
            throw new Error(error);
        }if (!/^[a-zA-Z]*$/g.test(namePokemon.value)){
            const error='Nombre solo debe contener letras';
            throw new Error(error);
        }
        const name = namePokemon.value.toLowerCase();
        const consulta = await fetch('https://pokeapi.co/api/v2/pokemon/'+name);

        if(consulta.status===404){
            const error='Nombre no encontrado';
            throw new Error(error);
        }else{
            const pokeObj = await consulta.json();
            consultaPk(pokeObj);
            console.log(pokeObj);

            historialList.innerHTML += `<img src="${pokeObj.sprites.front_default}"</img>`;            
            window.localStorage.setItem('historial', historialList.innerHTML);

            // localStorage.setItem('pokeHistorial', JSON.stringify({name:pokeObj.name, id:pokeObj.id, img:pokeObj.sprites.other.dream_world.front_default}));
            // setTimeout(function(){
            //     const objPokeHist = JSON.parse(localStorage.getItem('pokeHistorial'));
            //     console.log(objPokeHist, objPokeHist.id);
            // },1000)

            
            // const imghistorial = {img:pokeObj.sprites.other.dream_world.front_default};
            // imgList.push(imghistorial);            
            // localStorage.setItem('imgListHistorial', JSON.stringify(imgList));
            // const imgListHistorialOut=JSON.parse(localStorage.getItem('imgListHistorial'));
            // console.log(imgListHistorialOut);




        }               
        } catch (error) {
        errorMsg.innerHTML=error;
        }
        finally{
            setTimeout(function(){
                errorMsg.innerHTML='';
                namePokemon.value='';
                namePokemon.focus();
            },3000)

        }


    
};


searchBtn.addEventListener('click',fetchFn);