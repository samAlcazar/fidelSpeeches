import { useState, useEffect } from 'react'

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Cerrar el menú cuando se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.menu-container')) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMenuOpen])

  return (
    <>
      <header className='bg-background-dark border-b border-text-light p-4 w-full flex justify-between items-center fixed top-0 z-50'>
        <div className='flex justify-center items-center gap-2'>
          <p className='font-bold text-2xl text-red-700'>F</p>
          <p className='text-sm sm:text-base'>Archivo de discursos de Fidel Castro</p>
        </div>

        {/* Botón de menú para móvil */}
        <button
          className='lg:hidden p-2 hover:bg-primary/10 rounded-lg menu-container'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label='Toggle menu'
        >
          <div className='w-6 h-5 relative flex flex-col justify-between'>
            <span className={`w-full h-0.5 bg-primary transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-full h-0.5 bg-primary transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-full h-0.5 bg-primary transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>

        {/* Navegación */}
        <nav
          className={`
            lg:static lg:flex lg:h-auto lg:w-auto lg:bg-transparent lg:p-0 lg:translate-x-0
            fixed top-[73px] right-0 h-screen w-64 bg-background-dark p-4
            transform transition-transform duration-300 z-40
            ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          `}
        >
          <div className='flex lg:flex-row flex-col lg:items-center gap-6 lg:gap-4'>
            <a
              className='hover:border-b border-primary transition-colors px-2 py-1'
              href='/speeches'
              onClick={() => setIsMenuOpen(false)}
            >
              Quienes somos
            </a>
            <a
              className='hover:border-b border-primary transition-colors px-2 py-1'
              href='/speeches'
              onClick={() => setIsMenuOpen(false)}
            >
              Discursos
            </a>
            <a
              className='hover:border-b border-primary transition-colors px-2 py-1'
              href='/speeches'
              onClick={() => setIsMenuOpen(false)}
            >
              Contacto
            </a>
          </div>
        </nav>
      </header>

      {/* Overlay para móvil */}
      <div
        className={`fixed inset-0 bg-black/50 z-30 lg:hidden transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />
    </>
  )
}

export default Nav
