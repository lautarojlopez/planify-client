import {useContext, useEffect} from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import AuthContext from '../../context/autenticacion/authContext'

const PrivateRoute = ({component: Component, ...props}) => {

  const authContext = useContext(AuthContext)
  const {autenticado, loading, usuarioAutenticado} = authContext

  useEffect(() => {
    usuarioAutenticado()
  }, [])

  return(
    (!autenticado && !loading) ? <Navigate to="/iniciar-sesion"/>  : <Outlet/>
  )
}

export default PrivateRoute
