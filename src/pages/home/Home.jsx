import { useState, useEffect } from 'react'
import { speeches } from '../../data/speeches'
import FilterSidebar from '../../components/molecules/FilterSidebar'
import HighlightedText from '../../components/atoms/HighlightedText'
import SpeechModal from '../../components/molecules/SpeechModal'

const Home = () => {
  // Estado para controlar la visibilidad del sidebar en móvil
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Estado para el modal del discurso
  const [selectedSpeech, setSelectedSpeech] = useState(null)

  // Estados para los valores de los filtros
  const [filterValues, setFilterValues] = useState({
    keywords: '',
    caseSensitive: false
  })

  const [filteredSpeeches, setFilteredSpeeches] = useState(() => {
    // Mostrar 4 discursos aleatorios al inicio
    const shuffled = [...speeches].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, 4)
  })

  useEffect(() => {
    let filtered = speeches

    // Verificar si hay filtros activos
    const hasActiveFilters = filterValues.keywords.trim() !== ''

    // Filtrar por palabras clave
    if (hasActiveFilters) {
      const searchTerms = filterValues.keywords.split(',').map(term => term.trim()).filter(Boolean)
      filtered = filtered.filter(speech => {
        const fullContent = [
          speech.fileName,
          ...(speech.content || [])
        ].join(' ')
        return searchTerms.every(term => {
          const searchTerm = filterValues.caseSensitive ? term : term.toLowerCase()
          const content = filterValues.caseSensitive ? fullContent : fullContent.toLowerCase()
          return content.includes(searchTerm)
        })
      })
    } else {
      // Sin filtros: mostrar 4 discursos aleatorios
      const shuffled = [...speeches].sort(() => 0.5 - Math.random())
      filtered = shuffled.slice(0, 6)
    }

    setFilteredSpeeches(filtered)
  }, [filterValues])

  const clearFilters = () => {
    setFilterValues({
      keywords: '',
      caseSensitive: false
    })
  }

  return (
    <main className='home-page pt-[85px] px-4 sm:px-8 pb-8 h-screen overflow-hidden'>
      {/* Botón de filtros para móvil */}
      <button
        className='lg:hidden fixed bottom-4 right-4 z-30 bg-primary text-white px-4 py-2 rounded-full shadow-lg'
        onClick={() => setIsSidebarOpen(true)}
      >
        Filtros
      </button>

      <div className='flex flex-col lg:flex-row gap-8 justify-center'>
        <FilterSidebar
          filterValues={filterValues}
          setFilterValues={setFilterValues}
          filteredSpeeches={filteredSpeeches}
          clearFilters={clearFilters}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <section className='w-full lg:w-4/5'>
          <h2 className='text-xl text-primary text-center mb-4'>LISTA DE DISCURSOS</h2>
          <div className='grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-4 overflow-y-auto h-[80vh] pr-0 lg:pr-4'>
            {filteredSpeeches.map((speech, index) => {
              const searchTerms = filterValues.keywords.split(',').map(term => term.trim()).filter(Boolean)
              return (
                <article key={index} className='border border-border-dark p-4 bg-card-dark rounded-xl font-light'>
                  <h3 className='text-lg font-semibold text-primary mb-2'>
                    <HighlightedText
                      text={speech.content[0] || 'Sin contenido'}
                      searchTerms={searchTerms}
                      caseSensitive={filterValues.caseSensitive}
                    />
                  </h3>
                  <button
                    type='button'
                    className='inline-block mt-2 px-2 py-1 bg-accent text-secondary font-semibold rounded hover:bg-accent/80 transition-colors'
                    onClick={() => setSelectedSpeech(speech)}
                  >
                    Ver más
                  </button>
                </article>
              )
            })}
            {filteredSpeeches.length === 0 && (
              <p className='col-span-full text-center text-secondary'>No se encontraron discursos con esos criterios</p>
            )}
          </div>
        </section>
      </div>

      {/* Modal para mostrar discurso completo */}
      <SpeechModal
        speech={selectedSpeech}
        isOpen={selectedSpeech !== null}
        onClose={() => setSelectedSpeech(null)}
        searchTerms={filterValues.keywords.split(',').map(term => term.trim()).filter(Boolean)}
        caseSensitive={filterValues.caseSensitive}
      />
    </main>
  )
}

export default Home
