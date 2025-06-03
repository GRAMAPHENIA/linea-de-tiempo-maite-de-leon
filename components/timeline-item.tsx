import { ExternalLink, Calendar } from "lucide-react"
import Image from "next/image"
import type { PostCardProps } from "@/types"
import { formatDate } from "@/utils/dateFormatter"

/**
 * Elemento individual de la línea de tiempo con círculo y contenido
 */
export function TimelineItem({ post, index }: PostCardProps) {
  // Alternar posición arriba/abajo
  const isEven = index % 2 === 0

  return (
    <div className="relative flex flex-col items-center min-w-[400px] my-4">
      <div className="w-80">
        <div className={`bg-white dark:bg-zinc-800 rounded-2xl shadow-none hover:shadow-2xl transition-all duration-500 overflow-hidden border border-zinc-200 dark:border-zinc-700 hover:border-purple-200 dark:hover:border-purple-600`}>
          {/* Imagen principal */}
          <div className="relative h-40 overflow-hidden">
            <Image
              src={post.imageUrl || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 hover:scale-110"
              sizes="320px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Contenido */}
          <div className="p-5 space-y-3">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
              {post.title}
            </h3>
            <p className="text-zinc-600 dark:text-zinc-300 text-sm mb-3 line-clamp-3">
              {post.description}
            </p>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {post.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Fecha */}
            <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
              <Calendar className="w-3 h-3" />
              <time dateTime={post.publishedDate.toISOString()}>{formatDate(post.publishedDate)}</time>
            </div>

            {/* Enlace a Behance */}
            <a
              href={post.behanceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 bg-zinc-700 hover:bg-zinc-600 text-white text-xs font-medium rounded-full transition-colors duration-300 group"
            >
              Ver en Behance
              <ExternalLink className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
