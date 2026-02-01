# MagoTalk - Web3 播客访谈系列

一个现代化的 Web3 播客和访谈类网站，采用极简设计风格，专注于用户体验和内容展示。

## 🎯 项目特性

- **现代化设计**: 参考 TalkCast 设计风格，采用极简、高级的视觉设计
- **响应式布局**: 完美适配桌面端、平板和移动设备
- **卡片式展示**: 三列栅格布局展示播客节目，包含封面、标题、时长等信息
- **分类导航**: 支持按类别筛选节目内容
- **优雅交互**: 平滑的悬停效果和过渡动画
- **SEO 优化**: 完整的元数据配置和 Open Graph 支持

## 🛠️ 技术栈

- **框架**: Next.js 15.5.0
- **语言**: TypeScript
- **样式**: Tailwind CSS 4.0
- **图标**: Lucide React
- **字体**: Geist Sans (Google Fonts)
- **包管理**: pnpm

## 🚀 快速开始

### 安装依赖

```bash
pnpm install
```

### 配置环境变量

```bash
cp .env.local.example .env.local
# 然后编辑 .env.local，填入你的 Supabase 真实值
```

详细说明请参考 [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)。

### 启动开发服务器

```bash
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看效果。

### 构建生产版本

```bash
pnpm build
```

### 启动生产服务器

```bash
pnpm start
```

## 📁 项目结构

```
magotalk/
├── app/
│   ├── episodes/
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
│   └── covers/
│       ├── ep042.jpg
│       ├── ep043.jpg
│       └── ep044.jpg
├── tailwind.config.ts
├── package.json
└── README.md
```

## 🎨 设计特色

### 导航栏
- 品牌 Logo 和名称
- 主要导航链接（Home, About, Episodes, Pricing, Contact）
- 搜索功能图标

### 英雄区域
- 渐变橙色背景
- 大标题和描述文字
- 圆形装饰元素
- 面包屑导航

### 分类筛选
- 胶囊式按钮设计
- 支持多类别筛选
- 活跃状态高亮显示

### 节目卡片
- 三列响应式网格布局
- 封面图片悬停缩放效果
- 分类标签、标题、描述
- 主持人和时长信息
- 播放按钮

## 🔧 自定义配置

### 颜色主题
在 `tailwind.config.ts` 中可以自定义品牌颜色：

```typescript
theme: {
  extend: {
    colors: {
      magoGreen: '#00B88C',
      magoOrange: '#F15B2A',
    },
  },
}
```

### 字体配置
项目使用 Geist Sans 字体，可在 `layout.tsx` 中修改字体配置。

## 📝 数据管理

当前使用模拟数据，后续可以集成：
- Supabase 数据库
- CMS 系统
- API 接口

## 🤝 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 👨‍💻 作者

**MAGO** - Web3 播客主持人

---

⭐ 如果这个项目对你有帮助，请给它一个星标！
