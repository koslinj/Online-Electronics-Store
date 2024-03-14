import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shadcn/components/ui/carousel"

import caro1 from "@/images/caro1.webp"
import caro2 from "@/images/caro2.webp"
import caro3 from "@/images/caro3.webp"
import caro4 from "@/images/caro4.webp"
import caro5 from "@/images/caro5.webp"
import caro6 from "@/images/caro6.jpg"

import Autoplay from "embla-carousel-autoplay"

export function Example() {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      // ...
    </Carousel>
  )
}


const images = [
  {
    id: 1,
    src: caro1
  },
  {
    id: 2,
    src: caro2
  },
  {
    id: 3,
    src: caro3
  },
  {
    id: 4,
    src: caro4
  },
  {
    id: 5,
    src: caro5
  },
  {
    id: 6,
    src: caro6
  }
]

export function MainCarousel() {
  return (
    <div className="mx-auto max-w-7xl mt-4">
      <Carousel
        opts={{ loop: true, duration: 36 }}
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
        className="md:mx-12"
      >
        <CarouselContent>
          {images.map((image) => (
            <CarouselItem key={image.id}>
              <div className="md:px-2">
                <img src={image.src} alt="carousel Image" className="min-h-32 object-cover md:rounded-lg border-2 border-black" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="border-gray-500 size-10 hidden md:flex" />
        <CarouselNext className="border-gray-500 size-10 hidden md:flex" />
      </Carousel>
    </div>
  )
}
