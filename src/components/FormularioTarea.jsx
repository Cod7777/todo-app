import { useState } from 'react'

function FormularioTarea({ onAgregar }) {
  const [texto, setTexto] = useState('')

  function manejarSubmit(e) {
    e.preventDefault()
    if (texto.trim() === '') return

    onAgregar(texto.trim())
    setTexto('')
  }

  return (
      <form className="formulario" onSubmit={manejarSubmit}>
      <input
        type="text"
        placeholder="Escribe una tarea..."
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
      />
      <button type="submit">Agregar</button>
    </form>
  )
}

export default FormularioTarea
