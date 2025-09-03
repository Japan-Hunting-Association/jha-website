import { describe, it, expect } from 'vitest'
import { cn } from '@/lib/utils'

describe('utils', () => {
  describe('cn()', () => {
    it('should merge class names correctly', () => {
      expect(cn('text-red-500', 'bg-blue-500')).toBe('text-red-500 bg-blue-500')
    })

    it('should handle conditional classes', () => {
      expect(cn('base', true && 'active', false && 'disabled')).toBe('base active')
    })

    it('should merge Tailwind classes correctly', () => {
      expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4')
    })

    it('should handle arrays', () => {
      expect(cn(['text-sm', 'font-bold'])).toBe('text-sm font-bold')
    })

    it('should handle objects', () => {
      expect(cn({
        'text-red-500': true,
        'bg-blue-500': false,
        'font-bold': true
      })).toBe('text-red-500 font-bold')
    })

    it('should handle undefined and null values', () => {
      expect(cn('base', undefined, null, 'active')).toBe('base active')
    })

    it('should handle empty strings', () => {
      expect(cn('', 'text-red-500', '')).toBe('text-red-500')
    })

    it('should override conflicting Tailwind utilities', () => {
      expect(cn('text-sm text-lg')).toBe('text-lg')
      expect(cn('bg-red-500 bg-blue-500')).toBe('bg-blue-500')
    })

    it('should handle complex combinations', () => {
      const result = cn(
        'base-class',
        'hover:bg-gray-100',
        {
          'active': true,
          'disabled': false
        },
        ['array-class-1', 'array-class-2'],
        undefined,
        'final-class'
      )
      expect(result).toBe('base-class hover:bg-gray-100 active array-class-1 array-class-2 final-class')
    })

    it('should handle responsive modifiers correctly', () => {
      expect(cn('sm:text-sm md:text-base lg:text-lg')).toBe('sm:text-sm md:text-base lg:text-lg')
    })
  })
})