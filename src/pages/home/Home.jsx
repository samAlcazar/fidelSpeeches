import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { speeches } from '../../data/speeches'
import FilterSidebar from '../../components/molecules/FilterSidebar'

const HighlightedText = ({ text, searchTerms, caseSensitive }) => {
  if (!searchTerms.length) return text

  const regex = new RegExp(
    `(${searchTerms.map(term => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`,
    caseSensitive ? 'g' : 'gi'
  )

  const parts = text.split(regex)
  return parts.map((part, i) => {
    const isMatch = searchTerms.some(term =>
      caseSensitive
        ? part === term
        : part.toLowerCase() === term.toLowerCase()
    )
    return isMatch
      ? (
        <span key={i} className='bg-accent/30'>{part}</span>
        )
      : (
          part
        )
  })
}

const Home = () => {
  const navigate = useNavigate()
  // Estado para controlar la visibilidad del sidebar en móvil
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Estados para los valores de los filtros
  const [filterValues, setFilterValues] = useState({
    keywords: '',
    caseSensitive: false,
    dateRange: { start: '', end: '' },
    location: ''
  })

  // Estados para los filtros aplicados
  const [appliedFilters, setAppliedFilters] = useState({
    keywords: '',
    caseSensitive: false,
    dateRange: { start: '', end: '' },
    location: ''
  })

  const [filteredSpeeches, setFilteredSpeeches] = useState(speeches)

  const applyFilters = () => {
    setAppliedFilters(filterValues)
    let filtered = speeches
    // Filtrar por palabras clave
    if (filterValues.keywords.trim()) {
      const searchTerms = filterValues.keywords.split(',').map(term => term.trim()).filter(Boolean)
      filtered = filtered.filter(speech => {
        const fullContent = [
          speech.title,
          speech.excerpt,
          ...(speech.content || [])
        ].join(' ')
        return searchTerms.every(term => {
          const searchTerm = filterValues.caseSensitive ? term : term.toLowerCase()
          const content = filterValues.caseSensitive ? fullContent : fullContent.toLowerCase()
          return content.includes(searchTerm)
        })
      })
    }

    // Filtrar por localización
    if (filterValues.location.trim()) {
      const locationTerm = filterValues.caseSensitive
        ? filterValues.location.trim()
        : filterValues.location.trim().toLowerCase()
      filtered = filtered.filter(speech => {
        const place = filterValues.caseSensitive ? speech.place : speech.place.toLowerCase()
        return place.includes(locationTerm)
      })
    }

    // Filtrar por rango de fechas
    if (filterValues.dateRange.start || filterValues.dateRange.end) {
      filtered = filtered.filter(speech => {
        const speechDate = new Date(speech.date)
        const start = filterValues.dateRange.start ? new Date(filterValues.dateRange.start) : null
        const end = filterValues.dateRange.end ? new Date(filterValues.dateRange.end) : null

        if (start && end) return speechDate >= start && speechDate <= end
        if (start) return speechDate >= start
        if (end) return speechDate <= end
        return true
      })
    }

    setFilteredSpeeches(filtered)
  }

  const clearFilters = () => {
    const emptyFilters = {
      keywords: '',
      caseSensitive: false,
      dateRange: { start: '', end: '' },
      location: ''
    }
    setFilterValues(emptyFilters)
    setAppliedFilters(emptyFilters)
    setFilteredSpeeches(speeches)
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
          appliedFilters={appliedFilters}
          filteredSpeeches={filteredSpeeches}
          applyFilters={applyFilters}
          clearFilters={clearFilters}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <section className='w-full lg:w-4/5'>
          <h2 className='text-xl text-primary text-center mb-4'>LISTA DE DISCURSOS</h2>
          <div className='grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-4 overflow-y-auto h-[80vh] pr-0 lg:pr-4'>
            {filteredSpeeches.map((speech, index) => {
              const searchTerms = appliedFilters.keywords.split(',').map(term => term.trim()).filter(Boolean)
              return (
                <article key={index} className='border border-border-dark p-4 bg-card-dark rounded-xl font-light'>
                  <h3 className='text-lg font-semibold text-primary'>
                    <HighlightedText
                      text={speech.title}
                      searchTerms={searchTerms}
                      caseSensitive={appliedFilters.caseSensitive}
                    />
                  </h3>
                  <p><span className='text-primary font-semibold'>Fecha:</span> {speech.date}</p>
                  <p><span className='text-primary font-semibold'>Localización:</span> {speech.place}</p>
                  <p><span className='text-primary font-semibold'>Fuente:</span> {speech.font}</p>
                  <p><span className='text-primary font-semibold'>Resumen:</span>
                    <HighlightedText
                      text={speech.excerpt}
                      searchTerms={searchTerms}
                      caseSensitive={appliedFilters.caseSensitive}
                    />
                  </p>
                  <button
                    type='button'
                    className='inline-block mt-2 px-2 py-1 bg-accent text-secondary font-semibold rounded hover:bg-accent/80 transition-colors'
                    onClick={() => navigate(`/speech/${index}`)}
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
    </main>
  )
}

export default Home
