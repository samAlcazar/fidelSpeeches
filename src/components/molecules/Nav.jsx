const Nav = () => {
  return (
    <header className='border-b border-text-light p-4 w-full flex justify-between items-center'>
      <div className='flex justify-center items-center gap-2'>
        <p className='font-bold text-2xl text-red-700'>F</p>
        <p>Archivo de discursos de Fidel Castro</p>
      </div>
      <nav className='flex justify-center items-center gap-4'>
        <a className='hover:border-b border-accent transition-colors' href='/speeches'>Quienes somos</a>
        <a className='hover:border-b border-accent transition-colors' href='/speeches'>Discursos</a>
        <a className='hover:border-b border-accent transition-colors' href='/speeches'>Contacto</a>
      </nav>
    </header>
  )
}

export default Nav
