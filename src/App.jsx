import { useState, useEffect } from 'react'
import FormularioTarea from './components/FormularioTarea'
import Filtros from './components/Filtros'
import TareaItem from './components/TareaItem'

function App() {
  const [tareas, setTareas] = useState(() => {
    const guardadas = localStorage.getItem('tareas')
    return guardadas ? JSON.parse(guardadas) : []
  })
  const [filtro, setFiltro] = useState('todas')

  useEffect(() => {
    localStorage.setItem('tareas', JSON.stringify(tareas))
  }, [tareas])

  function agregarTarea(texto) {
    const tarea = { id: Date.now(), texto, completada: false }
    setTareas([...tareas, tarea])
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

  function editarTarea(id, nuevoTexto) {
    setTareas(
      tareas.map((tarea) =>
        tarea.id === id ? { ...tarea, texto: nuevoTexto } : tarea
      )
    )
  }

  const tareasVisibles = tareas.filter((tarea) => {
    if (filtro === 'pendientes') return !tarea.completada
    if (filtro === 'completadas') return tarea.completada
    return true
  })

  const pendientes = tareas.filter((tarea) => !tarea.completada).length

  return (
    <div>
      <h1>Mis tareas</h1>

      <FormularioTarea onAgregar={agregarTarea} />
      <Filtros filtro={filtro} onCambiar={setFiltro} />

      <p>
        {pendientes} {pendientes === 1 ? 'tarea pendiente' : 'tareas pendientes'}
      </p>

      <ul>
        {tareasVisibles.map((tarea) => (
          <TareaItem
            key={tarea.id}
            tarea={tarea}
            onCompletar={completarTarea}
            onBorrar={borrarTarea}
            onGuardar={editarTarea}
          />
        ))}
      </ul>
    </div>
  )
}

export default App
