import { describe, expect, it } from 'vitest'
import { cn } from '@/lib/utils'

describe('cn', () => {
  it('merges conditional class names and resolves conflicts', () => {
    const result = cn('px-2', 'py-1', false && 'hidden', undefined, 'px-4', {
      'text-sm': true,
      'font-bold': false,
    })

    expect(result).toBe('py-1 px-4 text-sm')
  })
})
