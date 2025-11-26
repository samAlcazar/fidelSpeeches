import React from 'react'

const HighlightedText = ({ text, searchTerms = [], caseSensitive = false }) => {
  if (!searchTerms.length || !text) return text

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
        <React.Fragment key={i}>{part}</React.Fragment>
      )
  })
}

export default HighlightedText
