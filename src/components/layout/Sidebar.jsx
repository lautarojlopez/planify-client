import NuevoProyecto from '../proyectos/NuevoProyecto'
import ListadoProyectos from '../proyectos/ListadoProyectos'

const Sidebar = () => {

  return(
    <aside className="flex flex-col items-center bg-gray-200 min-h-screen w-3/12">
      <h1 className="text-4xl py-5"><i className="fas fa-clipboard-list"></i> Planify</h1>

      <NuevoProyecto/>

      <div>
        <h2 className="text-xl">Mis Proyectos <i className="fas fa-tasks"></i></h2>
        <ListadoProyectos/>
      </div>
    </aside>
  )

}

export default Sidebar
