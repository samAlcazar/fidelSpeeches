import { speeches } from '../../data/speeches'
const Home = () => {
  return (
    <main className='home-page pt-[85px] px-8 pb-8 h-screen overflow-hidden'>
      <div className='flex gap-8 justify-center'>
        <aside className='w-1/5 border-r border-primary flex flex-col gap-4 items-start'>
          <h2 className='text-xl text-primary'>Filtrar discursos</h2>
          <div>
            <p className='text-primary'>Por palabra clave:</p>
            <input type='text' placeholder='Ej. Marxismo, Latinoamerica' />
            <p className='text-secondary text-sm font-light'>Las palabras deben estar separadas por comas</p>
          </div>
          <div>
            <p>Por rango de fechas:</p>
            <div className='flex gap-2 mt-2'>
              <input type='date' className='flex-1' />
              <input type='date' className='flex-1' />
            </div>
          </div>
          <div>
            <p>Por temática:</p>
            <input type='text' placeholder='Ej. Socialismo' />
          </div>
          <div>
            <p>Por localización:</p>
            <input type='text' placeholder='Ej. Habana' />
          </div>
          <div className='mt-4 flex justify-around gap-2'>
            <button type='button' className='px-4 py-2 bg-primary text-white rounded'>Aplicar filtros</button>
            <button type='button' className='px-4 py-2 bg-secondary text-white rounded'>Limpiar filtros</button>
          </div>
        </aside>
        <section className='w-4/5'>
          <h2 className='text-xl text-primary text-center mb-4'>LISTA DE DISCURSOS</h2>
          <div className='grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-4 overflow-y-auto h-[80vh] pr-4'>
            {speeches.map((speech, index) => (
              <article key={index} className='border border-border-dark p-4 bg-card-dark rounded-xl font-light'>
                <h3 className='text-lg font-semibold text-primary'>{speech.title}</h3>
                <p><span className='text-primary font-semibold'>Fecha:</span> {speech.date}</p>
                <p><span className='text-primary font-semibold'>Localización:</span> {speech.place}</p>
                <p><span className='text-primary font-semibold'>Fuente:</span> {speech.font}</p>
                <p><span className='text-primary font-semibold'>Resumen:</span> {speech.excerpt}</p>
                <button type='button' className='inline-block mt-2 px-2 py-1 bg-accent text-secondary font-semibold rounded'>Ver más</button>
              </article>
            ))}
            {/* Más artículos de discursos pueden ser añadidos aquí */}
          </div>
        </section>
      </div>
    </main>
  )
}

export default Home
