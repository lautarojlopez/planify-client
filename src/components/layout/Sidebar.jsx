import NuevoProyecto from '../proyectos/NuevoProyecto'
import ListadoProyectos from '../proyectos/ListadoProyectos'

const Sidebar = () => {

  return(
    <aside className="flex flex-col items-center bg-gray-200 md:min-h-screen w-full md:w-4/12 py-10 md:py-0">
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
