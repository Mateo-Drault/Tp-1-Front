// valido que los datos de una reseña sean correctos antes de enviarse
export function validarResena(autor, comentario, estrellas) {
    if (!autor || autor.trim().length < 2) return false;
    if (!comentario || comentario.trim().length < 5) return false;
    if (estrellas < 1 || estrellas > 5) return false;
    return true;
  }
  
  //Filtro el catálogo por género de videojuego
  export function filtrarPorGenero(juegos, genero) {
    if (!genero || genero === 'Todos') return juegos;
    return juegos.filter(juego => juego.genero.toLowerCase() === genero.toLowerCase());
  }