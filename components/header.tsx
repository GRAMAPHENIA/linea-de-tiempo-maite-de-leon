import { ProgressIndicator } from "./progress-indicator"

interface HeaderProps {
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

export function Header({
  currentIndex,
  totalItems,
  onPrev,
  onNext,
  onDotClick,
  canScrollLeft,
  canScrollRight,
  startYear,
  endYear,
}: HeaderProps) {
  return (
    <header className="">
      <div className="container mx-auto px-4 py-2">
        <ProgressIndicator 
          currentIndex={currentIndex}
          totalItems={totalItems}
          onPrev={onPrev}
          onNext={onNext}
          onDotClick={onDotClick}
          canScrollLeft={canScrollLeft}
          canScrollRight={canScrollRight}
          startYear={startYear}
          endYear={endYear}
        />
      </div>
    </header>
  )
}
