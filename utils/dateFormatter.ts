/**
 * Formatea una fecha a formato legible en español
 */
export const formatDate = (date: Date): string => {
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ]

  const day = date.getDate()
  const month = months[date.getMonth()]
  const year = date.getFullYear()

  return `${day} de ${month}, ${year}`
}

/**
 * Calcula el tiempo transcurrido desde una fecha
 */
export const getTimeAgo = (date: Date): string => {
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 1) return "Hace 1 día"
  if (diffDays < 30) return `Hace ${diffDays} días`
  if (diffDays < 365) {
    const months = Math.floor(diffDays / 30)
    return months === 1 ? "Hace 1 mes" : `Hace ${months} meses`
  }

  const years = Math.floor(diffDays / 365)
  return years === 1 ? "Hace 1 año" : `Hace ${years} años`
}
