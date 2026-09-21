import { EPISODES_PAGE_SIZE } from "@/lib/supabase";

export default function EpisodeGridSkeleton() {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      aria-hidden
    >
      {Array.from({ length: EPISODES_PAGE_SIZE }, (_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-xl bg-white border border-line"
        >
          <div className="aspect-square animate-pulse bg-gray-200" />
          <div className="space-y-3 p-4">
            <div className="h-3 w-16 animate-pulse rounded bg-gray-200" />
            <div className="h-12 w-full animate-pulse rounded bg-gray-200" />
            <div className="mt-3 h-3 w-1/2 animate-pulse rounded bg-gray-100" />
          </div>
        </div>
      ))}
    </div>
  );
}
