import {useContext} from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'

const Proyecto = ({proyecto}) =>{

  //State proyectos
  const proyectosContext = useContext(proyectoContext)
  const {proyectoActual} = proyectosContext
  //State tareas
  const tareasContext = useContext(tareaContext)
  const {obtenerTareas} = tareasContext
  const {nombre} = proyecto

  const seleccionarProyecto = (id) => {
    proyectoActual(id)
    obtenerTareas(id)
  }

  return(
    <ul className="mt-2 flex flex-col items-center">
      <button
        onClick={() => seleccionarProyecto(proyecto._id)}
        className="text-xl bg-transparent my-1 underline"
        type="button">
          {nombre}
      </button>
    </ul>
  )

}

export default Proyecto;
