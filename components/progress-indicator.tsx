import { ChevronLeft, ChevronRight } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { TimelineInfo } from "./timeline-info"

interface ProgressIndicatorProps {
  currentIndex: number
  totalItems: number
  onPrev: () => void
  onNext: () => void
  onDotClick: (index: number) => void
  canScrollLeft: boolean
  canScrollRight: boolean
  startYear: number
  endYear: number
}

export function ProgressIndicator({
  currentIndex,
  totalItems,
  onPrev,
  onNext,
  onDotClick,
  canScrollLeft,
  canScrollRight,
  startYear,
  endYear,
}: ProgressIndicatorProps) {
  return (
    <div className="mt-8 flex flex-col items-center gap-3">
      {/* Contador de proyectos */}
      <div className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
        Proyecto {currentIndex + 1} de {totalItems}
      </div>
      
      {/* Contenedor principal del indicador */}
      <div className="flex items-center gap-4 px-6 py-2.5 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm rounded-full shadow-lg border border-zinc-200 dark:border-zinc-700">
        {/* Botón Anterior */}
        <button
          onClick={onPrev}
          disabled={!canScrollLeft}
          className="p-1.5 rounded-full text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Puntos de navegación */}
        <div className="flex items-center gap-2">
          {Array.from({ length: totalItems }).map((_, index) => (
            <button
              key={index}
              onClick={() => onDotClick(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-8 bg-gradient-to-r from-blue-500 to-indigo-600 scale-125'
                  : 'bg-zinc-300 dark:bg-zinc-600 hover:bg-zinc-400 dark:hover:bg-zinc-500'
              }`}
              aria-label={`Ir al proyecto ${index + 1}`}
            />
          ))}
        </div>

        {/* Botón Siguiente */}
        <button
          onClick={onNext}
          disabled={!canScrollRight}
          className="p-1.5 rounded-full text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Siguiente"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
        
        {/* Información de la línea de tiempo */}
        <div className="ml-4 border-l border-zinc-200 dark:border-zinc-700 pl-4">
          <TimelineInfo 
            totalProjects={totalItems}
            startYear={startYear}
            endYear={endYear}
          />
        </div>

        {/* Botón de cambio de tema */}
        <div className="ml-4 border-l border-zinc-200 dark:border-zinc-700 pl-4">
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}
