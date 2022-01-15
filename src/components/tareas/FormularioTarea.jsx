import {useContext, useState, useEffect} from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'

const FormularioTarea = () =>{

  //Context proyecto
  const proyectosContext = useContext(proyectoContext)
  const {proyecto} = proyectosContext
  //Context tareas
  const tareasContext = useContext(tareaContext)
  const {obtenerTareas, agregarTarea, validarTarea, editarTarea, errortarea, tareaseleccionada} = tareasContext

  //useEffect para detectar si se selecciona una tarea
  useEffect(() => {
    if(tareaseleccionada !== null){
      setTarea(tareaseleccionada)
    }
    else{
      setTarea({
        nombre: ''
      })
    }
  }, [tareaseleccionada])

  const [tarea, setTarea] = useState({
    nombre: ''
  })
  const {nombre} = tarea

  //Si no hay proyecto seleccionado
  if(!proyecto){
    return null
  }
  const [proyectoActual] = proyecto

  //onSubmit
  const onSubmit = (e) => {
    e.preventDefault()

    //Si es una tarea nueva
    if(tareaseleccionada === null){
      tarea.proyecto = proyectoActual._id
      if(nombre.trim() === ''){
        validarTarea()
        return
      }
      agregarTarea(tarea)
    }
    //Si está editando una tarea existente
    else{
      editarTarea(tarea)
    }

    setTarea({
      nombre: ''
    })
    obtenerTareas(proyectoActual._id)
  }

  //Leer Formulario
  const handleChange = (e) => {
    setTarea({
      ...tarea,
      [e.target.name]: e.target.value
    })
  }

  return(
    <form
      onSubmit = {onSubmit}
    className="flex flex-col w-full items-center p-8 bg-gray-900">
      <div className="flex flex-col w-full md:w-6/12">
        <input
          onChange={handleChange}
          value={nombre}
          className={`w-full text-white p-2 mt-3 bg-transparent text-2xl border-b-4 focus:outline-none transition-all ease-linear duration-150 ${errortarea ? "border-red-500 hover:border-red-600 bg-red-500 bg-opacity-25 focus:border-red-600" : "border-gray-500 hover:border-gray-400 focus:border-gray-400"}`}
          type="text"
          name="nombre"
          placeholder="Nombre de la tarea"
        />
        <p className={`text-red-500 font-bold text-center ${errortarea ? "block" : "hidden"}`}>Escribe el nombre de la tarea</p>
        {tareaseleccionada !== null
        ? <button
          className="w-full p-3 bg-gray-800 text-white text-xl mt-3 border-b-4 border-gray-600 rounded hover:border-gray-500 hover:bg-gray-700 transition-all duration-150 ease-linear"
          type="submit">
            Editar Tarea <i className="fas fa-edit"></i>
          </button>
        : <button
          className="w-full p-3 bg-gray-800 text-white text-xl mt-3 border-b-4 border-gray-600 rounded hover:border-gray-500 hover:bg-gray-700 transition-all duration-150 ease-linear"
          type="submit">
            Agregar Tarea <i className="fas fa-plus-circle"></i>
          </button>
        }
      </div>
    </form>
  )

}

export default FormularioTarea
