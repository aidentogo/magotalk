// app/page.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Search, Play, Clock, User, X } from 'lucide-react'
import { useState } from 'react'

// 模拟数据：后续我们会改为从 Supabase 获取
const episodes = [
  {
    slug: 'ep044',
    cover_url: '/covers/ep044.jpg',
    title: 'Web3 革命：去中心化的未来',
    description: '探索区块链技术如何重塑互联网和数字经济的未来',
    duration: '42:15',
    host: 'MAGO',
    category: 'TECHNOLOGY',
    tags: ['Web3', 'Ethereum', 'DeFi']
  },
  {
    slug: 'ep043',
    cover_url: '/covers/ep043.jpg',
    title: 'DeFi 深度解析：金融民主化',
    description: '深入了解去中心化金融的机制、机遇与挑战',
    duration: '38:30',
    host: 'MAGO',
    category: 'BUSINESS',
    tags: ['DeFi', 'Lending', 'Stablecoins']
  },
  {
    slug: 'ep042',
    cover_url: '/covers/ep042.jpg',
    title: 'NFT 艺术革命：数字收藏品时代',
    description: '探讨 NFT 如何改变艺术创作和收藏的范式',
    duration: '45:20',
    host: 'MAGO',
    category: 'ART',
    tags: ['NFT', 'Ethereum', 'Art']
  },
  {
    slug: 'ep041',
    cover_url: '/covers/ep044.jpg',
    title: '元宇宙：虚拟世界的无限可能',
    description: '探索元宇宙技术发展和未来应用场景',
    duration: '51:10',
    host: 'MAGO',
    category: 'TECHNOLOGY',
    tags: ['Metaverse', 'Web3', 'VR']
  },
  {
    slug: 'ep040',
    cover_url: '/covers/ep043.jpg',
    title: 'DAO 治理：社区驱动的组织模式',
    description: '分析去中心化自治组织的运作机制和治理模式',
    duration: '39:45',
    host: 'MAGO',
    category: 'BUSINESS',
    tags: ['DAO', 'Governance', 'Community']
  },
  {
    slug: 'ep039',
    cover_url: '/covers/ep042.jpg',
    title: 'Layer2 扩容：以太坊的未来之路',
    description: '深入解析 Layer2 解决方案的技术原理和应用',
    duration: '47:30',
    host: 'MAGO',
    category: 'TECHNOLOGY'
  },
  {
    slug: 'ep038',
    cover_url: '/covers/ep044.jpg',
    title: '智能合约安全：代码审计的重要性',
    description: '探讨智能合约安全漏洞和审计最佳实践',
    duration: '44:15',
    host: 'MAGO',
    category: 'TECHNOLOGY'
  },
  {
    slug: 'ep037',
    cover_url: '/covers/ep043.jpg',
    title: '跨链技术：多链生态的互联互通',
    description: '分析跨链桥接技术和多链生态系统发展',
    duration: '41:20',
    host: 'MAGO',
    category: 'TECHNOLOGY'
  },
  {
    slug: 'ep036',
    cover_url: '/covers/ep042.jpg',
    title: 'GameFi：游戏与金融的融合',
    description: '探索游戏化金融和Play-to-Earn模式',
    duration: '48:30',
    host: 'MAGO',
    category: 'BUSINESS'
  },
  {
    slug: 'ep035',
    cover_url: '/covers/ep044.jpg',
    title: 'SocialFi：去中心化社交网络',
    description: '探讨Web3社交平台和用户激励机制',
    duration: '39:45',
    host: 'MAGO',
    category: 'TECHNOLOGY'
  },
  {
    slug: 'ep034',
    cover_url: '/covers/ep043.jpg',
    title: '零知识证明：隐私保护技术',
    description: '深入解析ZK-SNARK和隐私计算技术',
    duration: '52:10',
    host: 'MAGO',
    category: 'TECHNOLOGY'
  },
  {
    slug: 'ep033',
    cover_url: '/covers/ep042.jpg',
    title: '去中心化存储：IPFS与Filecoin',
    description: '探讨分布式存储技术和数据主权',
    duration: '46:25',
    host: 'MAGO',
    category: 'TECHNOLOGY'
  },
  {
    slug: 'ep032',
    cover_url: '/covers/ep044.jpg',
    title: 'Web3投资策略：风险与机遇',
    description: '分析Web3项目投资方法和风险管理',
    duration: '43:40',
    host: 'MAGO',
    category: 'BUSINESS'
  },
  {
    slug: 'ep031',
    cover_url: '/covers/ep043.jpg',
    title: '去中心化身份：DID与数字主权',
    description: '探讨自主身份管理和隐私保护',
    duration: '47:15',
    host: 'MAGO',
    category: 'TECHNOLOGY'
  },
  {
    slug: 'ep030',
    cover_url: '/covers/ep042.jpg',
    title: 'DeFi衍生品：期权与期货',
    description: '深入解析去中心化衍生品交易',
    duration: '50:30',
    host: 'MAGO',
    category: 'BUSINESS'
  },
  {
    slug: 'ep029',
    cover_url: '/covers/ep044.jpg',
    title: '区块链治理：共识机制演进',
    description: '探讨PoS、DPoS等共识机制发展',
    duration: '45:20',
    host: 'MAGO',
    category: 'TECHNOLOGY'
  },
  {
    slug: 'ep028',
    cover_url: '/covers/ep043.jpg',
    title: 'NFT市场分析：趋势与预测',
    description: '分析NFT市场动态和投资机会',
    duration: '41:35',
    host: 'MAGO',
    category: 'BUSINESS'
  },
  {
    slug: 'ep027',
    cover_url: '/covers/ep042.jpg',
    title: '去中心化计算：分布式算力',
    description: '探讨分布式计算和算力共享',
    duration: '48:50',
    host: 'MAGO',
    category: 'TECHNOLOGY'
  },
  {
    slug: 'ep026',
    cover_url: '/covers/ep044.jpg',
    title: 'Web3基础设施：节点与网络',
    description: '深入解析区块链基础设施架构',
    duration: '44:15',
    host: 'MAGO',
    category: 'TECHNOLOGY'
  },
  {
    slug: 'ep025',
    cover_url: '/covers/ep043.jpg',
    title: '去中心化预测市场',
    description: '探讨预测市场和信息聚合机制',
    duration: '39:20',
    host: 'MAGO',
    category: 'BUSINESS'
  },
  {
    slug: 'ep024',
    cover_url: '/covers/ep042.jpg',
    title: '区块链互操作性：多链未来',
    description: '分析跨链技术和生态系统整合',
    duration: '46:40',
    host: 'MAGO',
    category: 'TECHNOLOGY'
  },
  {
    slug: 'ep023',
    cover_url: '/covers/ep044.jpg',
    title: 'DeFi保险：风险对冲机制',
    description: '探讨去中心化保险和风险管理',
    duration: '42:55',
    host: 'MAGO',
    category: 'BUSINESS'
  },
  {
    slug: 'ep022',
    cover_url: '/covers/ep043.jpg',
    title: '去中心化内容创作',
    description: '分析Web3内容平台和创作者经济',
    duration: '47:30',
    host: 'MAGO',
    category: 'ART'
  },
  {
    slug: 'ep021',
    cover_url: '/covers/ep042.jpg',
    title: '区块链可扩展性解决方案',
    description: '深入解析Layer2和分片技术',
    duration: '50:15',
    host: 'MAGO',
    category: 'TECHNOLOGY'
  },
  {
    slug: 'ep020',
    cover_url: '/covers/ep044.jpg',
    title: '去中心化借贷协议',
    description: '探讨DeFi借贷平台和利率机制',
    duration: '43:25',
    host: 'MAGO',
    category: 'BUSINESS'
  },
  {
    slug: 'ep019',
    cover_url: '/covers/ep043.jpg',
    title: 'Web3数据市场',
    description: '分析去中心化数据交易和隐私',
    duration: '45:50',
    host: 'MAGO',
    category: 'TECHNOLOGY'
  },
  {
    slug: 'ep018',
    cover_url: '/covers/ep042.jpg',
    title: '去中心化交易所演进',
    description: '探讨DEX技术发展和用户体验',
    duration: '41:10',
    host: 'MAGO',
    category: 'BUSINESS'
  },
  {
    slug: 'ep017',
    cover_url: '/covers/ep044.jpg',
    title: '区块链隐私技术',
    description: '深入解析隐私保护和匿名技术',
    duration: '48:35',
    host: 'MAGO',
    category: 'TECHNOLOGY'
  },
  {
    slug: 'ep016',
    cover_url: '/covers/ep043.jpg',
    title: 'NFT艺术市场趋势',
    description: '分析数字艺术市场和发展方向',
    duration: '44:20',
    host: 'MAGO',
    category: 'ART'
  },
  {
    slug: 'ep015',
    cover_url: '/covers/ep042.jpg',
    title: '去中心化治理实践',
    description: '探讨DAO治理模式和投票机制',
    duration: '46:15',
    host: 'MAGO',
    category: 'BUSINESS'
  },
  {
    slug: 'ep014',
    cover_url: '/covers/ep044.jpg',
    title: 'Web3身份验证',
    description: '分析去中心化身份和认证系统',
    duration: '42:40',
    host: 'MAGO',
    category: 'TECHNOLOGY'
  },
  {
    slug: 'ep013',
    cover_url: '/covers/ep043.jpg',
    title: 'DeFi收益聚合器',
    description: '探讨收益优化和自动化策略',
    duration: '47:55',
    host: 'MAGO',
    category: 'BUSINESS'
  },
  {
    slug: 'ep012',
    cover_url: '/covers/ep042.jpg',
    title: '区块链网络安全',
    description: '深入解析网络安全威胁和防护',
    duration: '49:30',
    host: 'MAGO',
    category: 'TECHNOLOGY'
  },
  {
    slug: 'ep011',
    cover_url: '/covers/ep044.jpg',
    title: '去中心化云存储',
    description: '探讨分布式存储和文件共享',
    duration: '43:15',
    host: 'MAGO',
    category: 'TECHNOLOGY'
  },
  {
    slug: 'ep010',
    cover_url: '/covers/ep043.jpg',
    title: 'NFT游戏生态系统',
    description: '分析游戏NFT和虚拟资产经济',
    duration: '45:25',
    host: 'MAGO',
    category: 'BUSINESS'
  },
  {
    slug: 'ep009',
    cover_url: '/covers/ep042.jpg',
    title: 'Web3开发者工具',
    description: '探讨区块链开发框架和工具链',
    duration: '50:45',
    host: 'MAGO',
    category: 'TECHNOLOGY'
  },
  {
    slug: 'ep008',
    cover_url: '/covers/ep044.jpg',
    title: '去中心化预测平台',
    description: '分析预测市场和信息聚合',
    duration: '41:50',
    host: 'MAGO',
    category: 'BUSINESS'
  },
  {
    slug: 'ep007',
    cover_url: '/covers/ep043.jpg',
    title: '区块链数据索引',
    description: '探讨链上数据查询和分析',
    duration: '46:20',
    host: 'MAGO',
    category: 'TECHNOLOGY'
  },
  {
    slug: 'ep006',
    cover_url: '/covers/ep042.jpg',
    title: 'DeFi风险管理',
    description: '深入解析DeFi风险控制机制',
    duration: '44:35',
    host: 'MAGO',
    category: 'BUSINESS'
  },
  {
    slug: 'ep005',
    cover_url: '/covers/ep044.jpg',
    title: 'Web3用户体验设计',
    description: '探讨去中心化应用的用户界面',
    duration: '47:10',
    host: 'MAGO',
    category: 'TECHNOLOGY'
  },
  {
    slug: 'ep004',
    cover_url: '/covers/ep043.jpg',
    title: '去中心化内容分发',
    description: '分析Web3内容平台和分发机制',
    duration: '42:25',
    host: 'MAGO',
    category: 'BUSINESS'
  },
  {
    slug: 'ep003',
    cover_url: '/covers/ep042.jpg',
    title: '区块链共识算法',
    description: '深入解析各种共识机制原理',
    duration: '48:40',
    host: 'MAGO',
    category: 'TECHNOLOGY'
  },
  {
    slug: 'ep002',
    cover_url: '/covers/ep044.jpg',
    title: 'NFT收藏品市场',
    description: '探讨数字收藏品和稀缺性经济',
    duration: '45:15',
    host: 'MAGO',
    category: 'ART'
  },
  {
    slug: 'ep001',
    cover_url: '/covers/ep043.jpg',
    title: 'Web3生态系统概览',
    description: '全面了解Web3技术栈和应用',
    duration: '51:20',
    host: 'MAGO',
    category: 'TECHNOLOGY'
  }
]

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
  
  // 监听URL参数来触发搜索
  const handleSearchTrigger = () => {
    setIsSearchOpen(true)
  }
  
  // 搜索过滤逻辑
  const filteredEpisodes = episodes.filter(episode => {
    if (!searchQuery.trim()) return true
    const query = searchQuery.toLowerCase()
    return (
      episode.title.toLowerCase().includes(query) ||
      episode.description.toLowerCase().includes(query) ||
      (episode.tags && episode.tags.some(tag => tag.toLowerCase().includes(query)))
    )
  })

  return (
    <div className="min-h-screen bg-white">

      {/* 英雄区域 */}
      <div className="bg-gradient-to-br from-orange-500 to-orange-600 px-6 py-1">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            {/* 左侧内容 */}
            <div className="lg:w-1/2 text-white mb-8 lg:mb-0">
              <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              MagoTalk 区块链与金融 
              </h1>
              <p className="text-xl text-orange-100 mb-8">
              Web3, Blockchain, DeFi, NFT & The Future of Money and Finance
              </p>
            </div>

            {/* 右侧图片 */}
            <div className="lg:w-1/2 flex justify-center">
              <div className="w-64 h-64 lg:w-80 lg:h-80 bg-white/10 rounded-full flex items-center justify-center">
                <div className="w-56 h-56 lg:w-72 lg:h-72 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-32 h-32 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                  </svg>
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
            {categories.map((category, index) => (
              <button
                key={category}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  index === 0 
                    ? 'bg-green-600 text-white' 
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 节目网格 */}
      <div className="px-6 py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredEpisodes.map((episode) => (
              <div key={episode.slug} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                {/* 封面图片 */}
                <div className="aspect-square relative bg-gray-100 rounded-t-lg overflow-hidden">
                  <Image
                    src={episode.cover_url}
                    alt={episode.title}
                    fill
                    className="object-contain p-2 hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                {/* 内容区域 */}
                <div className="p-3 flex flex-col h-full">
                  {/* 标题 */}
                  <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 leading-tight">
                    {episode.title}
                  </h3>
                  
                  {/* 分类标签 */}
                  <div className="mb-2">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                      {episode.category}
                    </span>
                  </div>
                  
                  {/* 节目标签 */}
                  {episode.tags && episode.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {episode.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                      {episode.tags.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{episode.tags.length - 2}
                        </span>
                      )}
                    </div>
                  )}
                  
                  {/* 底部信息 - 使用 mt-auto 推到底部 */}
                  <div className="flex items-center justify-between mt-auto pt-2">
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{episode.duration}</span>
                    </div>
                    
                    {/* 播放按钮 */}
                    <Link href={`/episodes/${episode.slug}`}>
                      <button className="w-6 h-6 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center text-white transition-colors">
                        <Play className="w-3 h-3 ml-0.5" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
