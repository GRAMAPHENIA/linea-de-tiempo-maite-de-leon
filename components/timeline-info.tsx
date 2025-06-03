import { Calendar, Hash } from "lucide-react"

interface TimelineInfoProps {
  totalProjects: number
  startYear: number
  endYear: number
}

export function TimelineInfo({ totalProjects, startYear, endYear }: TimelineInfoProps) {
  return (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
        <Hash className="w-4 h-4" />
        <span>{totalProjects} Proyectos</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
        <Calendar className="w-4 h-4" />
        <span>
          {startYear} - {endYear}
        </span>
      </div>
    </div>
  )
}
