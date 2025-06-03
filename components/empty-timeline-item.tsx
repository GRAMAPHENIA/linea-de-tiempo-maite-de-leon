export function EmptyTimelineItem() {
  return (
    <div className="relative flex flex-col items-center min-w-[400px] my-4">
      <div className="w-80">
        <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-none hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-dashed border-zinc-300 dark:border-zinc-600">
          {/* Contenido */}
          <div className="h-60 flex items-center justify-center">
            <span className="text-9xl font-serif text-zinc-300 dark:text-zinc-600">i</span>
          </div>
        </div>
      </div>
    </div>
  )
}
