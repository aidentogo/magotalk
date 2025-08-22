'use client'

import { usePathname } from 'next/navigation'

export default function AboutPage() {
  const pathname = usePathname()
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 页面头部 */}
      <div className="bg-white border-b border-gray-200 px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Us</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            探索 Web3 世界的深度对话，与行业领袖一起探讨区块链、DeFi、NFT 等前沿话题
          </p>
        </div>
      </div>

      {/* 主要内容 */}
      <div className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* 左侧内容 */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">我们的使命</h2>
                <p className="text-gray-700 leading-relaxed">
                  MagoTalk 致力于为 Web3 爱好者提供高质量的播客内容，通过深度访谈和行业洞察，
                  帮助听众了解区块链技术的最新发展和应用前景。
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">内容特色</h2>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-3">•</span>
                    深度技术解析和行业趋势分析
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-3">•</span>
                    与 Web3 领域专家和创业者的独家对话
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-3">•</span>
                    实用的投资策略和风险管理建议
                  </li>
                </ul>
              </div>
            </div>

            {/* 右侧内容 */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">主持人介绍</h2>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xl">M</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">MAGO</h3>
                    <p className="text-gray-600">Web3 播客主持人</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  拥有多年区块链行业经验，专注于 DeFi、NFT 和元宇宙领域的研究。
                  致力于通过播客形式传播 Web3 知识，连接行业内的优秀人才。
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">联系我们</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  如果您有任何建议、合作意向或想要分享的内容，欢迎与我们联系。
                </p>
                <a 
                  href="/contact" 
                  className="inline-flex items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
                >
                  联系我们
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
