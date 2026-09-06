create table public.news_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and length(slug) <= 160),
  title text not null check (length(btrim(title)) > 0),
  summary text not null default '',
  content text not null default '',
  author text not null default 'MagoTalk' check (length(btrim(author)) > 0),
  language text not null default 'zh-Hans' check (language in ('en', 'zh-Hans', 'zh-Hant')),
  source_url text check (source_url is null or source_url ~ '^https?://[^[:space:]]+$'),
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint news_published_fields check (
    status <> 'published' or (
      published_at is not null and length(btrim(summary)) > 0 and length(btrim(content)) > 0
    )
  )
);

comment on table public.news_posts is 'MagoTalk official announcements and milestones. Publish via trusted dashboard or admin tooling.';
comment on column public.news_posts.content is 'Markdown body. Raw HTML is not rendered.';
comment on column public.news_posts.slug is 'Stable URL identifier. Do not change after publishing.';
comment on column public.news_posts.language is 'Original article language; determines canonical URL. UI language does not translate the article.';
comment on column public.news_posts.published_at is 'UTC publication timestamp. Future dates remain hidden until this time.';

create index news_posts_published_date_idx on public.news_posts (published_at desc, slug)
  where status = 'published';

alter table public.news_posts enable row level security;
revoke all on public.news_posts from anon, authenticated;
grant select on public.news_posts to anon, authenticated;
grant all on public.news_posts to service_role;

create policy "Public can read published news"
on public.news_posts for select to anon, authenticated
using (status = 'published' and published_at <= now());

create function public.set_news_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

revoke all on function public.set_news_updated_at() from public, anon, authenticated;

create trigger news_posts_updated_at
before update on public.news_posts
for each row execute function public.set_news_updated_at();
