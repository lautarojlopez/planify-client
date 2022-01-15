import React, { useContext } from "react";
import tareaContext from "../../context/tareas/tareaContext";
import proyectoContext from "../../context/proyectos/proyectoContext";
import Swal from 'sweetalert2'

const Tarea = ({ tarea }) => {
  const { nombre, estado } = tarea;

  //Context proyecto
  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;
  const [proyectoActual] = proyecto;

  //Context tareas
  const tareasContext = useContext(tareaContext);
  const {
    eliminarTarea,
    obtenerTareas,
    editarTarea,
    getTareaActual,
  } = tareasContext;

  //onClick
  const onClickELiminar = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás recuperar la tarea una vez eliminada",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await eliminarTarea(id, proyectoActual);
        Swal.fire(
          'Eliminado!',
          '',
          'success'
        )
      }
    })
    obtenerTareas(proyectoActual._id);
  };
  const onClickEstado = (tarea) => {
    if (tarea.estado) {
      tarea.estado = false;
    } else {
      tarea.estado = true;
    }
    editarTarea(tarea);
  };
  const onClickEditar = (tarea) => {
    getTareaActual(tarea);
  };

  return (
    <div className="w-10/12 md:w-8/12 p-4 my-2 rounded shadow-md bg-gray-100">
      <div className="flex justify-between items-center">
        <p className="">{nombre}</p>
        <div className="">
          {estado ? (
            <button
              onClick={() => onClickEstado(tarea)}
              className="text-emerald-500 text-2xl ml-2"
            >
              <i className="fas fa-check-circle"></i>
            </button>
          ) : (
            <button
              onClick={() => onClickEstado(tarea)}
              className="text-red-500 text-2xl ml-2"
            >
              <i className="fas fa-times-circle"></i>
            </button>
          )}
          <button onClick={() => onClickEditar(tarea)} className="">
            <i className="fas fa-edit text-2xl text-amber-500 ml-2"></i>
          </button>
          <button onClick={() => onClickELiminar(tarea._id)} className="">
            <i className="fas fa-trash-alt text-2xl text-red-500 ml-2"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Tarea;
