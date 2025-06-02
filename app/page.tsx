import { TimelineContainer } from "@/components/timeline-container"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { behancePosts } from "@/data/behancePosts"
import { Palette, TrendingUp } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-zinc-200 dark:bg-zinc-900 transition-colors duration-500 overflow-x-hidden">
      {/* Header */}
      <header className="relative px-6 py-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Línea de tiempo */}
      <main className="px-6 pb-12">
        <div className="max-w-full mx-auto">
          {/* <div className="mb-12 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <TrendingUp className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl md:text-3xl font-semibold text-zinc-800 dark:text-white font-poppins">
                Evolución Creativa
              </h2>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Explora mi trayectoria profesional a través de esta línea de tiempo interactiva. Cada punto representa un
              hito importante en mi desarrollo como diseñador.
            </p>
          </div> */}

          <TimelineContainer posts={behancePosts} />
        </div>
      </main>

      {/* Footer */}
      {/* <footer className="px-6 py-8 border-t border-zinc-300 dark:border-zinc-700 mt-16">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">
            © 2024 Mi Portfolio. Diseñado con pasión y dedicación.
          </p>
        </div>
      </footer> */}
    </div>
  )
}
