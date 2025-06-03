"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TimelineItem } from "./timeline-item";
import { EmptyTimelineItem } from "./empty-timeline-item";
import { Header } from "./header";
import type { TimelineProps } from "@/types";

/**
 * Contenedor principal de la línea de tiempo horizontal dibujada
 */
export function TimelineContainer({ posts }: TimelineProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Función para hacer scroll hacia la izquierda
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -400,
        behavior: "smooth",
      });
    }
  };

  // Función para hacer scroll hacia la derecha
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 400,
        behavior: "smooth",
      });
    }
  };

  // Estado para el índice actual
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemWidth = 400; // Ancho aproximado de cada elemento

  // Navegar a un índice específico
  const scrollToIndex = useCallback((index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const containerWidth = container.clientWidth;
      const scrollWidth = container.scrollWidth;

      // Calcular la posición objetivo para centrar el elemento
      const targetPosition = index * itemWidth;
      const maxScroll = scrollWidth - containerWidth;

      // Asegurarse de no hacer scroll más allá del contenido
      const scrollPosition = Math.min(
        Math.max(
          0,
          targetPosition - containerWidth / 2 + itemWidth / 2
        ),
        maxScroll
      );

      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  }, [itemWidth]);

  // Verificar estado de scroll
  const checkScrollButtons = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);

      // Calcular el índice actual basado en el scroll con un umbral más preciso
      const scrollPosition = scrollLeft + itemWidth / 2;
      const index = Math.min(
        Math.max(0, Math.floor(scrollPosition / itemWidth)),
        posts.length - 1
      );

      // Solo actualizar si hay un cambio real para evitar renderizados innecesarios
      setCurrentIndex((prevIndex) => (index !== prevIndex ? index : prevIndex));
    }
  }, [posts.length, itemWidth]);

  // Efecto para manejar scroll con teclado y verificar botones
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        scrollLeft();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        scrollRight();
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkScrollButtons);
      checkScrollButtons(); // Verificar estado inicial
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", checkScrollButtons);
      }
    };
  }, []);

  return (
    <>
      <Header
        currentIndex={currentIndex}
        totalItems={posts.length}
        onPrev={scrollLeft}
        onNext={scrollRight}
        onDotClick={scrollToIndex}
        canScrollLeft={canScrollLeft}
        canScrollRight={canScrollRight}
        startYear={posts[0]?.publishedDate.getFullYear()}
        endYear={posts[posts.length - 1]?.publishedDate.getFullYear()}
      />
      
      <section className="relative w-full overflow-hidden pt-4">
        {/* Botones de navegación */}
        {canScrollLeft && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 z-30">
            <button
              onClick={scrollLeft}
              className="w-12 h-12 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl border border-zinc-200 dark:border-zinc-600 flex items-center justify-center transition-all duration-300 hover:scale-110 group"
              aria-label="Scroll hacia la izquierda"
            >
              <ChevronLeft className="w-6 h-6 text-zinc-600 dark:text-zinc-300 group-hover:text-teal-600 dark:group-hover:text-teal-400" />
            </button>
          </div>
        )}

        {canScrollRight && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 z-30">
            <button
              onClick={scrollRight}
              className="w-12 h-12 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl border border-zinc-200 dark:border-zinc-600 flex items-center justify-center transition-all duration-300 hover:scale-110 group"
              aria-label="Scroll hacia la derecha"
            >
              <ChevronRight className="w-6 h-6 text-zinc-600 dark:text-zinc-300 group-hover:text-teal-600 dark:group-hover:text-teal-400" />
            </button>
          </div>
        )}

      {/* Contenedor principal con scroll horizontal */}
      <div className="relative">
        {/* Contenedor de scroll */}
        <div
          ref={scrollContainerRef}
          className="flex items-center overflow-x-auto scrollbar-hide pt-16 relative z-10"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {/* Tarjeta vacía de inicio */}
          <div className="flex items-center pl-8">
            <EmptyTimelineItem />
          </div>

          {/* Elementos de la línea de tiempo con círculos delante de cada tarjeta */}
          {posts.map((post, index) => (
            <div key={post.id} className="relative flex items-center">
              {/* Círculo con número */}
              <div className="relative z-20">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-zinc-800 shadow-lg bg-gradient-to-r from-blue-400 to-indigo-600 dark:from-blue-600 dark:to-indigo-600">
                  <span className="text-white text-sm font-bold">{index + 1}</span>
                  <div className="absolute inset-0 bg-blue-400 rounded-full animate-pulse opacity-30" />
                </div>
              </div>
              
              {/* Tarjeta */}
              <div className="ml-4">
                <TimelineItem post={post} index={index} />
              </div>
            </div>
          ))}

          {/* Punto final de la línea de tiempo */}
          <div className="flex-shrink-0 flex flex-col items-center px-8">
            <div className="w-12 h-12 bg-gradient-to-r from-amber-300 to-orange-500 rounded-full border-4 border-white dark:border-zinc-800 shadow-lg relative z-20 flex items-center justify-center">
              <span className="text-white text-sm font-bold">{posts.length}</span>
              <div className="absolute inset-0 bg-amber-400 rounded-full animate-pulse opacity-30" />
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Más proyectos
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-500">
                próximamente...
              </p>
            </div>
          </div>

          {/* Espaciado final */}
          <div className="flex-shrink-0 w-8" />
        </div>
      </div>

      </section>
    </>
  );
}
