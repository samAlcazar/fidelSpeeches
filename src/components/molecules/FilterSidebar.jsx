import { useEffect } from 'react'

const FilterSidebar = ({
  filterValues,
  setFilterValues,
  appliedFilters,
  filteredSpeeches,
  applyFilters,
  clearFilters,
  isOpen,
  onClose
}) => {
  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.getElementById('filterSidebar')
      if (sidebar && !sidebar.contains(event.target) && isOpen) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, onClose])

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black/50 z-20 transition-opacity duration-300 lg:hidden
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        id='filterSidebar'
        className={`fixed lg:static top-[85px] bottom-0 left-0 w-[280px] lg:w-1/5 
          bg-background-dark lg:bg-transparent border-r border-primary 
          flex flex-col gap-4 items-start p-4 overflow-y-auto
          transform transition-transform duration-300 z-30
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <h2 className='text-xl text-primary'>Filtrar discursos</h2>

        <div className='w-full'>
          <p className='text-primary mb-2'>Por palabra clave:</p>
          <div className='flex flex-col gap-2'>
            <input
              type='text'
              value={filterValues.keywords}
              onChange={(e) => setFilterValues({
                ...filterValues,
                keywords: e.target.value
              })}
              placeholder='Ej. Marxismo, Latinoamerica'
              className='w-full'
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

        <div className='w-full'>
          <p className='text-primary mb-2'>Por rango de fechas:</p>
          <div className='flex flex-col gap-2'>
            <input
              type='date'
              className='w-full'
              value={filterValues.dateRange.start}
              onChange={(e) => setFilterValues({
                ...filterValues,
                dateRange: { ...filterValues.dateRange, start: e.target.value }
              })}
            />
            <input
              type='date'
              className='w-full'
              value={filterValues.dateRange.end}
              onChange={(e) => setFilterValues({
                ...filterValues,
                dateRange: { ...filterValues.dateRange, end: e.target.value }
              })}
            />
          </div>
        </div>

        <div className='w-full'>
          <p className='text-primary mb-2'>Por localización:</p>
          <input
            type='text'
            placeholder='Ej. Habana'
            className='w-full'
            value={filterValues.location}
            onChange={(e) => setFilterValues({
              ...filterValues,
              location: e.target.value
            })}
          />
        </div>

        <div className='mt-4 flex flex-col sm:flex-row gap-2 w-full'>
          <button
            type='button'
            className='flex-1 px-4 py-2 bg-primary text-white rounded'
            onClick={() => {
              applyFilters()
              onClose()
            }}
          >
            Aplicar filtros
          </button>
          <button
            type='button'
            className='flex-1 px-4 py-2 bg-secondary text-white rounded'
            onClick={() => {
              clearFilters()
              onClose()
            }}
          >
            Limpiar filtros
          </button>
        </div>
      </aside>
    </>
  )
}

export default FilterSidebar
