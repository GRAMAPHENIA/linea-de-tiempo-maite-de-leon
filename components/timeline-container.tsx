"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, Calendar, Hash } from "lucide-react";
import { TimelineItem } from "./timeline-item";
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
    <section className="relative w-full overflow-hidden">
      {/* Información de la línea de tiempo */}
      <div className="flex items-center justify-center gap-6 mb-8">
        <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          <Hash className="w-4 h-4" />
          <span>{posts.length} Proyectos</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          <Calendar className="w-4 h-4" />
          <span>
            {posts[0]?.publishedDate.getFullYear()} -{" "}
            {posts[posts.length - 1]?.publishedDate.getFullYear()}
          </span>
        </div>
      </div>

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
          className="flex items-center overflow-x-auto scrollbar-hide py-16 relative"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {/* Espaciado inicial */}
          <div className="flex-shrink-0 w-8" />

          {/* Elementos de la línea de tiempo con líneas segmentadas */}
          {posts.map((post, index) => (
            <div key={post.id} className="relative flex items-center">
              <TimelineItem post={post} index={index} />

              {/* Línea segmentada hacia el siguiente punto */}
              {index < posts.length - 1 && (
                <div className="absolute top-1/2 left-full w-16 h-1 bg-gradient-to-r from-purple-400 to-indigo-600 dark:from-purple-600 dark:to-indigo-600 transform -translate-y-1/2 z-10" />
              )}
            </div>
          ))}

          {/* Punto final de la línea de tiempo */}
          <div className="flex-shrink-0 flex flex-col items-center px-8">
            <div className="w-4 h-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full border-4 border-white dark:border-zinc-800 shadow-lg relative z-20">
              <div className="absolute inset-0 bg-purple-400 rounded-full animate-pulse opacity-30" />
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

      {/* Indicador de progreso mejorado */}
      <div className="mt-8 flex flex-col items-center gap-3">
        <div className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
          Proyecto {currentIndex + 1} de {posts.length}
        </div>
        <div className="flex items-center gap-4 px-6 py-2.5 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm rounded-full shadow-lg border border-zinc-200 dark:border-zinc-700">
          <button
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className="p-1.5 rounded-full text-zinc-500 hover:text-teal-600 dark:hover:text-teal-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1.5 mx-2">
            {posts.map((_, index) => (
              <button
                key={index}
                onClick={() => {
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
                }}
                className={`relative h-2.5 rounded-full transition-all duration-300 ease-in-out ${
                  index === currentIndex
                    ? "w-8 bg-gradient-to-r from-teal-500 to-indigo-500 scale-125 z-10"
                    : "w-2.5 bg-zinc-300 dark:bg-zinc-600 hover:bg-zinc-400 dark:hover:bg-zinc-500 scale-90 hover:scale-100"
                }`}
                aria-label={`Ir al proyecto ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={scrollRight}
            disabled={!canScrollRight}
            className="p-1.5 rounded-full text-zinc-500 hover:text-teal-600 dark:hover:text-teal-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
          {posts[currentIndex]?.title || "Explora los proyectos"}
        </p>
      </div>
    </section>
  );
}
