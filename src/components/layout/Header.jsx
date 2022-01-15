import {useContext, useEffect} from 'react'
import AuthContext from '../../context/autenticacion/authContext'

const Header = () =>{

  //Extraer context
  const authContext = useContext(AuthContext)
  const {usuario, usuarioAutenticado, cerrarSesion} = authContext

  useEffect(() => {
    usuarioAutenticado()
  }, [])

  return(
    <header className="flex justify-between p-5 bg-gray-800 items-center">
      {usuario ? <p className="text-lg text-white">Bienvenido, <span className="font-bold">{usuario.nombre}</span></p> : null}
      <button onClick={() => cerrarSesion()} className="text-lg text-white hover:text-gray-400 transition-all ease-linear duration-150">Cerrar Sesión <i className="fas fa-sign-out-alt"></i></button>
    </header>
  )

}

export default Header
