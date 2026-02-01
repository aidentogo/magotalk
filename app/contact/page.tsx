'use client'

import { usePathname } from 'next/navigation'

export default function ContactPage() {
  const pathname = usePathname()
  return (
    <div className="min-h-screen bg-[#FDFBEE]">
      {/* 页面头部 - 渐变仅用于 Header，高度受控 */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-6 md:py-8" style={{ maxHeight: '160px' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Contact Us</h1>
          <p className="text-lg md:text-xl text-orange-100 max-w-2xl mx-auto">
          Let's Connect
          </p>
        </div>
      </div>

      {/* 主要内容 */}
      <div className="px-6 py-10 md:py-8 lg:py-6">
        <div className="max-w-2xl mx-auto">
          <div className="space-y-6 md:space-y-4">
            {/* 联系方式 */}
            <div className="bg-white rounded-xl md:rounded-lg shadow-md md:shadow-sm p-6 md:p-5">
              <h2 className="text-2xl md:text-xl font-bold text-gray-900 mb-6 md:mb-4">Get in Touch</h2>
              
              <div className="space-y-5 md:space-y-4">
                <div className="flex items-start space-x-4 md:space-x-3">
                  <div className="w-10 h-10 md:w-8 md:h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-orange-600 text-lg md:text-base">📧</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 text-base md:text-sm">Email</h3>
                    <p className="text-gray-600 text-base md:text-sm">magotalk@aol.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 md:space-x-3">
                  <div className="w-10 h-10 md:w-8 md:h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-orange-600 text-lg md:text-base">🐦</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 text-base md:text-sm">X</h3>
                    <a 
                      href="https://x.com/MagoTalk" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-orange-600 transition-colors text-base md:text-sm"
                    >
                      @MagoTalk
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 合作机会 */}
            <div className="bg-white rounded-xl md:rounded-lg shadow-md md:shadow-sm p-6 md:p-5">
              <h2 className="text-2xl md:text-xl font-bold text-gray-900 mb-4 md:mb-3">Collaboration Opportunities</h2>
              <p className="text-gray-700 leading-relaxed md:leading-normal text-base md:text-sm">
              MagoTalk welcomes partnerships with Web3 experts, entrepreneurs, and project teams to advance blockchain education and decentralized innovation. By fostering collaboration in content co-creation, media initiatives, and community engagement, we aim to amplify thought leadership and strengthen the global Web3 ecosystem.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
