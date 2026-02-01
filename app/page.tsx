// app/page.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Search, Play, Clock, User, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { getEpisodes, getCoverImageUrl, Episode } from '@/lib/supabase'

const categories = [
  'All Categories',
  'Bitcoin', 'Ethereum', 'DeFi', 'Solana', 'Avalanche', 'Polygon', 'Cardano',
  'NFT', 'Layer 2', 'MEME', 'Lending', 'Stablecoins', 'GameFi',
  'SocialFi', 'RWA', 'DAO', 'Wallets', 'Chainlink', 'Privacy',
  'Web3', 'Regulation', 'Cross-Chain', 'Metaverse', 'Staking', 'Yield Farming', 'BNB Chain'
]

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['All Categories'])
  
  // 获取节目数据
  useEffect(() => {
    async function fetchEpisodes() {
      try {
        const data = await getEpisodes()
        setEpisodes(data)
      } catch (error) {
        console.error('获取节目数据失败:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchEpisodes()
  }, [])
  
  // 监听URL参数来触发搜索
  const handleSearchTrigger = () => {
    setIsSearchOpen(true)
  }
  
  // 处理分类选择
  const handleCategorySelect = (category: string) => {
    if (category === 'All Categories') {
      setSelectedCategories(['All Categories'])
    } else {
      setSelectedCategories(prev => {
        const newCategories = prev.filter(cat => cat !== 'All Categories')
        if (newCategories.includes(category)) {
          const filtered = newCategories.filter(cat => cat !== category)
          return filtered.length === 0 ? ['All Categories'] : filtered
        } else {
          return [...newCategories, category]
        }
      })
    }
  }
  
  // 搜索和筛选过滤逻辑
  const filteredEpisodes = episodes.filter(episode => {
    // 搜索过滤
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      const matchesSearch = (
        episode.title.toLowerCase().includes(query) ||
        episode.description.toLowerCase().includes(query) ||
        (episode.tags && episode.tags.some(tag => tag.toLowerCase().includes(query)))
      )
      if (!matchesSearch) return false
    }
    
    // 分类过滤
    if (!selectedCategories.includes('All Categories')) {
      const hasMatchingTag = episode.tags && episode.tags.some(tag => 
        selectedCategories.includes(tag)
      )
      if (!hasMatchingTag) return false
    }
    
    return true
  })

  return (
    <div className="min-h-screen bg-[#FDFBEE]">

      {/* 英雄区域 - 使用 flex + min-h 实现真正的垂直居中 */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 flex items-center min-h-[100px] md:min-h-[130px] lg:min-h-[150px]">
        <div className="max-w-7xl mx-auto w-full py-4 md:py-5 lg:py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* 左侧内容 - 移动端字体更大更有力量 */}
            <div className="w-full md:w-1/2 text-white text-center md:text-left">
              <h1 className="font-extrabold tracking-tight">
                {/* 第一行：移动端更大字号，更有冲击力 */}
                <span className="block text-4xl sm:text-5xl md:text-5xl lg:text-6xl leading-none">
                  Mago Talk
                </span>
                {/* 第二行：紧凑间距，视觉统一 */}
                <span className="block whitespace-nowrap text-lg sm:text-xl md:text-3xl lg:text-4xl leading-tight mt-0.5 md:mt-1">
                  Blockchain &amp; Finance
                </span>
              </h1>
            </div>

            {/* 右侧币种 Logo 容器 - 移动端隐藏以保持 Header 紧凑 */}
            <div className="hidden md:flex md:w-1/2 justify-end">
              <div className="flex items-center gap-4 lg:gap-6">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/95 p-2 shadow-sm">
                  <img src="/icons/coins/btc.svg"  alt="Bitcoin"      className="block w-full h-full object-contain" />
                </div>
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/95 p-2 shadow-sm">
                  <img src="/icons/coins/eth.svg"  alt="Ethereum"     className="block w-full h-full object-contain" />
                </div>
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/95 p-2 shadow-sm">
                  <img src="/icons/coins/usdt.svg" alt="Tether (USDT)" className="block w-full h-full object-contain" />
                </div>
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/95 p-2 shadow-sm">
                  <img src="/icons/coins/usdc.svg" alt="USD Coin"     className="block w-full h-full object-contain" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 搜索功能 */}
      {isSearchOpen && (
        <div className="px-6 py-4 md:py-3 bg-[#FDFBEE] border-b border-gray-200">
          <div className="max-w-7xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="搜索节目标题、简介或标签..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 md:py-2 pl-10 pr-12 border border-gray-300 rounded-xl md:rounded-lg bg-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                autoFocus
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <button
                onClick={() => {
                  setIsSearchOpen(false)
                  setSearchQuery('')
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {searchQuery && (
              <div className="mt-2 text-sm text-gray-600">
                找到 {filteredEpisodes.length} 个相关节目
              </div>
            )}
          </div>
        </div>
      )}

      {/* 分类导航 - 移动端隐藏，桌面端显示 */}
      <div className="hidden md:block px-6 pt-4 pb-2 md:pt-4 md:pb-2 lg:pt-3 lg:pb-2 bg-[#FDFBEE]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategorySelect(category)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategories.includes(category)
                    ? 'bg-orange-500 text-white' 
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-orange-300 hover:text-orange-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          {selectedCategories.length > 0 && !selectedCategories.includes('All Categories') && (
            <div className="mt-2 text-sm text-gray-600">
              已选择: {selectedCategories.join(', ')} ({filteredEpisodes.length} 个节目)
            </div>
          )}
        </div>
      </div>

      {/* 节目网格 */}
      <div className="px-6 pt-2 pb-8 md:pt-2 md:pb-6 lg:pt-2 lg:pb-5 bg-[#FDFBEE]">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="text-center py-10 md:py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
              <p className="mt-4 text-gray-600">加载节目中...</p>
            </div>
          ) : filteredEpisodes.length === 0 ? (
            <div className="text-center py-10 md:py-8">
              <p className="text-gray-600">暂无节目数据</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-5 lg:gap-4">
              {filteredEpisodes.map((episode) => (
                <Link key={episode.slug} href={`/episodes/${episode.slug}`} className="block">
                  <div className="bg-white rounded-xl md:rounded-lg shadow-md md:shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-0.5">
                    {/* 封面图片 */}
                    <div className="aspect-square relative bg-gray-100 overflow-hidden">
                      <Image
                        src={getCoverImageUrl(episode.cover_image)}
                        alt={episode.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    {/* 内容区域 - 紧凑的垂直节奏 */}
                    <div className="px-4 pt-1 pb-3 md:px-3 md:pt-1 md:pb-2.5 flex flex-col">
                      {/* 标题 - 与 tag 保持紧密关联 */}
                      <h3 className="text-base md:text-sm font-semibold text-gray-900 mb-1 md:mb-0.5 line-clamp-2 leading-snug md:leading-snug">
                        {episode.title}
                      </h3>
                      
                      {/* 节目标签 - 紧贴标题的注解，无额外 mb */}
                      {episode.tags && episode.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 md:gap-0.5 mt-0 mb-1 md:mb-0.5">
                          {episode.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 md:px-1.5 py-0.5 md:py-0.5 bg-gray-100 md:bg-transparent text-gray-500 md:text-gray-400 text-xs leading-none"
                            >
                              {tag}
                            </span>
                          ))}
                          {episode.tags.length > 3 && (
                            <span className="px-2 md:px-1.5 py-0.5 md:py-0.5 bg-gray-100 md:bg-transparent text-gray-400 text-xs leading-none">
                              +{episode.tags.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                      
                      {/* 底部信息 - mt 控制与 tag 的距离 */}
                      <div className="flex items-center justify-between mt-0.5 md:mt-0.5 pt-0.5 md:pt-0.5 border-t border-gray-100">
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          <span className="truncate">{episode.date || '时间待定'}</span>
                        </div>
                        
                        {/* 播放按钮 - 唯一的橙色强调 */}
                        <div className="w-6 h-6 md:w-6 md:h-6 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center text-white transition-colors">
                          <Play className="w-3 h-3 md:w-2.5 md:h-2.5 ml-0.5" />
                        </div>
                      </div>
                    </div>
            </div>
          </Link>
        ))}
      </div>
          )}
        </div>
      </div>

      {/* 页脚 */}
      <footer className="bg-[#FDFBEE] border-t border-gray-200 py-6 md:py-5 px-6">
        <div className="max-w-7xl mx-auto text-center">
          {(() => {
            const year = new Date().getFullYear()
            return (
          <p className="text-sm text-gray-500">
              © {year} MagoTalk. All rights reserved.
          </p>
            )
          })()}
        </div>
      </footer>
    </div>
  )
}
