import {useNavigate} from 'react-router-dom'
import {useState, useContext, useEffect} from 'react'
import {Link} from 'react-router-dom';
import AuthContext from '../../context/autenticacion/authContext'

const NuevaCuenta = (props) => {

  //Extraer context
  const authContext = useContext(AuthContext)
  const {mensaje, autenticado, registrarUsuario} = authContext

  //State
  const [user, setUser] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmar: ''
  })

  let navigate = useNavigate()
  useEffect(() => {
    if(autenticado){
      navigate('/')
    }
  }, [autenticado, props.history])

  //Error
  const [error, setError] = useState(false)

  const {nombre, email, password, confirmar} = user

  const onChange = (e) =>{
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = (e) =>{
    e.preventDefault()

    //Validación
    if(nombre.trim() === '' ||
      email.trim() === '' ||
      password.trim() === '' ||
      confirmar.trim() === '' ||
      confirmar !== password){
        setError(true)
        return
      }
      else{
        setError(false)
      }

      //Enviar a la API
      registrarUsuario({
        nombre,
        email,
        password
      })

  }

  return(
    <div className="flex flex-col min-h-screen flex justify-center items-center bg-gray-900">
      <div className="p-5 w-11/12 md:w-8/12 lg:w-6/12 xl:w-4/12 rounded bg-white">
        <form onSubmit={onSubmit} className="mb-3">
          <h1 className="text-4xl">Crear Cuenta</h1>
          <p className="text-xl mt-2 text-center font-bold text-red-500">{mensaje}</p>
          {/* CAMPO */}
          <div className="flex flex-col mt-3">
            <label
              className="font-raleway font-bold">
              Nombre
            </label>
            <input
              className={`p-2 text-xl border-b-4 focus:outline-none transition-all ease-linear duration-150 ${error && nombre.trim() === '' ? "border-red-700 bg-red-500 bg-opacity-25 hover:border-red-600 focus:border-red-600" : "border-gray-500 hover:border-gray-900 focus:border-gray-900"}`}
              type="text"
              name="nombre"
              placeholder="Tu nombre"
              value={nombre}
              onChange={onChange}
            />
            <p className={`text-center font-bold text-red-500 ${error && nombre.trim() === '' ? "block" : "hidden"}`}>Escribe tu nombre</p>
          </div>
          {/* FIN CAMPO */}
          {/* CAMPO */}
          <div className="flex flex-col mt-3">
            <label
              className="font-raleway font-bold">
              E-mail
            </label>
            <input
              className={`p-2 text-xl border-b-4 focus:outline-none transition-all ease-linear duration-150 ${error && email.trim() === '' ? "border-red-700 bg-red-500 bg-opacity-25 hover:border-red-600 focus:border-red-600" : "border-gray-500 hover:border-gray-900 focus:border-gray-900"}`}
              type="email"
              name="email"
              placeholder="Tu e-mail"
              value={email}
              onChange={onChange}
            />
            <p className={`text-center font-bold text-red-500 ${error && email.trim() === '' ? "block" : "hidden"}`}>Escribe tu e-mail</p>
          </div>
          {/* FIN CAMPO */}
          {/* CAMPO */}
          <div className="flex flex-col mt-3">
            <label
              className="font-raleway font-bold">
              Contraseña
            </label>
            <input
              className={`p-2 text-xl border-b-4 focus:outline-none transition-all ease-linear duration-150 ${error && (password.trim() === '' || password.length < 6) ? "border-red-700 bg-red-500 bg-opacity-25 hover:border-red-600 focus:border-red-600" : "border-gray-500 hover:border-gray-900 focus:border-gray-900"}`}
              type="email"
              type="password"
              name="password"
              placeholder="Tu contraseña"
              value={password}
              onChange={onChange}
            />
            <p className={`text-center font-bold text-red-500 ${error && password.trim() === '' ? "block" : "hidden"}`}>Escribe una contraseña</p>
            <p className={`text-center font-bold text-red-500 ${error && (password.trim() !== '' && password.length < 6) ? "block" : "hidden"}`}>La contraseña debe tener al menos 6 caracteres</p>
          </div>
          {/* FIN CAMPO */}
          {/* CAMPO */}
          <div className="flex flex-col mt-3">
            <label
              className="font-raleway font-bold">
              Repetir Contraseña
            </label>
            <input
              className={`p-2 text-xl border-b-4 focus:outline-none transition-all ease-linear duration-150 ${error && (confirmar.trim() === '' || confirmar !== password) ? "border-red-700 bg-red-500 bg-opacity-25 hover:border-red-600 focus:border-red-600" : "border-gray-500 hover:border-gray-900 focus:border-gray-900"}`}
              type="password"
              name="confirmar"
              placeholder="Repite tu contraseña"
              value={confirmar}
              onChange={onChange}
            />
            <p className={`text-center font-bold text-red-500 ${error && confirmar.trim() === '' ? "block" : "hidden"}`}>Reescribe tu contraseña</p>
            <p className={`text-center font-bold text-red-500 ${error && (confirmar.trim() !== ''&& confirmar !== password) ? "block" : "hidden"}`}>Las contraseñas no coinciden</p>
          </div>
          {/* FIN CAMPO */}
          <button
            className="w-full p-3 bg-gray-800 text-white text-2xl mt-3 border-b-4 border-gray-900 rounded hover:border-gray-800 hover:bg-gray-700 transition-all duration-150 ease-linear"
            type="submit">
            Registrarme <i className="fas fa-check-circle"></i>
          </button>
        </form>
        <Link to='/iniciar-sesion' className="text-gray-700 hover:text-gray-900 font-black transition-all ease-linear duration-150">¿Ya tienes una cuenta? Inicia Sesión</Link>
      </div>
    </div>
  )
}

export default NuevaCuenta;
