import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Card, CardContent } from "../ui/card";
import AvatarImg from "../../images/avatar.png";

function Testimonials() {
  const contents: string[] = [
    '"Joining this platform has been a game-changer for me! I\'ve connected with like-minded individuals, attended amazing events, and made unforgettable memories. Highly recommend!"- Sarah Smith',
    '"Joining this platform has been a game-changer for me! I\'ve connected with like-minded individuals, attended amazing events, and made unforgettable memories. Highly recommend!"- Sarah Smith',
    '"Joining this platform has been a game-changer for me! I\'ve connected with like-minded individuals, attended amazing events, and made unforgettable memories. Highly recommend!"- Sarah Smith',
  ];
  return (
    <div className="w-full flex justify-center">
      <div className="w-[90%] relative mx-auto">
        <Carousel className="w-full">
          <CarouselContent className="">
            {contents.map((content, index) => (
              <CarouselItem key={index} className="w-full">
                <div>
                  <Card className="bg-green-600 bg-opacity-20">
                    <CardContent className="flex items-center justify-center p-2">
                      <img src={AvatarImg} className="h-60" />
                      <span className="mx-4">{content}</span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}

export default Testimonials;
