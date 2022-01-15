import React, {useReducer} from 'react'
import AuthContext from './authContext'
import AuthReducer from './authReducer'
import axiosClient from '../../config/axios'
import tokenAuth from '../../config/token'
import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  OBTENER_USUARIO,
  CERRAR_SESION } from '../../types'

const AuthState = (props) => {

  const initialState = {
    token: localStorage.getItem('token'),
    autenticado: null,
    usuario: null,
    mensaje: null,
    loading: true
  }

  const [state, dispatch] = useReducer(AuthReducer, initialState)

  //FUNCIONES
  //Registrar nuevo usuario
  const registrarUsuario = async (datos) => {
    try {
      const response = await axiosClient.post('/api/usuarios', datos)
      dispatch({
        type: REGISTRO_EXITOSO,
        payload: response.data
      })
      usuarioAutenticado()
    } catch (e) {
      dispatch({
        type: REGISTRO_ERROR,
        payload: e.response.data.msg
      })
    }
  }

  //Obtener usuario autenticado
  const usuarioAutenticado = async () => {

    const token = localStorage.getItem('token')

    if(token){
      //Enviar token por headers
      tokenAuth(token)

    }

    try {
      const response = await axiosClient.get('/api/auth')
      dispatch({
        type: OBTENER_USUARIO,
        payload: response.data
      })
    } catch (e) {
      console.log(e)
      dispatch({
        type: LOGIN_ERROR
      })
    }
  }

  //Iniciar Sesión
  const iniciarSesion = async (datos) => {
    try {

      const response = await axiosClient.post('/api/auth', datos)
      dispatch({
        type: LOGIN_EXITOSO,
        payload: response.data
      })
      usuarioAutenticado()

    } catch (e) {
      console.log(e);
      dispatch({
        type: LOGIN_ERROR,
        payload: e.response.data.msg
      })
    }
  }

  //Cerrar Sesión
  const cerrarSesion = () => {
    dispatch({
      type: CERRAR_SESION
    })
  }

  return(
    <AuthContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        loading: state.loading,
        registrarUsuario,
        iniciarSesion,
        usuarioAutenticado,
        cerrarSesion
      }}
      >
      {props.children}
    </AuthContext.Provider>
  )

}

export default AuthState
