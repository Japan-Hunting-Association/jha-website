import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent
} from '@/components/ui/card'

describe('Card', () => {
  it('should render with default classes', () => {
    render(<Card data-testid="card">Card content</Card>)
    const card = screen.getByTestId('card')
    
    expect(card).toBeInTheDocument()
    expect(card).toHaveClass('rounded-lg', 'border', 'bg-card', 'text-card-foreground', 'shadow-sm')
  })

  it('should merge custom className', () => {
    render(<Card className="custom-class" data-testid="card">Content</Card>)
    const card = screen.getByTestId('card')
    
    expect(card).toHaveClass('custom-class', 'rounded-lg', 'border')
  })

  it('should forward ref correctly', () => {
    const ref = vi.fn()
    render(<Card ref={ref}>Card with ref</Card>)
    
    expect(ref).toHaveBeenCalled()
    expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLDivElement)
  })

  it('should pass through additional props', () => {
    render(
      <Card id="test-card" role="article" aria-label="Test card">
        Content
      </Card>
    )
    
    const card = screen.getByRole('article')
    expect(card).toHaveAttribute('id', 'test-card')
    expect(card).toHaveAttribute('aria-label', 'Test card')
  })
})

describe('CardHeader', () => {
  it('should render with default classes', () => {
    render(<CardHeader data-testid="header">Header content</CardHeader>)
    const header = screen.getByTestId('header')
    
    expect(header).toBeInTheDocument()
    expect(header).toHaveClass('flex', 'flex-col', 'space-y-1.5', 'p-6')
  })

  it('should merge custom className', () => {
    render(<CardHeader className="custom-header">Header</CardHeader>)
    const header = screen.getByText('Header')
    
    expect(header).toHaveClass('custom-header', 'flex', 'flex-col')
  })

  it('should forward ref correctly', () => {
    const ref = vi.fn()
    render(<CardHeader ref={ref}>Header</CardHeader>)
    
    expect(ref).toHaveBeenCalled()
    expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLDivElement)
  })
})

describe('CardTitle', () => {
  it('should render as h3 element', () => {
    render(<CardTitle>Card Title</CardTitle>)
    const title = screen.getByRole('heading', { level: 3 })
    
    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent('Card Title')
  })

  it('should have correct default classes', () => {
    render(<CardTitle>Title</CardTitle>)
    const title = screen.getByText('Title')
    
    expect(title).toHaveClass('text-2xl', 'font-semibold', 'leading-none', 'tracking-tight')
  })

  it('should merge custom className', () => {
    render(<CardTitle className="text-3xl text-blue-500">Title</CardTitle>)
    const title = screen.getByText('Title')
    
    expect(title).toHaveClass('text-3xl', 'text-blue-500', 'font-semibold')
  })

  it('should forward ref correctly', () => {
    const ref = vi.fn()
    render(<CardTitle ref={ref}>Title</CardTitle>)
    
    expect(ref).toHaveBeenCalled()
    expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLHeadingElement)
  })
})

describe('CardDescription', () => {
  it('should render as p element', () => {
    render(<CardDescription>Card description text</CardDescription>)
    const description = screen.getByText('Card description text')
    
    expect(description).toBeInTheDocument()
    expect(description.tagName).toBe('P')
  })

  it('should have correct default classes', () => {
    render(<CardDescription>Description</CardDescription>)
    const description = screen.getByText('Description')
    
    expect(description).toHaveClass('text-sm', 'text-muted-foreground')
  })

  it('should merge custom className', () => {
    render(<CardDescription className="text-lg">Description</CardDescription>)
    const description = screen.getByText('Description')
    
    expect(description).toHaveClass('text-lg', 'text-muted-foreground')
  })

  it('should forward ref correctly', () => {
    const ref = vi.fn()
    render(<CardDescription ref={ref}>Description</CardDescription>)
    
    expect(ref).toHaveBeenCalled()
    expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLParagraphElement)
  })
})

describe('CardContent', () => {
  it('should render with default classes', () => {
    render(<CardContent data-testid="content">Content area</CardContent>)
    const content = screen.getByTestId('content')
    
    expect(content).toBeInTheDocument()
    expect(content).toHaveClass('p-6', 'pt-0')
  })

  it('should merge custom className', () => {
    render(<CardContent className="px-8">Content</CardContent>)
    const content = screen.getByText('Content')
    
    expect(content).toHaveClass('px-8', 'p-6', 'pt-0')
  })

  it('should forward ref correctly', () => {
    const ref = vi.fn()
    render(<CardContent ref={ref}>Content</CardContent>)
    
    expect(ref).toHaveBeenCalled()
    expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLDivElement)
  })
})

describe('CardFooter', () => {
  it('should render with default classes', () => {
    render(<CardFooter data-testid="footer">Footer content</CardFooter>)
    const footer = screen.getByTestId('footer')
    
    expect(footer).toBeInTheDocument()
    expect(footer).toHaveClass('flex', 'items-center', 'p-6', 'pt-0')
  })

  it('should merge custom className', () => {
    render(<CardFooter className="justify-end">Footer</CardFooter>)
    const footer = screen.getByText('Footer')
    
    expect(footer).toHaveClass('justify-end', 'flex', 'items-center')
  })

  it('should forward ref correctly', () => {
    const ref = vi.fn()
    render(<CardFooter ref={ref}>Footer</CardFooter>)
    
    expect(ref).toHaveBeenCalled()
    expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLDivElement)
  })
})

describe('Card components composition', () => {
  it('should work together correctly', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Test Card</CardTitle>
          <CardDescription>This is a test card</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card body content</p>
        </CardContent>
        <CardFooter>
          <button>Action</button>
        </CardFooter>
      </Card>
    )
    
    expect(screen.getByRole('heading', { name: /test card/i })).toBeInTheDocument()
    expect(screen.getByText('This is a test card')).toBeInTheDocument()
    expect(screen.getByText('Card body content')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /action/i })).toBeInTheDocument()
  })

  it('should maintain proper structure', () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
        </CardHeader>
        <CardContent>Content</CardContent>
      </Card>
    )
    
    const card = container.firstChild
    const header = card?.firstChild
    const title = header?.firstChild
    
    expect(card).toHaveClass('rounded-lg', 'border')
    expect(header).toHaveClass('flex', 'flex-col')
    expect(title).toHaveClass('text-2xl', 'font-semibold')
  })
})