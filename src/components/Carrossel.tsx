"use client"

import React from "react"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const carrosselImagens = [
  { src: "/carrossel/1.jpg", alt: "Banner promocional escrito Ofertas Exclusivas por Tempo Limitado e preço de R$ 349,00. Exibe as camisas de futebol das seleções da Espanha com 20% OFF, Brasil com 10% OFF e México com 20% OFF." },
  { src: "/carrossel/2.jpg", alt: "Banner publicitário com o título Super Desconto e aviso de frete grátis em compras acima de R$ 100. Mostra várias camisas de times europeus de futebol em sequência, como Bayern de Munique, Inter de Milão, Arsenal, Manchester City, Atlético de Madrid e Milan." },
  { src: "/carrossel/3.jpg", alt: "Banner com a frase Conforto e estilo, juntos em um só lugar. Exibe as camisas do Paris Saint-Germain, Porto e um card de destaque da Camisa Barcelona 2026 pelo valor de R$ 349,00 com o botão Comprar." },
]

export default function Carrossel() {
    // Configura o autoplay com intervalo de 3 segundos (3000ms)
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  )
  return (
    <section className="w-full flex justify-center">
      <Carousel plugins={[plugin.current]} className="w-full relative" onMouseEnter={() => plugin.current.stop()} onMouseLeave={() => plugin.current.play()}>
        <CarouselContent>
          {carrosselImagens.map((imagem, index) => (
            <CarouselItem key={index}>
              <div className="relative w-full h-[220px] sm:h-[300px] md:h-[420px] lg:h-[480px] overflow-hidden bg-slate-100">
                <Image
                  src={imagem.src}
                  alt={imagem.alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority={index === 0}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-800 border-slate-200" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-800 border-slate-200" />
      </Carousel>
    </section>
  )
}
