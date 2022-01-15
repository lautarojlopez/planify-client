import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  OBTENER_USUARIO,
  CERRAR_SESION } from '../../types'

const authReducer = (state, action) => {
  switch (action.type) {

    case REGISTRO_EXITOSO:
    case LOGIN_EXITOSO:
      localStorage.setItem('token', action.payload.token) //Guardar el token en localStorage
      return{
          ...state,
          autenticado: true,
          mensaje: null,
          loading: false
      }

    case OBTENER_USUARIO:
      return{
        ...state,
        autenticado: true,
        usuario: action.payload,
        loading: false
      }

    case LOGIN_ERROR:
    case REGISTRO_ERROR:
    case CERRAR_SESION:
      localStorage.removeItem('token')
      return{
        ...state,
        token: null,
        usuario: null,
        autenticado: null,
        mensaje: action.payload,
        loading: false
      }

    default:
      return state
  }
}

export default authReducer;
