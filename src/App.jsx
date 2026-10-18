import { useState } from 'react'

function App() {
  const [tareas, setTareas] = useState([
    { id: 1, texto: 'Aprender React', completada: false },
    { id: 2, texto: 'Crear mi primer proyecto', completada: false },
  ])

  return (
    <div>
      <h1>Mis tareas</h1>
      <ul>
        {tareas.map((tarea) => (
          <li key={tarea.id}>{tarea.texto}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
