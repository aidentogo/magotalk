'use client'

import { usePathname } from 'next/navigation'

export default function ContactPage() {
  const pathname = usePathname()
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#caffbf] via-[#9bf6ff] to-[#ffc6ff]">
      {/* 页面头部 */}
      <div className="bg-[#9bf6ff] border-b border-gray-200 px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            我们期待听到您的声音，欢迎通过以下方式与我们联系
          </p>
        </div>
      </div>

      {/* 主要内容 */}
      <div className="px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="space-y-8">
            {/* 联系方式 */}
            <div className="bg-[#a0c4ff] rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">联系方式</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-orange-600 text-lg">📧</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">邮箱</h3>
                    <p className="text-gray-600">magotalk@aol.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-orange-600 text-lg">🐦</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">X</h3>
                    <a 
                      href="https://x.com/MagoTalk" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-orange-600 transition-colors"
                    >
                      @MagoTalk
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 合作机会 */}
            <div className="bg-[#bdb2ff] rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">合作机会</h2>
              <p className="text-gray-700 leading-relaxed">
                如果您是 Web3 领域的专家、创业者或项目方，欢迎与我们联系，
                探讨合作、内容共创等机会。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
