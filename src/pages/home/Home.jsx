const Home = () => {
  return (
    <main className='home-page p-8'>
      <h1 className='text-2xl font-bold mb-4'>Explora en el archivo</h1>
      <div className='flex gap-8 justify-center items-center'>
        <aside className='w-1/5 border-r border-accent'>
          <h2>Filtrar discursos</h2>
          <div>
            <p>Por palabra clave:</p>
            <input type='text' placeholder='Ej. Marxismo, Latinoamerica' />
          </div>
          <div>
            <p>Por rango de fechas:</p>
            <input type='date' />
            <input type='date' />
          </div>
          <div>
            <p>Por temática:</p>
            <input type='text' placeholder='Ej. Socialismo' />
          </div>
          <div>
            <p>Por localización:</p>
            <input type='text' placeholder='Ej. Habana' />
          </div>
          <button type='button'>Aplicar filtros</button>
          <button type='button'>Limpiar filtros</button>
        </aside>
        <section className='w-4/5'>
          LISTA DE DISCURSOS
        </section>
      </div>
    </main>
  )
}

export default Home
