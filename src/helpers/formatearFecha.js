export const formatearFecha = (fecha) => {

  const newFecha = new Date(fecha.split('T')[0].split('-'))

  const opciones = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }

  return newFecha.toLocaleDateString('es-ES', opciones)
}