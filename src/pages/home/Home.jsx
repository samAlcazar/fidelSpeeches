const Home = () => {
  return (
    <main className='home-page p-8'>
      <div className='flex gap-8 justify-center'>
        <aside className='w-1/5 border-r border-primary'>
          <h2 className='text-xl text-primary'>Filtrar discursos</h2>
          <div>
            <p className='text-primary'>Por palabra clave:</p>
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
          <h2 className='text-xl text-primary text-center mb-4'>LISTA DE DISCURSOS</h2>
          <div className='grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-4'>
            <article className='border border-border-dark p-4 bg-card-dark rounded-xl font-light'>
              <h3 className='text-lg font-semibold text-primary'>Discurso de Ejemplo 1</h3>
              <p><span className='text-primary font-semibold'>Fecha:</span> 01/01/1959</p>
              <p><span className='text-primary font-semibold'>Temática:</span> Revolución</p>
              <p><span className='text-primary font-semibold'>Localización:</span> Santiago de Cuba</p>
              <p><span className='text-primary font-semibold'>Resumen:</span> Fidel Castro celebra la victoria del pueblo cubano sobre la dictadura de Fulgencio Batista y destaca que el triunfo no pertenece a un grupo, sino a toda la nación. Recalca la necesidad de mantener la unidad, la justicia social y la independencia frente a cualquier influencia extranjera. Castro enfatiza que el nuevo gobierno deberá responder a las aspiraciones del pueblo, erradicar la corrupción y construir una Cuba más libre, digna y soberana. Su mensaje combina esperanza, compromiso moral y un llamado a la responsabilidad colectiva en la construcción de una nueva sociedad.</p>
              <button type='button' className='inline-block mt-2 px-2 py-1 bg-accent text-secondary font-semibold rounded'>Ver más</button>
            </article>
            <article className='border border-border-dark p-4 bg-card-dark rounded-xl font-light'>
              <h3 className='text-lg font-semibold text-primary'>Discurso de Ejemplo 2</h3>
              <p><span className='text-primary font-semibold'>Fecha:</span> 26/07/1953</p>
              <p><span className='text-primary font-semibold'>Temática:</span> Asalto al Cuartel Moncada</p>
              <p><span className='text-primary font-semibold'>Localización:</span> Santiago de Cuba</p>
              <p><span className='text-primary font-semibold'>Resumen:</span> En su discurso "La Historia me Absolverá", Fidel Castro defiende sus acciones durante el asalto al Cuartel Moncada, argumentando que fue un acto necesario para derrocar la dictadura de Batista y luchar por la justicia social en Cuba. Expone sus ideales revolucionarios, abogando por la igualdad, la educación y la reforma agraria. Castro critica la corrupción y la opresión del régimen, y presenta su visión de un futuro mejor para Cuba, basado en los derechos del pueblo y la soberanía nacional. El discurso es un llamado a la acción y un manifiesto de sus convicciones políticas y sociales.</p>
              <button type='button' className='inline-block mt-2 px-2 py-1 bg-accent text-secondary font-semibold rounded'>Ver más</button>
            </article>
            <article className='border border-border-dark p-4 bg-card-dark rounded-xl font-light'>
              <h3 className='text-lg font-semibold text-primary'>Discurso de Ejemplo 3</h3>
              <p><span className='text-primary font-semibold'>Fecha:</span> 05/08/1960</p>
              <p><span className='text-primary font-semibold'>Temática:</span> Nacionalización</p>
              <p><span className='text-primary font-semibold'>Localización:</span> La Habana</p>
              <p><span className='text-primary font-semibold'>Resumen:</span> En este discurso, Fidel Castro anuncia la nacionalización de la industria azucarera en Cuba, argumentando que es un paso necesario para garantizar la soberanía económica del país y mejorar las condiciones de vida del pueblo. Destaca la importancia de la planificación estatal y la participación popular en la gestión de la economía, y critica la explotación imperialista. Castro presenta su visión de una Cuba socialista, donde los recursos sean administrados en beneficio de todos y no de unos pocos.</p>
              <button type='button' className='inline-block mt-2 px-2 py-1 bg-accent text-secondary font-semibold rounded'>Ver más</button>
            </article>
            <article className='border border-border-dark p-4 bg-card-dark rounded-xl font-light'>
              <h3 className='text-lg font-semibold text-primary'>Discurso de Ejemplo 1</h3>
              <p><span className='text-primary font-semibold'>Fecha:</span> 01/01/1959</p>
              <p><span className='text-primary font-semibold'>Temática:</span> Revolución</p>
              <p><span className='text-primary font-semibold'>Localización:</span> Santiago de Cuba</p>
              <p><span className='text-primary font-semibold'>Resumen:</span> Fidel Castro celebra la victoria del pueblo cubano sobre la dictadura de Fulgencio Batista y destaca que el triunfo no pertenece a un grupo, sino a toda la nación. Recalca la necesidad de mantener la unidad, la justicia social y la independencia frente a cualquier influencia extranjera. Castro enfatiza que el nuevo gobierno deberá responder a las aspiraciones del pueblo, erradicar la corrupción y construir una Cuba más libre, digna y soberana. Su mensaje combina esperanza, compromiso moral y un llamado a la responsabilidad colectiva en la construcción de una nueva sociedad.</p>
              <button type='button' className='inline-block mt-2 px-2 py-1 bg-accent text-secondary font-semibold rounded'>Ver más</button>
            </article>
            <article className='border border-border-dark p-4 bg-card-dark rounded-xl font-light'>
              <h3 className='text-lg font-semibold text-primary'>Discurso de Ejemplo 2</h3>
              <p><span className='text-primary font-semibold'>Fecha:</span> 26/07/1953</p>
              <p><span className='text-primary font-semibold'>Temática:</span> Asalto al Cuartel Moncada</p>
              <p><span className='text-primary font-semibold'>Localización:</span> Santiago de Cuba</p>
              <p><span className='text-primary font-semibold'>Resumen:</span> En su discurso "La Historia me Absolverá", Fidel Castro defiende sus acciones durante el asalto al Cuartel Moncada, argumentando que fue un acto necesario para derrocar la dictadura de Batista y luchar por la justicia social en Cuba. Expone sus ideales revolucionarios, abogando por la igualdad, la educación y la reforma agraria. Castro critica la corrupción y la opresión del régimen, y presenta su visión de un futuro mejor para Cuba, basado en los derechos del pueblo y la soberanía nacional. El discurso es un llamado a la acción y un manifiesto de sus convicciones políticas y sociales.</p>
              <button type='button' className='inline-block mt-2 px-2 py-1 bg-accent text-secondary font-semibold rounded'>Ver más</button>
            </article>
            <article className='border border-border-dark p-4 bg-card-dark rounded-xl font-light'>
              <h3 className='text-lg font-semibold text-primary'>Discurso de Ejemplo 3</h3>
              <p><span className='text-primary font-semibold'>Fecha:</span> 05/08/1960</p>
              <p><span className='text-primary font-semibold'>Temática:</span> Nacionalización</p>
              <p><span className='text-primary font-semibold'>Localización:</span> La Habana</p>
              <p><span className='text-primary font-semibold'>Resumen:</span> En este discurso, Fidel Castro anuncia la nacionalización de la industria azucarera en Cuba, argumentando que es un paso necesario para garantizar la soberanía económica del país y mejorar las condiciones de vida del pueblo. Destaca la importancia de la planificación estatal y la participación popular en la gestión de la economía, y critica la explotación imperialista. Castro presenta su visión de una Cuba socialista, donde los recursos sean administrados en beneficio de todos y no de unos pocos.</p>
              <button type='button' className='inline-block mt-2 px-2 py-1 bg-accent text-secondary font-semibold rounded'>Ver más</button>
            </article>
            {/* Más artículos de discursos pueden ser añadidos aquí */}
          </div>
        </section>
      </div>
    </main>
  )
}

export default Home
