import {Fragment, useState, useContext} from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'

const NuevoProyecto = () =>{

  //State formulario
  const proyectosContext = useContext(proyectoContext)
  const {formulario, errorformproyecto, mostrarFormulario, agregarProyecto, mostrarError} = proyectosContext

  //State
  const [proyecto, setProyecto] = useState({
    nombre: ''
  })

  //Leer input
  const onChangeProyecto = (e) =>{
    setProyecto({
      ...proyecto,
      [e.target.name]: e.target.value
    })
  }

  //onSubmit
  const onSubmitProyecto = (e) =>{
    e.preventDefault()
    //Validar
    if(nombre === ''){
      mostrarError()
      return
    }
    //Agregar al state
    agregarProyecto(proyecto)
    //Vaciar Formulario
    setProyecto({
      nombre: ''
    })
  }

  //onClick
  const onClick = () => {
    mostrarFormulario()
  }

  const {nombre} = proyecto

  return(
    <Fragment>
      <div className="flex flex-col w-11/12 my-5">
        <button
          onClick={onClick}
          className="w-full p-3 bg-gray-800 text-white text-2xl mt-3 border-b-4 border-gray-900 rounded hover:border-gray-800 hover:bg-gray-700 transition-all duration-150 ease-linear"
          type="submit">
          Nuevo Proyecto <i className="fas fa-plus-circle"></i>
        </button>

        <form
          className={`${formulario ? "visible opacity-100" : "invisible opacity-0"} transition-all ease-in-out duration-200`}
          onSubmit={onSubmitProyecto}
          >
          <input
            className={`w-full p-2 mt-3 bg-transparent text-xl border-b-4 focus:outline-none transition-all ease-linear duration-150 ${errorformproyecto ? "border-red-700 bg-red-500 bg-opacity-25 hover:border-red-600 focus:border-red-600" : "border-gray-500 hover:border-gray-900 focus:border-gray-900"}`}
            type="text"
            name="nombre"
            placeholder="Nombre del proyecto"
            onChange={onChangeProyecto}
            value={nombre}
          />
          <p className={`text-sm text-center text-red-600 font-bold ${errorformproyecto ? "block" : "hidden"}`}>Escribe un nombre</p>
          <button
            className="w-full p-3 bg-gray-800 text-white text-2xl mt-3 border-b-4 border-gray-900 rounded hover:border-gray-800 hover:bg-gray-700 transition-all duration-150 ease-linear"
            type="submit">
            Crear Proyecto <i className="fas fa-plus-circle"></i>
          </button>
        </form>
      </div>

    </Fragment>
  )

}

export default NuevoProyecto;
