'use client'

import { usePathname } from 'next/navigation'
import Image from 'next/image'

export default function AboutPage() {
  const pathname = usePathname()
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#caffbf] via-[#9bf6ff] to-[#ffc6ff]">
      {/* 页面头部 */}
      <div className="bg-[#9bf6ff] border-b border-gray-200 px-6 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Us</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          MagoTalk 区块链与金融
          </p>
        </div>
      </div>

      {/* 主要内容 */}
      <div className="px-6 py-7">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-3">
            {/* 左侧：我们的使命 */}
            <div className="bg-[#a0c4ff] rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">关于我们</h2>
              <p className="text-gray-700 leading-relaxed">
                MagoTalk 致力于为 Web3 爱好者提供高质量的区块链与金融内容。帮助大家了解区块链技术的最新发展和金融信息。
              </p>
              
              <p className="text-gray-700 leading-relaxed mt-4">
                我们相信，教育与传播是推动去中心化理念普及的关键。MagoTalk 不仅提供一线的声音，也呈现全球区块链生态中的真实脉动。
              </p>
              
              <p className="text-gray-700 leading-relaxed mt-4">
                无论是加密资产、DeFi 协议、NFT 文化还是链上治理，我们用对话和声音构建一座通往未来的桥梁。
              </p>
              
              <p className="text-gray-700 leading-relaxed mt-6">
                MagoTalk is committed to delivering high-quality podcast content for Web3 enthusiasts. Through in-depth interviews and industry insights, we help our audience stay informed about the latest developments and future applications of blockchain technology.
              </p>
              
              <p className="text-gray-700 leading-relaxed mt-4">
                We believe that education and communication are fundamental to advancing the understanding of decentralized ecosystems. MagoTalk amplifies expert voices and captures the pulse of the global blockchain movement.
              </p>
              
              <p className="text-gray-700 leading-relaxed mt-4">
                Whether discussing crypto assets, DeFi protocols, NFT culture, or on-chain governance, our goal is to build a bridge to the future—one conversation at a time.
              </p>
            </div>

            {/* 右侧：主持人介绍 */}
            <div className="bg-[#bdb2ff] rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">嘉宾介绍</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* 主持人 1 - MAGO */}
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-3">
                    <Image
                      src="/hosts/host1 mago.PNG"
                      alt="MAGO"
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">MAGO</h3>
                  <p className="text-sm text-gray-600 mb-2">主持人</p>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    Mago Talk Founder & Host
                  </p>
                </div>

                {/* 主持人 2 - TigerHunter */}
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-3">
                    <Image
                      src="/hosts/host2 mago.JPG"
                      alt="TigerHunter"
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">TigerHunter</h3>
                  <p className="text-sm text-gray-600 mb-2">投资人</p>
                  <p className="text-xs text-gray-700 leading-relaxed">
                  Commumity Contributor
                  </p>
                </div>

                {/* 主持人 3 - KCVision */}
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-3">
                    <Image
                      src="/hosts/host3 mago.JPG"
                      alt="KCVision"
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">KCVision</h3>
                  <p className="text-sm text-gray-600 mb-2">投资人</p>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    Commumity Contributor
                  </p>
                </div>

                {/* 主持人 4 - Steven Zhu */}
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-3">
                    <Image
                      src="/hosts/host4 mago.JPG"
                      alt="Steven Zhu"
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Steven Zhu</h3>
                  <p className="text-sm text-gray-600 mb-2">Studio Forge</p>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    Web3 Content Creator
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
