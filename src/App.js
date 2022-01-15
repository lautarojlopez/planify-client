import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './components/auth/Login'
import NuevaCuenta from './components/auth/NuevaCuenta'
import Proyectos from './components/proyectos/Proyectos'
import ProyectoState from './context/proyectos/proyectoState'
import TareaState from './context/tareas/tareaState'
import AuthState from './context/autenticacion/authState'
import PrivateRoute from './components/rutas/PrivateRoute'
import tokenAuth from './config/token'

//Revisar si hay un token
const token = localStorage.getItem('token')
if(token){
  tokenAuth(token)
}

function App() {
  return (
    <ProyectoState>
      <TareaState>
        <AuthState>
          <Router>
            <Routes>
              <Route exact path='/' element={<PrivateRoute/>}>
                <Route exact path="/" element={<Proyectos/>}/>
              </Route>
              <Route exact path="/nueva-cuenta" element={<NuevaCuenta/>}/>
              <Route exact path="/iniciar-sesion" element={<Login/>}/>
            </Routes>
          </Router>
        </AuthState>
      </TareaState>
    </ProyectoState>
  );
}

export default App;
