import {useState, useContext, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom';
import AuthContext from '../../context/autenticacion/authContext'

const Login = () => {

  //Extraer context
  const authContext = useContext(AuthContext)
  const {mensaje, autenticado, iniciarSesion} = authContext

  //State
  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  let navigate = useNavigate()
  useEffect(() => {
    if(autenticado){
      navigate('/')
    }
  })

  //Error
  const [error, setError] = useState(false)

  const {email, password} = user

  const onChange = (e) =>{
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = (e) =>{
    e.preventDefault()

    //Validación
    if(email.trim() === '' || password.trim() === ''){
      setError(true)
      return
    }
    else{
      setError(false)
    }

    iniciarSesion({email, password})
  }

  return(
    <div className="flex flex-col min-h-screen flex justify-center items-center bg-gray-900">
      <div className="p-5 w-11/12 md:w-8/12 lg:w-6/12 xl:w-4/12 rounded bg-white">
        <form onSubmit={onSubmit} className="mb-3">
          <h1 className="text-4xl">Iniciar Sesión</h1>
          <p className="text-red-500 text-xl text-center font-bold">{mensaje}</p>
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
          <div className="flex flex-col mt-3">
            <label
              className="font-raleway font-bold">
              Contraseña
            </label>
            <input
              className={`p-2 text-xl border-b-4 focus:outline-none transition-all ease-linear duration-150 ${error && password.trim() === '' ? "border-red-700 bg-red-500 bg-opacity-25 hover:border-red-600 focus:border-red-600" : "border-gray-500 hover:border-gray-900 focus:border-gray-900"}`}
              type="password"
              name="password"
              placeholder="Tu contraseña"
              value={password}
              onChange={onChange}
            />
            <p className={`text-center font-bold text-red-500 ${error && password.trim() === '' ? "block" : "hidden"}`}>Escribe tu contraseña</p>
          </div>
          <button
            className="w-full p-3 bg-gray-800 text-white text-2xl mt-3 border-b-4 border-gray-900 rounded hover:border-gray-800 hover:bg-gray-700 transition-all duration-150 ease-linear"
            type="submit">
            Ingresar <i className="fas fa-sign-in-alt"></i>
          </button>
        </form>
        <Link to='/nueva-cuenta' className="text-gray-700 hover:text-gray-900 font-black transition-all ease-linear duration-150">Crear Cuenta</Link>
      </div>
    </div>
  )
}

export default Login;
