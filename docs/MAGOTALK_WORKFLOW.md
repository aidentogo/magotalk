# MagoTalk 工作经验与发布工作流

这份文档记录 MagoTalk 每期海报制作、Supabase 更新和网站验证的固定流程。目标是以后用户只给标题、副标题、时间和 Space URL 时，可以直接执行，不需要重新摸索。

## 核心信息

- 网站项目：`/Users/pengxie/Desktop/magotalk_website`
- Supabase project ref：`pmlradrjbsfkrxpflxmy`
- Supabase Storage bucket：`covers`
- 节目表：`public.episodes`
- 海报文件命名：`ep080.jpg`、`ep081.jpg`，统一小写 `ep` + 三位期数
- 数据库 `cover_image` 字段：使用 `covers/ep080.jpg` 这种格式，和现有记录保持一致
- 网站图片解析：`lib/supabase.ts` 的 `getCoverImageUrl()` 会把 `covers/` 前缀清理后拼出 public Storage URL
- Figma 文件：`Mago Talk Space 海报`，file key 为 `wyWfyxdZldrUeK96PVV3Ve`

## 输入清单

每次新一期发布前，尽量从用户拿到这些信息：

- 期数：例如 `ep080`
- 主标题：例如 `AI Automation：一个人，正在变成一家公司`
- 副标题：例如 `从 Agent 到自动化工作流，AI 如何让超级个体崛起？`
- 日期和时间：海报底部、网站 `date` 字段都需要
- Space URL：例如 `https://x.com/i/spaces/1PKqrEoLElYGb?s=20`
- 最终海报文件：通常用户会放在桌面根目录，例如 `/Users/pengxie/Desktop/ep080.jpg`

如果 Space URL 尚未提供，先把 `space_link` 留空，等用户补 URL 后只更新这个字段。

## 海报制作流程

1. 进入 Figma 文件 `Mago Talk Space 海报`。
2. 找到最近一期海报组，当前应以 EP79/EP80 之后的最新一期为基准。
3. 复制最新一期海报组，改名为类似 `EP081 - <简短主题>`。
4. 替换这些文字层：
   - 期数：`EP80` -> `EP81`
   - 主标题
   - 副标题
   - 底部日期和时间
5. 头像和嘉宾信息默认沿用 EP79 之后的版本，尤其第二个头像要与 EP79 对齐。
6. 做截图检查，重点看：
   - `EPxx` 是否被挤成两行
   - 英文是否被 Figma 自动转成全大写
   - 主标题和副标题是否重叠
   - 右侧三个绿色方块是否被文字遮挡
   - 底部时间是否超出绿色区域
7. 导出最终 JPEG 到桌面根目录，不放进文件夹：
   - `/Users/pengxie/Desktop/ep081.jpg`

## Supabase 更新流程

### 1. 确认桌面海报存在

```bash
file /Users/pengxie/Desktop/ep080.jpg
```

应该看到 JPEG 信息和图片尺寸。

### 2. 确认数据库当前最新期数

用网站 anon key 做只读查询即可：

```bash
node --input-type=module -e "import fs from 'fs'; import { createClient } from '@supabase/supabase-js'; const env=Object.fromEntries(fs.readFileSync('.env.local','utf8').split(/\n/).filter(l=>l&&!l.startsWith('#')).map(l=>{const i=l.indexOf('=');return [l.slice(0,i),l.slice(i+1)]})); const supabase=createClient(env.NEXT_PUBLIC_SUPABASE_URL,env.NEXT_PUBLIC_SUPABASE_ANON_KEY); const {data,error}=await supabase.from('episodes').select('slug,title,cover_image,date,space_link,created_at').order('created_at',{ascending:false}).limit(5); console.log(JSON.stringify({error,data},null,2));"
```

### 3. 上传海报并 upsert episode

公开 anon key 没有写权限，会被 RLS 拦住。写入需要使用已登录 Supabase CLI 拿到 service role key，但不要把 key 打印、保存或提交到仓库。

把下面脚本里的 `ep080`、标题、副标题、日期、Space URL 和 `created_at` 改成当期信息再执行：

```bash
node --input-type=module -e "import fs from 'fs'; import { execFileSync } from 'child_process'; import { createClient } from '@supabase/supabase-js'; const env=Object.fromEntries(fs.readFileSync('.env.local','utf8').split(/\n/).filter(l=>l&&!l.startsWith('#')).map(l=>{const i=l.indexOf('=');return [l.slice(0,i),l.slice(i+1)]})); const projectRef='pmlradrjbsfkrxpflxmy'; const keys=JSON.parse(execFileSync('supabase',['projects','api-keys','--project-ref',projectRef,'--output','json'],{encoding:'utf8'})); const serviceKey=keys.find(k=>k.id==='service_role')?.api_key; if(!serviceKey) throw new Error('service role key not found'); const supabase=createClient(env.NEXT_PUBLIC_SUPABASE_URL,serviceKey,{auth:{persistSession:false}}); const slug='ep080'; const file=fs.readFileSync('/Users/pengxie/Desktop/ep080.jpg'); const upload=await supabase.storage.from('covers').upload('ep080.jpg', file, {contentType:'image/jpeg', upsert:true, cacheControl:'3600'}); if(upload.error) throw upload.error; const row={slug, title:'AI Automation：一个人，正在变成一家公司', cover_image:'covers/ep080.jpg', description:'从 Agent 到自动化工作流，AI 如何让超级个体崛起？', tags:['Bitcoin','Ethereum','Wallets','Privacy','Web3'], date:'2026年5月8日 20:00 PM PDT / 11:00 AM CST', space_link:'https://x.com/i/spaces/1PKqrEoLElYGb?s=20', guests:[], created_at:'2026-05-09T03:00:00+00:00'}; const db=await supabase.from('episodes').upsert(row,{onConflict:'slug'}).select('slug,title,cover_image,date,space_link,created_at').single(); if(db.error) throw db.error; const publicUrl=supabase.storage.from('covers').getPublicUrl('ep080.jpg').data.publicUrl; console.log(JSON.stringify({ok:true,uploadedPath:upload.data.path,publicUrl,row:db.data},null,2));"
```

经验点：

- Storage 上传路径只写 `ep080.jpg`，不要写 `covers/ep080.jpg`，因为 bucket 已经是 `covers`。
- 数据库 `cover_image` 写 `covers/ep080.jpg`，与现有 `ep079` 一致。
- `created_at` 控制首页排序。新一期必须晚于上一期，否则不会排在最前。
- `tags` 当前沿用最近几期：`Bitcoin`、`Ethereum`、`Wallets`、`Privacy`、`Web3`。
- `space_link` 可以后补。用户给 URL 后只更新这一列。

### 4. 只更新 Space URL

如果海报和 episode 行已经存在，只补 Space URL：

```bash
node --input-type=module -e "import fs from 'fs'; import { execFileSync } from 'child_process'; import { createClient } from '@supabase/supabase-js'; const env=Object.fromEntries(fs.readFileSync('.env.local','utf8').split(/\n/).filter(l=>l&&!l.startsWith('#')).map(l=>{const i=l.indexOf('=');return [l.slice(0,i),l.slice(i+1)]})); const keys=JSON.parse(execFileSync('supabase',['projects','api-keys','--project-ref','pmlradrjbsfkrxpflxmy','--output','json'],{encoding:'utf8'})); const serviceKey=keys.find(k=>k.id==='service_role')?.api_key; if(!serviceKey) throw new Error('service role key not found'); const admin=createClient(env.NEXT_PUBLIC_SUPABASE_URL,serviceKey,{auth:{persistSession:false}}); const url='https://x.com/i/spaces/1PKqrEoLElYGb?s=20'; const update=await admin.from('episodes').update({space_link:url}).eq('slug','ep080').select('slug,title,space_link,cover_image,date,created_at').single(); if(update.error) throw update.error; const anon=createClient(env.NEXT_PUBLIC_SUPABASE_URL,env.NEXT_PUBLIC_SUPABASE_ANON_KEY); const verify=await anon.from('episodes').select('slug,space_link').eq('slug','ep080').single(); if(verify.error) throw verify.error; console.log(JSON.stringify({updated:update.data,verified:verify.data},null,2));"
```

## 验证流程

### 1. 验证图片公开 URL

```bash
curl -sSI https://pmlradrjbsfkrxpflxmy.supabase.co/storage/v1/object/public/covers/ep080.jpg
```

成功标准：

- HTTP status 是 `200`
- `content-type` 是 `image/jpeg`
- `content-length` 大于 0

### 2. 验证数据库记录可被网站读取

```bash
node --input-type=module -e "import fs from 'fs'; import { createClient } from '@supabase/supabase-js'; const env=Object.fromEntries(fs.readFileSync('.env.local','utf8').split(/\n/).filter(l=>l&&!l.startsWith('#')).map(l=>{const i=l.indexOf('=');return [l.slice(0,i),l.slice(i+1)]})); const supabase=createClient(env.NEXT_PUBLIC_SUPABASE_URL,env.NEXT_PUBLIC_SUPABASE_ANON_KEY); const one=await supabase.from('episodes').select('slug,title,cover_image,date,space_link,created_at').eq('slug','ep080').single(); const latest=await supabase.from('episodes').select('slug,cover_image,created_at').order('created_at',{ascending:false}).limit(3); console.log(JSON.stringify({one,latest},null,2));"
```

成功标准：

- `one.error` 为 `null`
- `one.data.slug` 是目标期数
- `cover_image` 是 `covers/ep080.jpg`
- `space_link` 是用户提供的 URL，或在未提供时为空字符串
- `latest.data[0].slug` 是最新一期

## 安全与注意事项

- 不要提交 `.env.local`。
- 不要把 Supabase `service_role` key 写进文档、代码、提交记录或最终回复。
- 可以使用 Supabase CLI 获取 key 并在一次性脚本内存中使用，但不要打印 key。
- 如果 anon key 写入报 `new row violates row-level security policy`，这是正常的，改用 service role。
- 修改数据库前先只读查询，确认目标 `slug` 是否已存在。
- 如果用户只说“更新海报”，不要顺手改标题、时间、Space URL；只替换 Storage 文件和必要的 `cover_image`。
- 如果用户只给 Space URL，只更新 `space_link`。

## EP080 已执行记录

- 桌面文件：`/Users/pengxie/Desktop/ep080.jpg`
- Storage public URL：`https://pmlradrjbsfkrxpflxmy.supabase.co/storage/v1/object/public/covers/ep080.jpg`
- 数据库 slug：`ep080`
- 标题：`AI Automation：一个人，正在变成一家公司`
- 副标题/description：`从 Agent 到自动化工作流，AI 如何让超级个体崛起？`
- 时间：`2026年5月8日 20:00 PM PDT / 11:00 AM CST`
- Space URL：`https://x.com/i/spaces/1PKqrEoLElYGb?s=20`
