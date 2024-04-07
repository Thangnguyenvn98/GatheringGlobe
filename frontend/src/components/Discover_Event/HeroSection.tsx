import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const HeroSection: React.FC = () => {
  return (
    <div className="relative text-center p-5 pt-10">
      <Carousel>
        <CarouselContent className="flex flex-nowrap bg-cover bg-center"> {/* Ensure items are in a single row */}
          <CarouselItem className="flex-shrink-0 w-full"> {/* Make each item full width */}
            <img className="mx-auto w-full h-full object-cover" src="https://www.billboard.com/wp-content/uploads/2023/03/16-Taylor-Swift-The-Eras-Tour-opening-night-billboard-1548.jpg?w=800" alt="Description of Image 1" />
          </CarouselItem>

          <CarouselItem className="flex-shrink-0 w-full"> {/* Make each item full width */}
            <img className="mx-auto" src="https://wallpapers.com/images/hd/hatsune-miku-music-anime-character-ryx2hvpq5fxp23qt.jpg" alt="Description of Image 2" />
          </CarouselItem>

          <CarouselItem className="flex-shrink-0 w-full"> {/* Make each item full width */}
            <img className="mx-auto" src="https://wallpapers.com/images/hd/sports-kobe-bryant-desktop-6856ioquhlxwrvii.jpg" alt="Description of Image 3" />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default HeroSection;

