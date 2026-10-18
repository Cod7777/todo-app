import { useState } from 'react'

function TareaItem({ tarea, onCompletar, onBorrar, onGuardar }) {
  const [editando, setEditando] = useState(false)
  const [textoEditado, setTextoEditado] = useState(tarea.texto)

  function guardar() {
    if (textoEditado.trim() === '') return

    onGuardar(tarea.id, textoEditado.trim())
    setEditando(false)
  }

  function cancelar() {
    setTextoEditado(tarea.texto)
    setEditando(false)
  }

  if (editando) {
    return (
      <li>
        <input
          type="text"
          value={textoEditado}
          onChange={(e) => setTextoEditado(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && guardar()}
        />
        <button onClick={guardar}>Guardar</button>
        <button onClick={cancelar}>Cancelar</button>
      </li>
    )
  }

  return (
    <li>
      <input
        type="checkbox"
        checked={tarea.completada}
        onChange={() => onCompletar(tarea.id)}
      />
      <span
        style={{
          textDecoration: tarea.completada ? 'line-through' : 'none',
        }}
      >
        {tarea.texto}
      </span>
      <button onClick={() => setEditando(true)}>Editar</button>
      <button onClick={() => onBorrar(tarea.id)}>Borrar</button>
    </li>
  )
}

export default TareaItem
