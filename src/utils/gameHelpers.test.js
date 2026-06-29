import { describe, test, expect } from 'vitest';
import { validarResena, filtrarPorGenero } from './gameHelpers';

describe('Pruebas unitarias de lógica del Catálogo', () => {

  // Validación de Formulario de Reseña
  test('Debe rechazar reseñas con comentarios cortos o estrellas inválidas', () => {
    // Caso inválido: comentario muy corto
    const resenaInvalida = validarResena('Juani', 'Mal', 5);
    expect(resenaInvalida).toBe(false);

    // Caso válido
    const resenaValida = validarResena('Juani', 'Excelente juego de principio a fin', 5);
    expect(resenaValida).toBe(true);
  });
  
  // TEST 2: Filtro por Género
  test('Debe filtrar los juegos correctamente por su género', () => {
    const catalogoDummy = [
      { titulo: 'Elden Ring', genero: 'RPG' },
      { titulo: 'FIFA', genero: 'Deportes' }
    ];
    
    const resultado = filtrarPorGenero(catalogoDummy, 'RPG');
    
    expect(resultado).toHaveLength(1);
    expect(resultado[0].titulo).toBe('Elden Ring');
  });
  
});