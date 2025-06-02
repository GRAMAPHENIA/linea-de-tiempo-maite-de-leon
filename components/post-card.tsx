import { ExternalLink, Calendar } from "lucide-react"
import Image from "next/image"
import type { PostCardProps } from "@/types"
import { formatDate, getTimeAgo } from "@/utils/dateFormatter"

/**
 * Tarjeta individual que muestra información de una publicación de Behance
 */
export function PostCard({ post, index }: PostCardProps) {
  return (
    <article className="flex-none w-80 md:w-96 snap-center group">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-600">
        {/* Imagen principal */}
        <div className="relative h-48 md:h-56 overflow-hidden">
          <Image
            src={post.imageUrl || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 320px, 384px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Contenido */}
        <div className="p-6 space-y-4">
          {/* Título */}
          <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
            {post.title}
          </h3>

          {/* Descripción */}
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">{post.description}</p>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Fecha */}
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Calendar className="w-4 h-4" />
            <time dateTime={post.publishedDate.toISOString()}>{formatDate(post.publishedDate)}</time>
            <span className="text-xs">({getTimeAgo(post.publishedDate)})</span>
          </div>

          {/* Enlace a Behance */}
          <a
            href={post.behanceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors duration-300 group/link"
          >
            Ver en Behance
            <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
          </a>
        </div>
      </div>
    </article>
  )
}
