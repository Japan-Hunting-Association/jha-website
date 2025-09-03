import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button, buttonVariants } from '@/components/ui/button'

describe('Button', () => {
  it('should render with default props', () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('bg-primary', 'text-primary-foreground')
  })

  it('should apply variant classes correctly', () => {
    const { rerender } = render(<Button variant="destructive">Delete</Button>)
    let button = screen.getByRole('button')
    expect(button).toHaveClass('bg-destructive', 'text-destructive-foreground')

    rerender(<Button variant="outline">Outline</Button>)
    button = screen.getByRole('button')
    expect(button).toHaveClass('border', 'border-input', 'bg-background')

    rerender(<Button variant="secondary">Secondary</Button>)
    button = screen.getByRole('button')
    expect(button).toHaveClass('bg-secondary', 'text-secondary-foreground')

    rerender(<Button variant="ghost">Ghost</Button>)
    button = screen.getByRole('button')
    expect(button).toHaveClass('hover:bg-accent', 'hover:text-accent-foreground')

    rerender(<Button variant="link">Link</Button>)
    button = screen.getByRole('button')
    expect(button).toHaveClass('text-primary', 'underline-offset-4', 'hover:underline')
  })

  it('should apply size classes correctly', () => {
    const { rerender } = render(<Button size="sm">Small</Button>)
    let button = screen.getByRole('button')
    expect(button).toHaveClass('h-9', 'px-3')

    rerender(<Button size="default">Default</Button>)
    button = screen.getByRole('button')
    expect(button).toHaveClass('h-10', 'px-4', 'py-2')

    rerender(<Button size="lg">Large</Button>)
    button = screen.getByRole('button')
    expect(button).toHaveClass('h-11', 'px-8')

    rerender(<Button size="icon">Icon</Button>)
    button = screen.getByRole('button')
    expect(button).toHaveClass('h-10', 'w-10')
  })

  it('should handle onClick events', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>)
    const button = screen.getByRole('button')
    
    expect(button).toBeDisabled()
    expect(button).toHaveClass('disabled:pointer-events-none', 'disabled:opacity-50')
  })

  it('should forward ref correctly', () => {
    const ref = vi.fn()
    render(<Button ref={ref}>Button with ref</Button>)
    
    expect(ref).toHaveBeenCalled()
    expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLButtonElement)
  })

  it('should render as child component when asChild is true', () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    )
    
    const link = screen.getByRole('link', { name: /link button/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/test')
    expect(link).toHaveClass('bg-primary', 'text-primary-foreground')
  })

  it('should merge custom className with variant classes', () => {
    render(
      <Button className="custom-class" variant="outline">
        Custom Button
      </Button>
    )
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass('custom-class', 'border', 'border-input')
  })

  it('should pass through additional props', () => {
    render(
      <Button type="submit" form="test-form" aria-label="Submit form">
        Submit
      </Button>
    )
    
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('type', 'submit')
    expect(button).toHaveAttribute('form', 'test-form')
    expect(button).toHaveAttribute('aria-label', 'Submit form')
  })

  it('should have correct focus styles', () => {
    render(<Button>Focusable</Button>)
    const button = screen.getByRole('button')
    
    expect(button).toHaveClass(
      'focus-visible:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-ring',
      'focus-visible:ring-offset-2'
    )
  })

  it('should have transition classes', () => {
    render(<Button>Animated</Button>)
    const button = screen.getByRole('button')
    
    expect(button).toHaveClass('transition-colors')
  })
})

describe('buttonVariants', () => {
  it('should return correct classes for combinations', () => {
    expect(buttonVariants({ variant: 'default', size: 'default' })).toContain('bg-primary')
    expect(buttonVariants({ variant: 'destructive', size: 'sm' })).toContain('bg-destructive')
    expect(buttonVariants({ variant: 'outline', size: 'lg' })).toContain('border')
    expect(buttonVariants({ variant: 'ghost', size: 'icon' })).toContain('hover:bg-accent')
  })

  it('should use default variants when not specified', () => {
    const classes = buttonVariants({})
    expect(classes).toContain('bg-primary')
    expect(classes).toContain('h-10')
    expect(classes).toContain('px-4')
  })
})