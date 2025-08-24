# Supabase 配置说明

## 环境变量配置

为了连接 Supabase 数据库，您需要配置以下环境变量：

1. 创建 `.env.local` 文件在项目根目录
2. 添加以下内容：

```env
# Supabase 配置 - 注意变量名必须以 NEXT_PUBLIC_ 开头
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## ⚠️ 重要提示

在 Next.js 中，只有以 `NEXT_PUBLIC_` 开头的环境变量才能在客户端代码中访问。如果您使用：
- `SUPABASE_URL` 和 `SUPABASE_ANON_KEY` - 这些变量只能在服务器端访问
- `NEXT_PUBLIC_SUPABASE_URL` 和 `NEXT_PUBLIC_SUPABASE_ANON_KEY` - 这些变量可以在客户端和服务器端访问

## 获取 Supabase 配置信息

1. 登录 [Supabase 控制台](https://supabase.com/dashboard)
2. 选择您的项目
3. 进入 **Settings** > **API**
4. 复制以下信息：
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 数据库表结构

确保您的 Supabase 项目中有 `episodes` 表，包含以下字段：

```sql
CREATE TABLE episodes (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  cover_image TEXT,
  description TEXT NOT NULL,
  tags TEXT[],
  date TEXT,
  space_link TEXT,
  guests TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Storage 配置

1. 在 Supabase 控制台中创建 `covers` bucket
2. 设置 bucket 为 public 权限
3. 上传节目封面图片到 `covers` bucket

## 功能说明

- **无环境变量时**：网站将使用模拟数据运行
- **配置环境变量后**：网站将自动从 Supabase 获取真实数据
- **数据同步**：在 Supabase 中添加新节目后，网站会自动显示

## 部署说明

部署时请确保：
1. 在部署平台（Vercel、Netlify 等）中配置环境变量
2. Supabase 项目的 RLS 策略允许匿名用户读取 episodes 表
3. covers bucket 设置为公开访问

## 测试环境变量

访问 `/test-env` 页面可以检查环境变量是否正确配置。
