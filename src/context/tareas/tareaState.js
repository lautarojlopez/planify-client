import React, { useReducer } from "react";
import TareaContext from "./tareaContext";
import TareaReducer from "./tareaReducer";
import axiosClient from '../../config/axios'
import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
  TAREA_ACTUAL,
  EDITAR_TAREA
} from "../../types";

const TareaState = (props) => {
  const initialState = {
    tareasproyecto: [],
    errortarea: false,
    tareaseleccionada: null,
  };

  const [state, dispatch] = useReducer(TareaReducer, initialState);

  //Obtener tareas del proyecto
  const obtenerTareas = async (proyecto) => {
    try {
      const response = await axiosClient.get('/api/tareas', {params: {proyecto}})
      dispatch({
        type: TAREAS_PROYECTO,
        payload: response.data.tareas
      });
    } catch (e) {
      console.log(e)
    }
  };

  //Agregar tarea
  const agregarTarea = async (tarea) => {
    try {
      const response = await axiosClient.post('/api/tareas', tarea)
      dispatch({
        type: AGREGAR_TAREA,
        payload: response.data,
      });
    } catch (e) {
      console.log(e)
    }
  };

  //Validación de tareas
  const validarTarea = () => {
    dispatch({
      type: VALIDAR_TAREA,
    });
  };

  //Eliminar tarea
  const eliminarTarea = async (id, proyecto) => {
    try {
      proyecto = proyecto._id
      await axiosClient.delete(`/api/tareas/${id}`, {params: {proyecto}})
      dispatch({
        type: ELIMINAR_TAREA,
        payload: id,
      });
    } catch (e) {
      console.log(e)
    }
  };

  //Editar tarea
  const editarTarea = async (tarea) => {
    try {
      await axiosClient.put(`/api/tareas/${tarea._id}`, tarea)
      dispatch({
        type: EDITAR_TAREA,
        payload: tarea
      })
    } catch (e) {
      console.log(e)
    }
  }

  //Seleccionar tarea para editarla
  const getTareaActual = (tarea) => {
    dispatch({
      type: TAREA_ACTUAL,
      payload: tarea,
    });
  };

  return (
    <TareaContext.Provider
      value={{
        tareasproyecto: state.tareasproyecto,
        errortarea: state.errortarea,
        tareaseleccionada: state.tareaseleccionada,
        obtenerTareas,
        agregarTarea,
        validarTarea,
        eliminarTarea,
        getTareaActual,
        editarTarea
      }}
    >
      {props.children}
    </TareaContext.Provider>
  );
};

export default TareaState;
