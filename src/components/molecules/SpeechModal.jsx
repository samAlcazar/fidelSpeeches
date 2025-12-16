import { useEffect } from 'react'
import HighlightedText from '../atoms/HighlightedText'

const SpeechModal = ({ speech, isOpen, onClose, searchTerms, caseSensitive }) => {
  // Cerrar modal con tecla Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden' // Prevenir scroll del body
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen || !speech) return null

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4'
      onClick={onClose}
    >
      <div
        className='bg-card-dark border border-border-dark rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className='flex items-center justify-between p-6 border-b border-border-dark'>
          <h2 className='text-2xl font-bold text-primary'>
            {speech.fileName}
          </h2>
          <button
            onClick={onClose}
            className='text-secondary hover:text-primary transition-colors text-3xl leading-none'
            aria-label='Cerrar'
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className='overflow-y-auto p-6 space-y-4'>
          {speech.content.map((line, index) => (
            <p key={index} className='text-white leading-relaxed'>
              <HighlightedText
                text={line}
                searchTerms={searchTerms}
                caseSensitive={caseSensitive}
              />
            </p>
          ))}
        </div>

        {/* Footer */}
        <div className='p-4 border-t border-border-dark flex justify-end'>
          <button
            onClick={onClose}
            className='px-4 py-2 bg-accent text-secondary font-semibold rounded hover:bg-accent/80 transition-colors'
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}

export default SpeechModal
