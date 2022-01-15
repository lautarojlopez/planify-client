import React, {useReducer} from 'react';
import proyectoContext from './proyectoContext'
import proyectoReducer from './proyectoReducer'
import axiosClient from '../../config/axios'
import {FORMULARIO_PROYECTO,
        OBTENER_PROYECTOS,
        AGREGAR_PROYECTO,
        VALIDAR_FORMULARIO,
        PROYECTO_ACTUAL,
        ELIMINAR_PROYECTO,
      } from '../../types'

const ProyectoState = props =>{

  const initialState = {
    proyectos: [],
    proyecto: null,
    formulario: false,
    errorformproyecto: false,
  }

  const [state, dispatch] = useReducer(proyectoReducer, initialState)

  const mostrarFormulario = () => {
    dispatch({
      type: FORMULARIO_PROYECTO
    })
  }

  //Obtener los proyectos
  const obtenerProyectos = async () => {
      const response = await axiosClient.get('/api/proyectos')
      dispatch({
        type: OBTENER_PROYECTOS,
        payload: response.data
      })
  }

  //Agregar Proyecto
  const agregarProyecto = async (proyecto) => {
    try {
      const response = await axiosClient.post('/api/proyectos', proyecto)
      dispatch({
        type: AGREGAR_PROYECTO,
        payload: response.data
      })
    } catch (e) {
      console.log(e)
    }
  }

  //Validacion de formulario para agregar proyecto
  const mostrarError = () => {
    dispatch({
      type: VALIDAR_FORMULARIO,

    })
  }

  //Seleccionar proyecto
  const proyectoActual = (proyectoId) => {
    dispatch({
      type: PROYECTO_ACTUAL,
      payload: proyectoId
    })
  }

  //Eliminar un proyecto
  const eliminarProyecto = async (proyectoId) => {
    try {
      await axiosClient.delete(`/api/proyectos/${proyectoId}`)
      dispatch({
        type: ELIMINAR_PROYECTO,
        payload: proyectoId
      })
    } catch (e) {
      console.log(e)
    }
  }

  return(
    <proyectoContext.Provider
      value={{
        proyectos: state.proyectos,
        formulario: state.formulario,
        errorformproyecto: state.errorformproyecto,
        proyecto: state.proyecto,
        mostrarFormulario,
        obtenerProyectos,
        agregarProyecto,
        mostrarError,
        proyectoActual,
        eliminarProyecto,
      }}
      >
      {props.children}
    </proyectoContext.Provider>
  )
}

export default ProyectoState;
