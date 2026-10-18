import { useState, useEffect } from 'react'

function App() {
  const [tareas, setTareas] = useState(() => {
    const guardadas = localStorage.getItem('tareas')
    return guardadas ? JSON.parse(guardadas) : []
  })
  const [nuevaTarea, setNuevaTarea] = useState('')
  const [editandoId, setEditandoId] = useState(null)
  const [textoEditado, setTextoEditado] = useState('')

  useEffect(() => {
    localStorage.setItem('tareas', JSON.stringify(tareas))
  }, [tareas])

  function agregarTarea(e) {
    e.preventDefault()
    if (nuevaTarea.trim() === '') return

    const tarea = {
      id: Date.now(),
      texto: nuevaTarea.trim(),
      completada: false,
    }
    setTareas([...tareas, tarea])
    setNuevaTarea('')
  }

  function completarTarea(id) {
    setTareas(
      tareas.map((tarea) =>
        tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
      )
    )
  }

  function borrarTarea(id) {
    setTareas(tareas.filter((tarea) => tarea.id !== id))
  }

  function empezarEdicion(tarea) {
    setEditandoId(tarea.id)
    setTextoEditado(tarea.texto)
  }

  function guardarEdicion(id) {
    if (textoEditado.trim() === '') return

    setTareas(
      tareas.map((tarea) =>
        tarea.id === id ? { ...tarea, texto: textoEditado.trim() } : tarea
      )
    )
    setEditandoId(null)
    setTextoEditado('')
  }

  function cancelarEdicion() {
    setEditandoId(null)
    setTextoEditado('')
  }

  return (
    <div>
      <h1>Mis tareas</h1>

      <form onSubmit={agregarTarea}>
        <input
          type="text"
          placeholder="Escribe una tarea..."
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
        />
        <button type="submit">Agregar</button>
      </form>

      <ul>
        {tareas.map((tarea) => (
          <li key={tarea.id}>
            {editandoId === tarea.id ? (
              <>
                <input
                  type="text"
                  value={textoEditado}
                  onChange={(e) => setTextoEditado(e.target.value)}
                />
                <button onClick={() => guardarEdicion(tarea.id)}>Guardar</button>
                <button onClick={cancelarEdicion}>Cancelar</button>
              </>
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={tarea.completada}
                  onChange={() => completarTarea(tarea.id)}
                />
                <span
                  style={{
                    textDecoration: tarea.completada ? 'line-through' : 'none',
                  }}
                >
                  {tarea.texto}
                </span>
                <button onClick={() => empezarEdicion(tarea)}>Editar</button>
                <button onClick={() => borrarTarea(tarea.id)}>Borrar</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
