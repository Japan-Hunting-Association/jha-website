import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Badge, badgeVariants } from '@/components/ui/badge'

describe('Badge', () => {
  it('should render with default props', () => {
    render(<Badge>New</Badge>)
    const badge = screen.getByText('New')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('bg-primary', 'text-primary-foreground')
  })

  it('should apply variant classes correctly', () => {
    const { rerender } = render(<Badge variant="default">Default</Badge>)
    let badge = screen.getByText('Default')
    expect(badge).toHaveClass('bg-primary', 'text-primary-foreground', 'hover:bg-primary/80')

    rerender(<Badge variant="secondary">Secondary</Badge>)
    badge = screen.getByText('Secondary')
    expect(badge).toHaveClass('bg-secondary', 'text-secondary-foreground', 'hover:bg-secondary/80')

    rerender(<Badge variant="destructive">Destructive</Badge>)
    badge = screen.getByText('Destructive')
    expect(badge).toHaveClass('bg-destructive', 'text-destructive-foreground', 'hover:bg-destructive/80')

    rerender(<Badge variant="outline">Outline</Badge>)
    badge = screen.getByText('Outline')
    expect(badge).toHaveClass('text-foreground')
  })

  it('should have correct base styles', () => {
    render(<Badge>Badge</Badge>)
    const badge = screen.getByText('Badge')
    
    expect(badge).toHaveClass(
      'inline-flex',
      'items-center',
      'rounded-full',
      'border',
      'px-2.5',
      'py-0.5',
      'text-xs',
      'font-semibold',
      'transition-colors'
    )
  })

  it('should merge custom className with variant classes', () => {
    render(
      <Badge className="custom-class ml-2" variant="secondary">
        Custom
      </Badge>
    )
    
    const badge = screen.getByText('Custom')
    expect(badge).toHaveClass('custom-class', 'ml-2', 'bg-secondary')
  })

  it('should pass through additional props', () => {
    render(
      <Badge id="test-badge" data-testid="badge" role="status">
        Status
      </Badge>
    )
    
    const badge = screen.getByText('Status')
    expect(badge).toHaveAttribute('id', 'test-badge')
    expect(badge).toHaveAttribute('data-testid', 'badge')
    expect(badge).toHaveAttribute('role', 'status')
  })

  it('should render children correctly', () => {
    render(
      <Badge>
        <span>Icon</span>
        <span>Text</span>
      </Badge>
    )
    
    expect(screen.getByText('Icon')).toBeInTheDocument()
    expect(screen.getByText('Text')).toBeInTheDocument()
  })

  it('should have focus styles', () => {
    render(<Badge>Focus</Badge>)
    const badge = screen.getByText('Focus')
    
    expect(badge).toHaveClass(
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-ring',
      'focus:ring-offset-2'
    )
  })

  it('should render as a div element', () => {
    const { container } = render(<Badge>Div Badge</Badge>)
    const badge = container.querySelector('div')
    
    expect(badge).toBeInTheDocument()
    expect(badge?.tagName).toBe('DIV')
  })

  it('should handle border-transparent for non-outline variants', () => {
    render(<Badge variant="default">Default</Badge>)
    const badge = screen.getByText('Default')
    expect(badge).toHaveClass('border-transparent')
  })

  it('should not have border-transparent for outline variant', () => {
    render(<Badge variant="outline">Outline</Badge>)
    const badge = screen.getByText('Outline')
    expect(badge).not.toHaveClass('border-transparent')
  })
})

describe('badgeVariants', () => {
  it('should return correct classes for each variant', () => {
    expect(badgeVariants({ variant: 'default' })).toContain('bg-primary')
    expect(badgeVariants({ variant: 'secondary' })).toContain('bg-secondary')
    expect(badgeVariants({ variant: 'destructive' })).toContain('bg-destructive')
    expect(badgeVariants({ variant: 'outline' })).toContain('text-foreground')
  })

  it('should use default variant when not specified', () => {
    const classes = badgeVariants({})
    expect(classes).toContain('bg-primary')
    expect(classes).toContain('text-primary-foreground')
  })

  it('should include base classes', () => {
    const classes = badgeVariants({ variant: 'default' })
    expect(classes).toContain('inline-flex')
    expect(classes).toContain('rounded-full')
    expect(classes).toContain('text-xs')
    expect(classes).toContain('font-semibold')
  })
})