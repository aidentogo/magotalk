import { createClient } from '@supabase/supabase-js'

// 初始化 Supabase 客户端
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// 检查环境变量
if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase 环境变量未配置，将使用模拟数据')
  console.warn('请确保在 .env.local 中设置了 NEXT_PUBLIC_SUPABASE_URL 和 NEXT_PUBLIC_SUPABASE_ANON_KEY')
} else {
  console.log('Supabase 环境变量已配置，将连接真实数据库')
  console.log('URL:', supabaseUrl.substring(0, 30) + '...')
  console.log('Key:', supabaseKey.substring(0, 20) + '...')
}

const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseKey || 'placeholder-key'
)

// 节目数据类型定义
export interface Episode {
  slug: string
  title: string
  cover_image: string
  description: string
  tags: string[]
  date: string
  space_link: string
  guests?: string[]
  created_at: string
}

// 模拟数据（当 Supabase 未配置时使用）
const mockEpisodes: Episode[] = [
  {
    slug: 'ep044',
    title: '凯茜·伍德的信仰：当长期主义遇上比特币',
    cover_image: 'ep044.jpg',
    description: '"木头姐" Cathie Wood 押注创新科技与加密资产，喊出"比特币100万美元"，这是远见，还是幻觉？\n\n本期邀请4位 Web3 从业者围绕长期主义展开讨论，深入探讨比特币的未来价值与投资策略。',
    tags: ['Bitcoin', 'Web3', 'Investment'],
    date: '2025年8月23日 6:00 AM PDT / 9:00 PM CST',
    space_link: 'https://x.com/i/spaces/1vOxwllaaaLGB',
    guests: ['Cathie Wood', 'Web3 专家 A', '投资分析师 B', '区块链研究员 C'],
    created_at: '2025-08-23T00:00:00Z'
  },
  {
    slug: 'ep043',
    title: 'DeFi 深度解析：金融民主化的未来',
    cover_image: 'ep043.jpg',
    description: '深入了解去中心化金融的机制、机遇与挑战。探讨 DeFi 如何重塑传统金融体系，以及用户如何安全参与去中心化金融活动。',
    tags: ['DeFi', 'Lending', 'Stablecoins'],
    date: '2025年8月20日 6:00 AM PDT / 9:00 PM CST',
    space_link: 'https://x.com/i/spaces/example2',
    guests: ['DeFi 协议创始人', '金融科技专家', '风险管理顾问'],
    created_at: '2025-08-20T00:00:00Z'
  },
  {
    slug: 'ep042',
    title: 'NFT 艺术革命：数字收藏品时代',
    cover_image: 'ep042.jpg',
    description: '探讨 NFT 如何改变艺术创作和收藏的范式。从技术原理到市场趋势，全面解析数字艺术生态的发展现状。',
    tags: ['NFT', 'Ethereum', 'Art'],
    date: '2025年8月17日 6:00 AM PDT / 9:00 PM CST',
    space_link: 'https://x.com/i/spaces/example3',
    guests: ['数字艺术家', 'NFT 平台创始人', '艺术收藏家'],
    created_at: '2025-08-17T00:00:00Z'
  }
]

// 获取所有节目数据
export async function getEpisodes(): Promise<Episode[]> {
  // 如果环境变量未配置，返回模拟数据
  if (!supabaseUrl || !supabaseKey) {
    console.log('使用模拟数据 - 环境变量未配置')
    return mockEpisodes
  }

  try {
    console.log('正在从 Supabase 获取节目数据...')
    const { data, error } = await supabase
      .from('episodes')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('获取节目列表失败:', error)
      console.log('返回空数组')
      return []
    }

    console.log(`成功获取 ${data?.length || 0} 个节目`)
    if (data && data.length > 0) {
      console.log('节目列表:', data.map(ep => ep.slug))
    } else {
      console.log('数据库中没有找到任何节目')
    }
    return data || []
  } catch (error) {
    console.error('获取节目列表错误:', error)
    console.log('返回空数组')
    return []
  }
}

// 根据 slug 获取单个节目
export async function getEpisodeBySlug(slug: string): Promise<Episode | null> {
  // 如果环境变量未配置，从模拟数据中查找
  if (!supabaseUrl || !supabaseKey) {
    console.log('使用模拟数据查找节目:', slug)
    return mockEpisodes.find(ep => ep.slug === slug) || null
  }

  try {
    console.log('正在从 Supabase 获取节目详情:', slug)
    const { data, error } = await supabase
      .from('episodes')
      .select('*')
      .eq('slug', slug)

    if (error) {
      console.error('获取节目详情失败:', error)
      return null
    }

    // 检查是否找到数据
    if (!data || data.length === 0) {
      console.log(`未找到节目: ${slug}`)
      return null
    }

    console.log('成功获取节目详情:', data[0]?.title)
    return data[0]
  } catch (error) {
    console.error('获取节目详情错误:', error)
    return null
  }
}

// 生成封面图片 URL
export function getCoverImageUrl(coverImage: string): string {
  if (!coverImage) return ''
  
  // 如果已经是完整 URL，直接返回
  if (coverImage.startsWith('http')) {
    return coverImage
  }
  
  // 如果环境变量未配置，使用本地图片
  if (!supabaseUrl) {
    return `/covers/${coverImage}`
  }
  
  // 清理文件名，移除可能的 covers/ 前缀
  const cleanImageName = coverImage.replace(/^covers\//, '')
  
  // 否则拼接 Supabase Storage URL
  const projectRef = supabaseUrl.split('//')[1]?.split('.')[0] || ''
  return `https://${projectRef}.supabase.co/storage/v1/object/public/covers/${cleanImageName}`
}
