import {useContext} from 'react'
import Tarea from './Tarea'
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'
import Swal from 'sweetalert2'

const ListadoTareas = () => {

  //State proyectos
  const proyectosContext = useContext(proyectoContext)
  const {proyecto, eliminarProyecto} = proyectosContext
  //State tareas
  const tareasContext = useContext(tareaContext)
  const {tareasproyecto} = tareasContext

  //Si no hay proyecto seleccionado
  if(!proyecto){
    return <h1 className="my-5 text-3xl">Selecciona un proyecto</h1>
  }

  const [proyectoActual] = proyecto

  //Eliminar proyecto
  const onClickDelete = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás recuperar el proyecto una vez eliminado",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await eliminarProyecto(proyectoActual._id)
        Swal.fire(
          'Eliminado!',
          '',
          'success'
        )
      }
    })

  }

  return(
    <div className="my-5">
      <h2 className="text-3xl">Proyecto: {proyectoActual.nombre}</h2>
      <ul className="flex flex-col items-center">
        {
          tareasproyecto.length === 0
          ? <li><p>No has añadido tareas aún</p></li>
          : tareasproyecto.map( (tarea) => (
            <Tarea
              key = {tarea._id}
              tarea = {tarea}
            />
          ))
        }
      </ul>
      <div className="flex justify-center">
        <button
          onClick={onClickDelete}
          className="w-3/12 p-2 bg-red-800 text-white text-xl mt-3 border-b-4 border-red-900 rounded hover:border-red-800 hover:bg-red-700 transition-all duration-150 ease-linear">
          Eliminar Proyecto <i className="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>
    )
}
export default ListadoTareas
