import { useState } from 'react'
import { Menu, X, Search, ShoppingBag } from 'lucide-react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { label: '活動内容', href: '/about-us' },
    { label: 'プログラム', href: '/join' },
    { label: '協会について', href: '/association' },
    { label: 'お問い合わせ', href: '/contact' }
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-full px-8">
        <div className="flex items-center justify-between h-20">
          {/* ロゴ */}
          <div className="flex items-center">
            <a href="/" className="text-lg tracking-wider font-normal text-black">
              日本狩猟協会
            </a>
          </div>

          {/* デスクトップナビゲーション */}
          <nav className="hidden md:flex items-center space-x-12">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-xs tracking-wider text-gray-700 hover:text-black transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* アクションボタン */}
          <div className="flex items-center space-x-6">
            <button className="text-gray-700 hover:text-black transition-colors duration-200">
              <Search size={18} />
            </button>
            <button className="text-gray-700 hover:text-black transition-colors duration-200">
              <ShoppingBag size={18} />
            </button>

            {/* モバイルメニューボタン */}
            <button
              className="md:hidden text-gray-700 hover:text-black transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* モバイルナビゲーション */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-6">
            <nav className="flex flex-col space-y-6">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-xs tracking-wider text-gray-700 hover:text-black transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}