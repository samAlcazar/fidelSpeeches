import { useEffect, useState } from 'react'
import { speeches } from '../../data/speeches'
import { useParams, useNavigate } from 'react-router-dom'

const Speech = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [speech, setSpeech] = useState(null)

  useEffect(() => {
    const selectedSpeech = speeches[parseInt(id)]
    if (!selectedSpeech) {
      navigate('/') // Redirigir al home si no se encuentra el discurso
      return
    }
    setSpeech(selectedSpeech)
  }, [id, navigate])

  if (!speech) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary' />
      </div>
    )
  }

  return (
    <main className='pt-[85px] px-4 sm:px-8 pb-8 max-w-4xl mx-auto'>
      <button
        onClick={() => navigate(-1)}
        className='mb-6 flex items-center gap-2 text-primary hover:text-primary/80 transition-colors'
      >
        <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
          <path fillRule='evenodd' d='M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z' clipRule='evenodd' />
        </svg>
        Volver
      </button>

      <article className='bg-card-dark border border-border-dark rounded-xl p-6 sm:p-8'>
        <header className='mb-8'>
          <h1 className='text-2xl sm:text-3xl font-bold text-primary mb-4'>{speech.title}</h1>
          <div className='flex flex-col sm:flex-row gap-2 sm:gap-6 text-sm text-secondary'>
            <p><span className='font-semibold'>Fecha:</span> {speech.date}</p>
            <p><span className='font-semibold'>Lugar:</span> {speech.place}</p>
            <p><span className='font-semibold'>Fuente:</span> {speech.font}</p>
          </div>
        </header>

        <div className='mb-6'>
          <h2 className='text-xl font-semibold text-primary mb-3'>Resumen</h2>
          <p className='text-text-dark leading-relaxed'>{speech.excerpt}</p>
        </div>

        <div className='space-y-4'>
          <h2 className='text-xl font-semibold text-primary mb-3'>Discurso completo</h2>
          {speech.content.map((paragraph, index) => (
            <p key={index} className='text-text-dark leading-relaxed'>
              {paragraph}
            </p>
          ))}
        </div>
      </article>
    </main>
  )
}

export default Speech
