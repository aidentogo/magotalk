export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FDFBEE]">
      {/* 页面头部 - 渐变仅用于 Header，高度受控 */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-6 md:py-8" style={{ maxHeight: '160px' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">About Us</h1>
          <p className="text-lg md:text-xl text-orange-100 max-w-2xl mx-auto">
            Mago Talk Blockchain & Finance
          </p>
        </div>
      </div>

      {/* 主要内容 */}
      <div className="px-6 py-10 md:py-8 lg:py-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 md:gap-5 lg:gap-4">
            {/* 左侧：我们的使命 */}
            <div className="bg-white rounded-xl md:rounded-lg shadow-md md:shadow-sm p-6 md:p-5">
              <h2 className="text-2xl md:text-xl font-bold text-gray-900 mb-4 md:mb-3">About Us</h2>
              
              <h3 className="text-xl md:text-lg font-semibold text-gray-800 mb-3 md:mb-2">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed md:leading-normal text-base md:text-sm">
              MagoTalk strives to be a trusted gateway for Web3 communities, curating reliable blockchain and financial knowledge that keeps audiences ahead of rapid innovation.
              </p>
              <p className="text-gray-700 leading-relaxed md:leading-normal text-base md:text-sm mt-4 md:mt-3">
              At MagoTalk, we see education and open access to information as vital drivers of decentralization. Our platform highlights diverse perspectives and documents the evolving realities of the blockchain world.
              </p>
              <p className="text-gray-700 leading-relaxed md:leading-normal text-base md:text-sm mt-4 md:mt-3">
              Covering topics from crypto assets and DeFi systems to NFT movements and governance experiments, MagoTalk creates space for dialogue that connects today&apos;s ideas with tomorrow&apos;s digital society.
              </p>
              
              <h3 className="text-xl md:text-lg font-semibold text-gray-800 mb-3 md:mb-2 mt-6 md:mt-5">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed md:leading-normal text-base md:text-sm">
                MagoTalk is committed to delivering high-quality podcast content for Web3 enthusiasts. Through in-depth interviews and industry insights, we help our audience stay informed about the latest developments and future applications of blockchain technology.
              </p>
              <p className="text-gray-700 leading-relaxed md:leading-normal text-base md:text-sm mt-4 md:mt-3">
                We believe that education and communication are fundamental to advancing the understanding of decentralized ecosystems. MagoTalk amplifies expert voices and captures the pulse of the global blockchain movement.
              </p>
              <p className="text-gray-700 leading-relaxed md:leading-normal text-base md:text-sm mt-4 md:mt-3">
                Whether discussing crypto assets, DeFi protocols, NFT culture, or on-chain governance, our goal is to build a bridge to the future—one conversation at a time.
              </p>
            </div>

            {/* 右侧：主持人介绍 */}
            <div className="bg-white rounded-xl md:rounded-lg shadow-md md:shadow-sm p-6 md:p-5">
              <h2 className="text-2xl md:text-xl font-bold text-gray-900 mb-6 md:mb-4">Guest Bios</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-4">
                {/* MAGO */}
                <div className="text-center">
                  <div className="w-16 h-16 md:w-14 md:h-14 rounded-full overflow-hidden mx-auto mb-2">
                    <img
                      src="/hosts/host1-mago.png"
                      alt="MAGO"
                      width={80}
                      height={80}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <h3 className="text-base md:text-sm font-semibold text-gray-900 mb-0.5">Mago</h3>
                  <p className="text-sm md:text-xs text-gray-500 mb-1">Investor</p>
                  <p className="text-xs text-gray-600 leading-normal">
                    Mago Talk Founder &amp; Host
                  </p>
                </div>

                {/* TigerHunter */}
                <div className="text-center">
                  <div className="w-16 h-16 md:w-14 md:h-14 rounded-full overflow-hidden mx-auto mb-2">
                    <img
                      src="/hosts/host2-mago.jpg"
                      alt="TigerHunter"
                      width={80}
                      height={80}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <h3 className="text-base md:text-sm font-semibold text-gray-900 mb-0.5">TigerHunter</h3>
                  <p className="text-sm md:text-xs text-gray-500 mb-1">Investor</p>
                  <p className="text-xs text-gray-600 leading-normal">
                    Community Contributor
                  </p>
                </div>

                {/* KCVision */}
                <div className="text-center">
                  <div className="w-16 h-16 md:w-14 md:h-14 rounded-full overflow-hidden mx-auto mb-2">
                    <img
                      src="/hosts/host3-mago.jpg"
                      alt="KCVision"
                      width={80}
                      height={80}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <h3 className="text-base md:text-sm font-semibold text-gray-900 mb-0.5">KCVision</h3>
                  <p className="text-sm md:text-xs text-gray-500 mb-1">Investor</p>
                  <p className="text-xs text-gray-600 leading-normal">
                    Community Contributor
                  </p>
                </div>

                {/* Steven Zhu */}
                <div className="text-center">
                  <div className="w-16 h-16 md:w-14 md:h-14 rounded-full overflow-hidden mx-auto mb-2">
                    <img
                      src="/hosts/host4-mago.jpg"
                      alt="Steven Zhu"
                      width={80}
                      height={80}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <h3 className="text-base md:text-sm font-semibold text-gray-900 mb-0.5">Steven Zhu</h3>
                  <p className="text-sm md:text-xs text-gray-500 mb-1">Investor</p>
                  <p className="text-xs text-gray-600 leading-normal">
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