import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Card, CardContent } from "../ui/card";
import sarah from "../../images/avatar.png";
import john from "../../images/john.jpg";
import emily from "../../images/emily.jpg";

function Testimonials() {
  const contents: string[] = [
    '"Joining this platform has been a game-changer for me! I\'ve connected with like-minded individuals, attended amazing events, and made unforgettable memories. Highly recommend!" - Sarah Smith',
    '"This platform has expanded my network and opened up countless opportunities. The community is vibrant and supportive. Absolutely love it!" - John Doe',
    '"I have found this platform incredibly useful for both professional and personal growth. The events are top-notch and the people you meet are fantastic. Five stars!" - Emily Johnson',
  ];
  const images: string[] = [sarah, john, emily];
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
                      <img src={images[index]} className="h-60" />
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
