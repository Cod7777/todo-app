import { useState } from 'react'

function App() {
  const [tareas, setTareas] = useState([
    { id: 1, texto: 'Aprender React', completada: false },
    { id: 2, texto: 'Crear mi primer proyecto', completada: false },
  ])
  const [nuevaTarea, setNuevaTarea] = useState('')

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
            <button onClick={() => borrarTarea(tarea.id)}>Borrar</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
