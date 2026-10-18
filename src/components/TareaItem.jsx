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
      <li className="tarea">
        <input
          type="text"
          value={textoEditado}
          onChange={(e) => setTextoEditado(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && guardar()}
        />
        <button onClick={guardar}>Guardar</button>
        <button className="btn-secundario" onClick={cancelar}>
          Cancelar
        </button>
      </li>
    )
  }

  return (
    <li className="tarea">
      <input
        type="checkbox"
        checked={tarea.completada}
        onChange={() => onCompletar(tarea.id)}
      />
      <span className={`tarea-texto ${tarea.completada ? 'completada' : ''}`}>
        {tarea.texto}
      </span>
      <button className="btn-secundario" onClick={() => setEditando(true)}>
        Editar
      </button>
      <button className="btn-peligro" onClick={() => onBorrar(tarea.id)}>
        Borrar
      </button>
    </li>
  )
}

export default TareaItem
