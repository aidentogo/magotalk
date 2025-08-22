import { notFound } from 'next/navigation'
import Image from 'next/image'

const episodes = [
  {
    slug: 'ep044',
    title: '凯茜·伍德的信仰：当长期主义遇上比特币',
    date: 'August 23, 2025',
    summary:
      '“木头姐” Cathie Wood 押注创新科技与加密资产，喊出“比特币100万美元”，这是远见，还是幻觉？\n\n本期邀请4位 Web3 从业者围绕长期主义展开讨论，欢迎点击播放收听。',
    video_url: 'https://x.com/i/spaces/1vOxwllaaaLGB',
    cover_url: '/covers/ep044.jpg',
    tags: ['Bitcoin', 'Web3', 'Investment']
  },
]

export default function EpisodeDetail({ params }: { params: { slug: string } }) {
  const episode = episodes.find((ep) => ep.slug === params.slug)
  if (!episode) return notFound()

  return (
    <main className="min-h-screen bg-white px-6 py-8">
      <div className="max-w-4xl mx-auto">
        {/* 海报图 */}
        <div className="w-full max-w-2xl mx-auto mb-8 overflow-hidden rounded-lg shadow-sm">
          <Image
            src={episode.cover_url}
            alt={episode.title}
            width={600}
            height={400}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* 内容区域 */}
        <div className="max-w-3xl mx-auto">
          {/* 标题 */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{episode.title}</h1>
          <p className="text-gray-500 text-sm mb-4">{episode.date}</p>

          {/* 标签 */}
          {episode.tags && episode.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {episode.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* 摘要 */}
          <div className="text-gray-700 text-lg leading-relaxed mb-8 whitespace-pre-line">
            {episode.summary}
          </div>

          {/* Listen on X 按钮 */}
          <a
            href={episode.video_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
          >
            <span className="mr-2">🎧</span>
            Listen on X
          </a>
        </div>
      </div>
    </main>
  )
}
