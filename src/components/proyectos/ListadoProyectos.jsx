import {useContext, useEffect} from 'react'
import Proyecto from './Proyecto'
import proyectoContext from '../../context/proyectos/proyectoContext'

const ListadoProyectos = () =>{

  //Extraer proyectos del state inicial
  const proyectosContext = useContext(proyectoContext)
  const {proyectos, obtenerProyectos} = proyectosContext

  useEffect(() => {
    obtenerProyectos()
    //eslint-disable-next-line
  })

  //Revisar si hay proyectos
  if(proyectos.length === 0){
    return <p className="mt-1 text-center">No tienen ningun proyecto aún.</p>
  }

  return(
    <ul>
      {/* AGREGAR KEYS */}
      {proyectos.map( (proyecto) => (
        <Proyecto
          key = {proyecto._id}
          proyecto = {proyecto}
        />
      ))}
    </ul>
  )

}

export default ListadoProyectos
