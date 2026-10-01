# News 新闻发布

导航顺序：Home → News → Books → About → Contact。栏目地址：`https://magotalk.com/en/news`，简体和繁体界面分别是 `/zh-Hans/news` 和 `/zh-Hant/news`。

## 数据与权限

Supabase 项目 `pmlradrjbsfkrxpflxmy`，独立表 `public.news_posts`。节目继续使用 `episodes`。

网站仅通过现有 anon key 读取已发布且到达发布时间的新闻；草稿和未来新闻不可公开读取，游客和普通登录用户没有写权限。使用 Supabase Dashboard、MCP 或受信任的管理脚本编辑。不要将管理员密钥放入前端或 Git。

## 发布一篇文章

在 Supabase Dashboard 的 Table Editor 中打开 `news_posts`，新增一行：

| 字段 | 怎么填写 |
| --- | --- |
| `slug` | 小写英文、数字和短横线，例如 `new-project-launch`。发布后保持不变，供长期引用。 |
| `title` | 新闻标题，必填。 |
| `summary` | 一两句话的摘要，用于列表和搜索结果。发布时必填。 |
| `content` | 正文，支持 Markdown：段落、`## 小标题`、列表、引用、链接和图片。发布时必填。原始 HTML 不执行。 |
| `author` | 作者或发布机构，默认 MagoTalk。 |
| `language` | 原文语言：`zh-Hans`（默认）、`zh-Hant` 或 `en`。切换网站界面不会自动翻译正文。 |
| `source_url` | 可选，参考报道或公告的完整 https URL。更多来源可以写在正文中。留空使用 NULL。 |
| `status` | 默认 `draft`；准备公开时改为 `published`。 |
| `published_at` | 发布时必填，带时区的日期时间，例如 `2026-09-07T10:00:00-07:00`。未来时间会定时公开；页面日期以 UTC 展示。 |
| `id`、`created_at`、`updated_at` | 自动生成；更新文章时 `updated_at` 自动更新。 |

保存后刷新 News 即可看到已发布文章，无需重新部署。取消公开时把 `status` 改回 `draft`。

也可以直接把标题、正文、日期、来源链接交给 Codex，按照上述规则发布。没有确认的新闻内容不要虚构或自动生成生产记录。

## 搜索与引用

每篇文章都有服务端输出的完整正文、标题、摘要、日期、canonical URL、Open Graph 和 NewsArticle JSON-LD。原文语言的链接是 canonical，例如 `https://magotalk.com/zh-Hans/news/new-project-launch`。不同界面语言访问同一篇文章时，canonical 仍指向原文，避免把未翻译的内容误标为译文。

`/sitemap.xml` 自动列出公开文章；`/robots.txt` 允许爬取并指向 sitemap。文章可供检索与引用，但搜索收录或百科是否采用由各平台决定。

## 发布后核验

1. 使用网站 `.env.local` 中的 anon key 查询目标 `slug`，确认已发布文章可读取、草稿和未来文章不可读取。
2. 打开栏目和文章固定链接，检查正文、日期和来源。
3. 查看页面 HTML 中的 canonical 与 NewsArticle JSON-LD，并确认 sitemap 中存在该文章的原文链接。

数据库迁移：`supabase/migrations/20260906215907_add_news_posts.sql`。这是已有远程数据库的增量迁移，不包含原有 `episodes` 表的完整初始化。

## 首次上线验证（2026-09-06）

- 远程新闻表与 RLS 已创建，网站 anon key 读取成功。以事务内测试记录验证 anon / authenticated 只能读到已经发布的记录，草稿和未来记录被隐藏；匿名写权限关闭。测试已回滚，未发布测试新闻。
- `pnpm build`、TypeScript 和 ESLint 检查通过。
- 本地生产模式验证三种界面的栏目、404、12 条分页、Markdown 文章、canonical、NewsArticle JSON-LD、来源链接和 sitemap；桌面与手机浏览器视觉检查通过。
- 参考实现文档：[Next.js JSON-LD](https://nextjs.org/docs/app/guides/json-ld)、[Supabase RLS](https://supabase.com/docs/guides/database/postgres/row-level-security)。

## 节目纪要与文字稿（2026-10-01）

About 展示最新三篇新闻与节目记录，并链接至 News 完整归档。文章保留固定地址，正文底部提供作者、日期、来源、固定链接及更新日期。

- 节目纪要使用 `magotalk-ep096-recap` 形式；逐字稿使用 `magotalk-ep096-transcript` 形式。其他期数保持 episodes 表中原有 slug（例如 ep096）的写法。
- 节目详情自动展示符合 `magotalk-{episodeSlug}-` 前缀的已发布记录。每篇记录独立保存，不把长正文堆进 About。
- 纪要应标注“非逐字稿”；只有实际逐字整理的文字稿才标为逐字稿。保留发言归属、节目日期和原录音链接，区分个人回忆与核实事实。
- 来源只有部分录音时明确注明范围，不暗示录音覆盖全文。新增原始文字稿时单独发布，不覆盖既有纪要。
- 已发布 EP96 纪要：`/zh-Hans/news/magotalk-ep096-recap`，来源为 episodes.ep096 已有的上半部分 X Space 录音；节目行与海报没有修改。
- EP96 英文版独立地址：`/en/news/magotalk-ep096-recap-en`，与中文稿互相链接；正文语言为 en，canonical 使用英文地址，保留相同节目日期及录音来源。
