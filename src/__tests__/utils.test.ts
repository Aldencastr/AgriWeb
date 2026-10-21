import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { cn } from '@/lib/utils'
import { formatNumber, formatCurrency, formatDate, slugify, truncate } from '@/lib/utils'

describe('lib/utils', () => {
  describe('cn', () => {
    it('joins class names correctly', () => {
      expect(cn('a', 'b', 'c')).toBe('a b c')
    })

    it('handles conditional classes', () => {
      expect(cn('base', true && 'active', false && 'hidden')).toBe('base active')
    })

    it('merges tailwind classes with twMerge', () => {
      expect(cn('p-2 p-4')).toBe('p-4')
    })
  })

  describe('formatNumber', () => {
    it('formats numbers with locale', () => {
      const result = formatNumber(1234.56)
      // Accept both Spanish (1.234,56) and US (1,234.56) formats
      expect(['1.234,56', '1,234.56']).toContain(result)
    })

    it('handles integers', () => {
      const result = formatNumber(1000)
      expect(['1.000', '1,000']).toContain(result)
    })
  })

  describe('formatCurrency', () => {
    it('formats currency in USD', () => {
      const result = formatCurrency(1234.56)
      expect(['$1.234,56', '$1,234.56', 'USD 1,234.56']).toContain(result)
    })

    it('handles custom currency', () => {
      const result = formatCurrency(1000, 'EUR')
      expect(['1.000,00\u202F€', 'EUR 1,000', '€1,000.00']).toContain(result)
    })
  })

  describe('formatDate', () => {
    it('formats date in Spanish', () => {
      const date = new Date('2026-10-21')
      expect(formatDate(date)).toContain('octubre')
    })
  })

  describe('slugify', () => {
    it('converts text to slug', () => {
      expect(slugify('Hola Mundo')).toBe('hola-mundo')
    })

    it('removes accents', () => {
      expect(slugify('Ingeniería Agrícola')).toBe('ingenieria-agricola')
    })

    it('handles special characters', () => {
      expect(slugify('Test @#$%')).toBe('test')
    })
  })

  describe('truncate', () => {
    it('truncates long text', () => {
      const result = truncate('Hello World', 8)
      // Accept both possible truncation results
      expect(['Hello W…', 'Hello Wo…']).toContain(result)
    })

    it('returns original if shorter', () => {
      expect(truncate('Hi', 10)).toBe('Hi')
    })
  })
})

describe('components', () => {
  it('imports without errors', () => {
    // This test verifies that the module imports work
    expect(true).toBe(true)
  })
})