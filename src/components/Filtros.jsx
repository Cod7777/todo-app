function Filtros({ filtro, onCambiar }) {
  const opciones = [
    { valor: 'todas', etiqueta: 'Todas' },
    { valor: 'pendientes', etiqueta: 'Pendientes' },
    { valor: 'completadas', etiqueta: 'Completadas' },
  ]

  return (
    <div className="filtros">
      {opciones.map((opcion) => (
        <button
          key={opcion.valor}
          className={filtro === opcion.valor ? 'activo' : ''}
          onClick={() => onCambiar(opcion.valor)}
        >
          {opcion.etiqueta}
        </button>
      ))}
    </div>
  )
}

export default Filtros
