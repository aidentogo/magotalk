export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#caffbf] via-[#9bf6ff] to-[#ffc6ff]">
      {/* 页面头部 */}
      <div className="bg-[#9bf6ff] border-b border-gray-200 px-6 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Us</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Mago Talk Blockchain & Finance
          </p>
        </div>
      </div>

      {/* 主要内容 */}
      <div className="px-6 py-7">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-3">
            {/* 左侧：我们的使命 */}
            <div className="bg-[#a0c4ff] rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About Us</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
              MagoTalk strives to be a trusted gateway for Web3 communities, curating reliable blockchain and financial knowledge that keeps audiences ahead of rapid innovation.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
              At MagoTalk, we see education and open access to information as vital drivers of decentralization. Our platform highlights diverse perspectives and documents the evolving realities of the blockchain world.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
              Covering topics from crypto assets and DeFi systems to NFT movements and governance experiments, MagoTalk creates space for dialogue that connects today's ideas with tomorrow's digital society.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Guest Bios</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* MAGO */}
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-3">
                    <img
                      src="/hosts/host1-mago.png"
                      alt="MAGO"
                      width={80}
                      height={80}
                      loading="lazy"
                      decoding="async"
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Mago</h3>
                  <p className="text-sm text-gray-600 mb-2">Investor</p>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    Mago Talk Founder &amp; Host
                  </p>
                </div>

                {/* TigerHunter */}
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-3">
                    <img
                      src="/hosts/host2-mago.jpg"
                      alt="TigerHunter"
                      width={80}
                      height={80}
                      loading="lazy"
                      decoding="async"
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">TigerHunter</h3>
                  <p className="text-sm text-gray-600 mb-2">Investor</p>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    Community Contributor
                  </p>
                </div>

                {/* KCVision */}
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-3">
                    <img
                      src="/hosts/host3-mago.jpg"
                      alt="KCVision"
                      width={80}
                      height={80}
                      loading="lazy"
                      decoding="async"
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">KCVision</h3>
                  <p className="text-sm text-gray-600 mb-2">Investor</p>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    Community Contributor
                  </p>
                </div>

                {/* Steven Zhu */}
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-3">
                    <img
                      src="/hosts/host4-mago.jpg"
                      alt="Steven Zhu"
                      width={80}
                      height={80}
                      loading="lazy"
                      decoding="async"
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Steven Zhu</h3>
                  <p className="text-sm text-gray-600 mb-2">Investor</p>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    Web3 Content Creator & Studio Forge
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