'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Nav() {
  const pathname = usePathname()
  
  return (
    <nav className="bg-[#FDFBEE] border-b border-gray-200 px-6 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/logo-magotalk.svg"
            alt="MagoTalk Logo"
            width={120}
            height={40}
            className="object-contain h-auto"
          />
        </div>

        {/* 右侧导航链接 */}
        <div className="flex items-center space-x-4 md:space-x-8 text-sm md:text-base">
          <Link 
            href="/" 
            className={`transition-colors ${
              pathname === '/' 
                ? 'text-orange-500 font-bold' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Home
          </Link>
          <Link 
            href="/about" 
            className={`transition-colors ${
              pathname === '/about' 
                ? 'text-orange-500 font-bold' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            About
          </Link>
          <Link 
            href="/contact" 
            className={`transition-colors ${
              pathname === '/contact' 
                ? 'text-orange-500 font-bold' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  )
}
