const spinner = document.getElementById('spinner');
const contenedorCards = document.getElementById('cards-dinamicas');
const cardsTemplate = document.getElementById('template-cards'); // getEmelement para seleccionar el elemento  por su Id.
const fragmen = document.createDocumentFragment();


const obtenerInfo = async () => { //funcion asincronica, espera "algo hasta que se cargue completamente"
    loading(true);
    try {           // el await espera la promesa, hasta que cargue la coneccion con el fetch
        const data = await fetch('https://rickandmortyapi.com/api/character');
        const info = await data.json(); // formatear la data
        mostrarInfo(info);
       
    } catch (error) {
        console.log("error aca");
    } finally {
        loading(false);
    };
};

const mostrarInfo = (info) => {
    info.results.forEach((item) => {
        const clone = cardsTemplate.content.cloneNode(true);
        clone.querySelector('.card-img-top').src = item.image;
        clone.querySelector('.card-img-top').alt = `${item.name} + ${item.id}`;
        clone.querySelector('.card-title').textContent = item.name;
        clone.querySelector('.card-text').textContent = item.status; 
        fragmen.appendChild(clone); //se crea el fragmen para agregar los clones y mostrarlos en la web.
    });
    contenedorCards.appendChild(fragmen);// se agrega el fragmen al contenedor de las cards.
};

const loading = (estado)=> {
    if (estado) {
        spinner.classList.remove('d-none');
    } else {
        spinner.classList.add('d-none');
    }
};

obtenerInfo();