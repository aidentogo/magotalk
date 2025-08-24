'use client'

export default function GlobalError({ error }: { error: Error }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Something went wrong</h1>
      <p className="text-gray-700 mb-2">{error.message}</p>
      <p className="text-sm text-gray-500">Please refresh the page or try again later.</p>
    </div>
  )
}
