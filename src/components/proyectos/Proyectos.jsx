import {useContext, useEffect} from 'react'
import Sidebar from '../layout/Sidebar'
import Header from '../layout/Header'
import FormularioTarea from '../tareas/FormularioTarea'
import ListadoTareas from '../tareas/ListadoTareas'
import AuthContext from '../../context/autenticacion/authContext'

const Proyectos = () => {

  //Extraer context
  const authContext = useContext(AuthContext)
  const {usuarioAutenticado} = authContext

  useEffect(() => {
    usuarioAutenticado()
  }, [])

  return(
    <div className="flex">
      <Sidebar/>
      <div className="contenido w-full">
        <main>
          <Header/>
          <FormularioTarea/>
          <ListadoTareas/>
        </main>
      </div>
    </div>
  )
}

export default Proyectos;
