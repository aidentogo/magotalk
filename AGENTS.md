# MagoTalk Codex Notes

Read `docs/MAGOTALK_WORKFLOW.md` before doing MagoTalk publishing work.

Project rules:

- Posters do not go into GitHub.
- Posters live on the local Mac and in Supabase Storage bucket `covers`.
- Supabase project ref is `pmlradrjbsfkrxpflxmy`.
- Episode rows live in `public.episodes`.
- `cover_image` should be stored as `covers/ep081.jpg`, not a full URL.
- New poster files are usually under `/Users/pengxie/Desktop/杰出人才/Mago Talk Space/MAGOTALK_EPxx/`.
- Prefer the full square poster file such as `EP081.png`; do not use phone preview screenshots such as `ep81.PNG` as the website cover.
- If a Space URL arrives later, only update `episodes.space_link` for that slug.
- Always verify with the website anon key after Supabase updates.
- If Supabase CLI is not logged in, use the Supabase MCP SQL tool for database-only updates.
