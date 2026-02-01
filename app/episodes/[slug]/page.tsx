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
    <main className="min-h-screen bg-[#FDFBEE]">
      {/* 页面头部 - 渐变仅用于 Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-6 md:py-8" style={{ maxHeight: '160px' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight md:leading-normal">
            {episode.title}
          </h1>
        </div>
      </div>

      <div className="px-6 py-10 md:py-8 lg:py-6">
        <div className="max-w-4xl mx-auto">
          {/* 海报缩略图 - 居中显示，尺寸缩小 */}
          <div className="flex justify-center mb-8 md:mb-6">
            <div className="w-full max-w-md overflow-hidden rounded-xl md:rounded-lg shadow-md md:shadow-sm">
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
          <div className="max-w-3xl mx-auto space-y-6 md:space-y-4">
            {/* 节目简介 */}
            <div className="bg-white rounded-xl md:rounded-lg shadow-md md:shadow-sm p-6 md:p-5">
              <div className="flex items-center mb-4 md:mb-3">
                <span className="text-2xl md:text-xl mr-3 md:mr-2">🎙</span>
                <h2 className="text-xl md:text-lg font-semibold text-gray-900">Episode Summary</h2>
              </div>
              <div className="text-gray-700 leading-relaxed md:leading-normal text-base md:text-sm whitespace-pre-line">
                {episode.description}
              </div>
            </div>

            {/* 相关标签 */}
            {episode.tags && episode.tags.length > 0 && (
              <div className="bg-white rounded-xl md:rounded-lg shadow-md md:shadow-sm p-6 md:p-5">
                <div className="flex items-center mb-4 md:mb-3">
                  <span className="text-2xl md:text-xl mr-3 md:mr-2">📎</span>
                  <h2 className="text-xl md:text-lg font-semibold text-gray-900">Tags</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {episode.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 md:px-2 md:py-0.5 bg-gray-100 text-gray-600 text-sm md:text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* X Space 直播链接 */}
            {episode.space_link && (
              <div className="bg-white rounded-xl md:rounded-lg shadow-md md:shadow-sm p-6 md:p-5">
                <div className="flex items-center mb-4 md:mb-3">
                  <span className="text-2xl md:text-xl mr-3 md:mr-2">🔗</span>
                  <h2 className="text-xl md:text-lg font-semibold text-gray-900">X Space Live Link</h2>
                </div>
                <a
                  href={episode.space_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-5 py-2.5 md:px-4 md:py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium text-base md:text-sm rounded-lg transition-colors"
                >
                  <span className="mr-2">🎧</span>
                  Listen on X
                </a>
              </div>
            )}

            {/* 节目时间 */}
            {episode.date && (
              <div className="bg-white rounded-xl md:rounded-lg shadow-md md:shadow-sm p-6 md:p-5">
                <div className="flex items-center mb-4 md:mb-3">
                  <span className="text-2xl md:text-xl mr-3 md:mr-2">📅</span>
                  <h2 className="text-xl md:text-lg font-semibold text-gray-900">Episode Time</h2>
                </div>
                <p className="text-gray-700 text-lg md:text-base">
                  {episode.date}
                </p>
              </div>
            )}

            {/* 嘉宾列表 */}
            {episode.guests && episode.guests.length > 0 && (
              <div className="bg-white rounded-xl md:rounded-lg shadow-md md:shadow-sm p-6 md:p-5">
                <div className="flex items-center mb-4 md:mb-3">
                  <span className="text-2xl md:text-xl mr-3 md:mr-2">🧠</span>
                  <h2 className="text-xl md:text-lg font-semibold text-gray-900">嘉宾列表</h2>
                </div>
                <div className="space-y-2">
                  {episode.guests.map((guest, index) => (
                    <div key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                      <span className="text-gray-700 text-base md:text-sm">{guest}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
