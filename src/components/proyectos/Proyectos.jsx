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
    //eslint-disable-next-line
  }, [])

  return(
    <div className="flex flex-col md:flex-row">
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
