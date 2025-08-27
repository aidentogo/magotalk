import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getEpisodeBySlug, getCoverImageUrl } from '@/lib/supabase'

export default async function EpisodeDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const episode = await getEpisodeBySlug(slug)
  
  if (!episode) {
    return notFound()
  }

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
              src={getCoverImageUrl(episode.cover_image)}
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
              <h2 className="text-xl font-semibold text-gray-900">Episode Summary</h2>
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
                <h2 className="text-xl font-semibold text-gray-900">Tags</h2>
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
          {episode.space_link && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">🔗</span>
                <h2 className="text-xl font-semibold text-gray-900">X Space Live Link</h2>
              </div>
              <a
                href={episode.space_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
              >
                <span className="mr-2">🎧</span>
                Listen on X
              </a>
            </div>
          )}

          {/* 节目时间 */}
          {episode.date && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">📅</span>
                <h2 className="text-xl font-semibold text-gray-900">Episode Time</h2>
              </div>
              <p className="text-gray-700 text-lg">
                {episode.date}
              </p>
            </div>
          )}

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
