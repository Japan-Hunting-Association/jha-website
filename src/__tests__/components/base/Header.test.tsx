import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Header } from '@/components/base/Header'

describe('Header', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render the logo', () => {
    render(<Header />)
    const logo = screen.getByText('日本狩猟協会')
    expect(logo).toBeInTheDocument()
    expect(logo.closest('a')).toHaveAttribute('href', '/')
  })

  it('should render all menu items', () => {
    render(<Header />)
    expect(screen.getByText('活動内容')).toBeInTheDocument()
    expect(screen.getByText('プログラム')).toBeInTheDocument()
    expect(screen.getByText('協会について')).toBeInTheDocument()
    expect(screen.getByText('お問い合わせ')).toBeInTheDocument()
  })

  it('should have correct links for menu items', () => {
    render(<Header />)
    expect(screen.getByText('活動内容').closest('a')).toHaveAttribute('href', '/about-us')
    expect(screen.getByText('プログラム').closest('a')).toHaveAttribute('href', '/join')
    expect(screen.getByText('協会について').closest('a')).toHaveAttribute('href', '/association')
    expect(screen.getByText('お問い合わせ').closest('a')).toHaveAttribute('href', '/contact')
  })

  it('should render social media links', () => {
    render(<Header />)
    const twitterLink = screen.getByTitle('X (Twitter)')
    const facebookLink = screen.getByTitle('Facebook')
    const discordLink = screen.getByTitle('Discord')
    const githubLink = screen.getByTitle('GitHub')

    expect(twitterLink).toBeInTheDocument()
    expect(twitterLink).toHaveAttribute('href', 'https://twitter.com/hunters_japan')
    expect(twitterLink).toHaveAttribute('target', '_blank')
    
    expect(facebookLink).toBeInTheDocument()
    expect(discordLink).toBeInTheDocument()
    expect(githubLink).toBeInTheDocument()
    expect(githubLink).toHaveAttribute('href', 'https://github.com/Japan-Hunting-Association')
  })

  it('should render member login link', () => {
    render(<Header />)
    const memberLink = screen.getByTitle('会員登録')
    expect(memberLink).toBeInTheDocument()
    expect(memberLink).toHaveAttribute('href', '/join')
  })

  it('should toggle mobile menu', () => {
    render(<Header />)
    const menuButton = screen.getByRole('button')
    
    // Initially menu should be closed - check that mobile nav is not visible
    expect(screen.queryByText('活動内容')?.parentElement?.parentElement).not.toHaveClass('md:hidden')
    
    // Click to open menu
    fireEvent.click(menuButton)
    
    // After clicking, menu should be open - check that mobile nav items are visible
    const mobileNavItems = screen.getAllByText('活動内容')
    expect(mobileNavItems.length).toBe(2) // One for desktop, one for mobile
  })

  it('should have proper accessibility attributes', () => {
    render(<Header />)
    
    // Check aria-labels for social links
    expect(screen.getByLabelText('X (Twitter)で最新情報をチェック')).toBeInTheDocument()
    expect(screen.getByLabelText('Facebookグループに参加')).toBeInTheDocument()
    expect(screen.getByLabelText('Discordサーバーに参加')).toBeInTheDocument()
    expect(screen.getByLabelText('GitHubで協会のプロジェクトを見る')).toBeInTheDocument()
    expect(screen.getByLabelText('会員登録・ログイン')).toBeInTheDocument()
  })

  it('should have proper styling classes', () => {
    render(<Header />)
    const header = screen.getByRole('banner')
    
    expect(header).toHaveClass('fixed', 'top-0', 'left-0', 'right-0', 'z-50', 'bg-white', 'border-b', 'border-gray-100')
  })

  it('should hide desktop navigation on mobile', () => {
    render(<Header />)
    const desktopNav = screen.getAllByRole('navigation')[0]
    expect(desktopNav).toHaveClass('hidden', 'md:flex')
  })

  it('should close mobile menu when clicking a menu item', () => {
    render(<Header />)
    const menuButton = screen.getByRole('button')
    
    // Open menu
    fireEvent.click(menuButton)
    
    // Menu should be open
    let mobileNavItems = screen.getAllByText('活動内容')
    expect(mobileNavItems.length).toBe(2) // Desktop and mobile versions
    
    // Click on a menu item (mobile version)
    const aboutLink = mobileNavItems[1] // Get mobile version
    fireEvent.click(aboutLink)
    
    // Menu should close - only desktop version should remain
    mobileNavItems = screen.getAllByText('活動内容')
    expect(mobileNavItems.length).toBe(1) // Only desktop version
  })

  it('should render all social icons correctly', () => {
    render(<Header />)
    
    // Check if SVG icons are present
    const svgElements = document.querySelectorAll('svg')
    expect(svgElements.length).toBeGreaterThan(0)
    
    // Check specific icon paths exist
    const xPath = document.querySelector('path[d*="M18.244 2.25h3.308"]')
    const fbPath = document.querySelector('path[d*="M24 12.073c0-6.627"]')
    const discordPath = document.querySelector('path[d*="M20.317 4.37"]')
    const githubPath = document.querySelector('path[d*="M12 0c-6.626"]')
    
    expect(xPath).toBeInTheDocument()
    expect(fbPath).toBeInTheDocument()
    expect(discordPath).toBeInTheDocument()
    expect(githubPath).toBeInTheDocument()
  })
})