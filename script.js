const contenedorSala = document.querySelector('.contenidor-sala');
const seients = document.querySelectorAll('.fila .seient:not(.ocupat)');
const contador = document.getElementById('contador');
const total = document.getElementById('total');
const selectPelicula = document.getElementById('pelicula');

let preuTicket = +selectPelicula.value;

cargarDadesEnUI();

//Actualitzam el contador i el total
function actualizarSeleccionatsContador(){
    const seientsSeleccionats = document.querySelectorAll('.fila .seient.seleccionat');
    // console.log(seientsSeleccionats);

    const IndexosSeients = [...seientsSeleccionats].map((seient) => [...seients].indexOf(seient));
    // console.log(IndexosSeients)
    localStorage.setItem('SeientsSeleccionats', JSON.stringify(IndexosSeients));

    const nombreSeientsSelecciontas = seientsSeleccionats.length;
    // console.log(nombreSeientsSelecciontas);

    contador.innerText = nombreSeientsSelecciontas;
    total.innerText = nombreSeientsSelecciontas * preuTicket;
}

function cargarDadesEnUI(){
    const seientsSeleccionats = JSON.parse(localStorage.getItem('SeientsSeleccionats'));
    // console.log('Seients Seleccionats: '+seientsSeleccionats);

    if(seientsSeleccionats !== null && seientsSeleccionats.length > 0){
        seients.forEach((seient, index) => {
            if(seientsSeleccionats.indexOf(index) > -1){
                seient.classList.add('seleccionat');
            }
        });
    }

    const indexPeliculaSeleccionada = localStorage.getItem('IndexPeliculaSeleccionada');
    const preuPeliculaSeleccionada = localStorage.getItem('PreuPeliculaSeleccionada');

    if(indexPeliculaSeleccionada !== null) selectPelicula.selectedIndex = indexPeliculaSeleccionada;

    if(preuPeliculaSeleccionada !== null) preuTicket = +preuPeliculaSeleccionada;
    
}

//Event clic en seients
contenedorSala.addEventListener('click', (e) => {
    if(e.target.classList.contains('seient') && !e.target.classList.contains('ocupat')){
        e.target.classList.toggle('seleccionat');

        actualizarSeleccionatsContador();
    }
});

selectPelicula.addEventListener('change', (e) => {
    preuTicket = +e.target.value;
    // console.log(e.target.selectedIndex, e.target.value);
    guardarDadesPelicula(e.target.selectedIndex, e.target.value);
    actualizarSeleccionatsContador();
});

function guardarDadesPelicula(indexSeleccionat, preuPelicula){
    localStorage.setItem('IndexPeliculaSeleccionada', indexSeleccionat);
    localStorage.setItem('PreuPeliculaSeleccionada', preuPelicula);
}

actualizarSeleccionatsContador();