document.addEventListener('DOMContentLoaded', function() {
    crearGaleria();
});

function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes');

    for (let i = 1; i <= 12; i++) {
        const imagen = document.createElement('IMG');
        imagen.src = `build/img/thumb/${i}.webp`;
        imagen.dataset.imagenId = i;

        //Añadir la funcion de mostrar IKmagen
        imagen.onclick = mostrarImagen;
        const lista = document.createElement('LI');
        lista.appendChild(imagen);
        galeria.appendChild(lista);
    }
}

function mostrarImagen(e) {
    // console.log(e.target.dataset.imagenId);
    const id = parseInt(e.target.dataset.imagenId);
    //Generar la imagen
    const imagen = document.createElement('IMG');
    imagen.src = `build/img/grande/${id}.webp`;

    const overlay = document.createElement('DIV');
    overlay.classList.add('overlay');

    //cunado se da lcik, cerrar la imagen
    overlay.onclick = function() {
        overlay.remove();
    }

    overlay.appendChild(imagen);

    //Boton para ceerar la imagen
    const cerrarImagen = document.createElement('P');
    cerrarImagen.textContent = 'X';
    cerrarImagen.classList.add('btn-cerrar');

    //cunado se presiona, se cierra la imagen
    cerrarImagen.onclick = function() {
        overlay.remove();
    }


    overlay.appendChild(cerrarImagen);



    //Mostrar en el HTMl
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');

}