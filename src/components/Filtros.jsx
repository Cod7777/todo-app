function Filtros({ filtro, onCambiar }) {
  const opciones = [
    { valor: 'todas', etiqueta: 'Todas' },
    { valor: 'pendientes', etiqueta: 'Pendientes' },
    { valor: 'completadas', etiqueta: 'Completadas' },
  ]

  return (
    <div>
      {opciones.map((opcion) => (
        <button
          key={opcion.valor}
          onClick={() => onCambiar(opcion.valor)}
          disabled={filtro === opcion.valor}
        >
          {opcion.etiqueta}
        </button>
      ))}
    </div>
  )
}

export default Filtros
