import { EPISODES_PAGE_SIZE } from "@/lib/supabase";

export default function EpisodeGridSkeleton() {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-5 lg:gap-4"
      aria-hidden
    >
      {Array.from({ length: EPISODES_PAGE_SIZE }, (_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200/80 md:rounded-lg"
        >
          <div className="aspect-square animate-pulse bg-gray-200" />
          <div className="space-y-2 px-4 py-3 md:px-3 md:py-2.5">
            <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
            <div className="mt-3 h-3 w-1/2 animate-pulse rounded bg-gray-100" />
          </div>
        </div>
      ))}
    </div>
  );
}
