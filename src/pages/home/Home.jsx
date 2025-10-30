import { useState } from 'react'
import { speeches } from '../../data/speeches'

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
    <main className='home-page pt-[85px] px-8 pb-8 h-screen overflow-hidden'>
      <div className='flex gap-8 justify-center'>
        <aside className='w-1/5 border-r border-primary flex flex-col gap-4 items-start'>
          <h2 className='text-xl text-primary'>Filtrar discursos</h2>
          <div>
            <p className='text-primary'>Por palabra clave:</p>
            <div className='flex flex-col gap-2'>
              <input
                type='text'
                value={filterValues.keywords}
                onChange={(e) => setFilterValues({
                  ...filterValues,
                  keywords: e.target.value
                })}
                placeholder='Ej. Marxismo, Latinoamerica'
              />
              <div className='flex items-center gap-2'>
                <label className='flex items-center gap-1 text-sm'>
                  <input
                    type='checkbox'
                    checked={filterValues.caseSensitive}
                    onChange={(e) => setFilterValues({
                      ...filterValues,
                      caseSensitive: e.target.checked
                    })}
                  />
                  <span>Coincidir mayúsculas/minúsculas</span>
                </label>
              </div>
              <p className='text-secondary text-sm font-light'>Las palabras deben estar separadas por comas</p>
              {appliedFilters.keywords.trim() && (
                <p className='text-primary text-sm'>
                  {filteredSpeeches.length} {filteredSpeeches.length === 1 ? 'discurso encontrado' : 'discursos encontrados'}
                </p>
              )}
            </div>
          </div>
          <div>
            <p>Por rango de fechas:</p>
            <div className='flex gap-2 mt-2'>
              <input
                type='date'
                className='flex-1'
                value={filterValues.dateRange.start}
                onChange={(e) => setFilterValues({
                  ...filterValues,
                  dateRange: { ...filterValues.dateRange, start: e.target.value }
                })}
              />
              <input
                type='date'
                className='flex-1'
                value={filterValues.dateRange.end}
                onChange={(e) => setFilterValues({
                  ...filterValues,
                  dateRange: { ...filterValues.dateRange, end: e.target.value }
                })}
              />
            </div>
          </div>
          <div>
            <p>Por localización:</p>
            <input
              type='text'
              placeholder='Ej. Habana'
              value={filterValues.location}
              onChange={(e) => setFilterValues({
                ...filterValues,
                location: e.target.value
              })}
            />
          </div>
          <div className='mt-4 flex justify-around gap-2'>
            <button
              type='button'
              className='px-4 py-2 bg-primary text-white rounded'
              onClick={applyFilters}
            >
              Aplicar filtros
            </button>
            <button
              type='button'
              className='px-4 py-2 bg-secondary text-white rounded'
              onClick={clearFilters}
            >
              Limpiar filtros
            </button>
          </div>
        </aside>
        <section className='w-4/5'>
          <h2 className='text-xl text-primary text-center mb-4'>LISTA DE DISCURSOS</h2>
          <div className='grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-4 overflow-y-auto h-[80vh] pr-4'>
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
                  <button type='button' className='inline-block mt-2 px-2 py-1 bg-accent text-secondary font-semibold rounded'>Ver más</button>
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
