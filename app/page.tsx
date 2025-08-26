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
    <div className="min-h-screen bg-white">

      {/* 英雄区域 */}
      <div className="bg-gradient-to-br from-orange-500 to-orange-600 px-6 pt-5 pb-2 lg:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            {/* 左侧内容 */}
            <div className="w-full lg:w-1/2 text-white mb-1 lg:mb-0 text-center lg:text-left">
              <h1 className="text-5xl lg:text-6xl font-bold mb-4 leading-tight tracking-tight">
                <span className="block lg:inline">MagoTalk</span>{' '}
                <span className="block lg:inline">区块链与金融</span>
              </h1>
              <p className="text-xl text-orange-100 mb-8">
              Web3, Blockchain, DeFi, NFT & The Future of Money and Finance
              </p>
            </div>

            {/* 右侧币种 Logo 容器 */}
            <div className="lg:w-1/2 w-full flex lg:justify-end mt-0 lg:mt-0">
              {/* 小屏：占满一行并均匀分布；大屏：贴右且等间距更宽 */}
              <div className="flex w-full justify-evenly items-center lg:w-auto lg:justify-end lg:gap-8">
                <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-white/95 p-2 lg:p-3 shadow-sm">
                  <img src="/icons/coins/btc.svg"  alt="Bitcoin"      className="block w-full h-full object-contain" />
                </div>
                <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-white/95 p-2 lg:p-3 shadow-sm">
                  <img src="/icons/coins/eth.svg"  alt="Ethereum"     className="block w-full h-full object-contain" />
                </div>
                <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-white/95 p-2 lg:p-3 shadow-sm">
                  <img src="/icons/coins/usdt.svg" alt="Tether (USDT)" className="block w-full h-full object-contain" />
                </div>
                <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-white/95 p-2 lg:p-3 shadow-sm">
                  <img src="/icons/coins/usdc.svg" alt="USD Coin"     className="block w-full h-full object-contain" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 搜索功能 */}
      {isSearchOpen && (
        <div className="px-6 py-4 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="搜索节目标题、简介或标签..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-10 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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

      {/* 分类导航 */}
      <div className="px-6 py-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategorySelect(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategories.includes(category)
                    ? 'bg-orange-500 text-white shadow-md transform scale-105' 
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-orange-300 hover:text-orange-600 hover:bg-orange-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          {selectedCategories.length > 0 && !selectedCategories.includes('All Categories') && (
            <div className="mt-4 text-sm text-gray-600">
              已选择: {selectedCategories.join(', ')} ({filteredEpisodes.length} 个节目)
            </div>
          )}
        </div>
      </div>

      {/* 节目网格 */}
      <div className="px-6 py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
              <p className="mt-4 text-gray-600">加载节目中...</p>
            </div>
          ) : filteredEpisodes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">暂无节目数据</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredEpisodes.map((episode) => (
                <Link key={episode.slug} href={`/episodes/${episode.slug}`} className="block">
                  <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1">
                    {/* 封面图片 */}
                    <div className="aspect-square relative bg-gray-100 overflow-hidden">
                      <Image
                        src={getCoverImageUrl(episode.cover_image)}
                        alt={episode.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    {/* 内容区域 */}
                    <div className="p-4 flex flex-col h-full">
                      {/* 标题 */}
                      <h3 className="text-base font-semibold text-gray-900 mb-3 line-clamp-2 leading-snug">
                        {episode.title}
                      </h3>
                      
                      {/* 节目标签 */}
                      {episode.tags && episode.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {episode.tags.slice(0, 4).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                          {episode.tags.length > 4 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                              +{episode.tags.length - 4}
                            </span>
                          )}
                        </div>
                      )}
                      
                      {/* 底部信息 - 使用 mt-auto 推到底部 */}
                      <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          <span className="truncate">{episode.date || '时间待定'}</span>
                        </div>
                        
                        {/* 播放按钮 */}
                        <div className="w-8 h-8 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center text-white transition-colors shadow-md">
                          <Play className="w-3 h-3 ml-0.5" />
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
      <footer className="bg-gray-50 border-t border-gray-200 py-8 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-gray-500">
            © 2025 MagoTalk. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
