import { notFound } from 'next/navigation'
import Image from 'next/image'

const episodes = [
  {
    slug: 'ep044',
    title: '凯茜·伍德的信仰：当长期主义遇上比特币',
    coverImage: '/covers/ep044.jpg',
    tags: ['Bitcoin', 'Web3', 'Investment', 'Cathie Wood'],
    description: '"木头姐" Cathie Wood 押注创新科技与加密资产，喊出"比特币100万美元"，这是远见，还是幻觉？\n\n本期邀请4位 Web3 从业者围绕长期主义展开讨论，深入探讨比特币的未来价值与投资策略。',
    spaceLink: 'https://x.com/i/spaces/1vOxwllaaaLGB',
    date: '2025年8月23日 6:00 AM PDT / 9:00 PM CST',
    guests: ['Cathie Wood', 'Web3 专家 A', '投资分析师 B', '区块链研究员 C']
  },
  {
    slug: 'ep043',
    title: 'DeFi 深度解析：金融民主化的未来',
    coverImage: '/covers/ep043.jpg',
    tags: ['DeFi', 'Lending', 'Stablecoins', 'Finance'],
    description: '深入了解去中心化金融的机制、机遇与挑战。探讨 DeFi 如何重塑传统金融体系，以及用户如何安全参与去中心化金融活动。',
    spaceLink: 'https://x.com/i/spaces/1ynJOMEBYVrKR',
    date: '2025年8月20日 6:00 AM PDT / 9:00 PM CST',
    guests: ['DeFi 协议创始人', '金融科技专家', '风险管理顾问']
  },
  {
    slug: 'ep042',
    title: 'NFT 艺术革命：数字收藏品时代',
    coverImage: '/covers/ep042.jpg',
    tags: ['NFT', 'Ethereum', 'Art', 'Digital Assets'],
    description: '探讨 NFT 如何改变艺术创作和收藏的范式。从技术原理到市场趋势，全面解析数字艺术生态的发展现状。',
    spaceLink: 'https://x.com/i/spaces/example3',
    date: '2025年8月17日 6:00 AM PDT / 9:00 PM CST',
    guests: ['数字艺术家', 'NFT 平台创始人', '艺术收藏家']
  }
]

export default function EpisodeDetail({ params }: { params: { slug: string } }) {
  const episode = episodes.find((ep) => ep.slug === params.slug)
  if (!episode) return notFound()

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#a0c4ff] via-[#bdb2ff] to-[#ffd6a5] px-6 py-8">
      <div className="max-w-4xl mx-auto">
        {/* 节目标题 - 顶部居中 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {episode.title}
          </h1>
        </div>

        {/* 海报缩略图 - 居中显示，尺寸缩小 */}
        <div className="flex justify-center mb-8">
          <div className="w-full max-w-md overflow-hidden rounded-lg shadow-lg">
            <Image
              src={episode.coverImage}
              alt={episode.title}
              width={400}
              height={300}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* 信息模块卡片 */}
        <div className="max-w-3xl mx-auto space-y-6">
          {/* 节目简介 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3">🎙</span>
              <h2 className="text-xl font-semibold text-gray-900">节目简介</h2>
            </div>
            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
              {episode.description}
            </div>
          </div>

          {/* 相关标签 */}
          {episode.tags && episode.tags.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">📎</span>
                <h2 className="text-xl font-semibold text-gray-900">相关标签</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {episode.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-orange-100 text-orange-700 text-sm rounded-full hover:bg-orange-200 transition-colors cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* X Space 直播链接 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3">🔗</span>
              <h2 className="text-xl font-semibold text-gray-900">X Space 直播</h2>
            </div>
            <a
              href={episode.spaceLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
            >
              <span className="mr-2">🎧</span>
              Listen on X
            </a>
          </div>

          {/* 节目时间 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3">📅</span>
              <h2 className="text-xl font-semibold text-gray-900">节目时间</h2>
            </div>
            <p className="text-gray-700 text-lg">
              {episode.date}
            </p>
          </div>

          {/* 嘉宾列表 */}
          {episode.guests && episode.guests.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">🧠</span>
                <h2 className="text-xl font-semibold text-gray-900">嘉宾列表</h2>
              </div>
              <div className="space-y-2">
                {episode.guests.map((guest, index) => (
                  <div key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                    <span className="text-gray-700">{guest}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
