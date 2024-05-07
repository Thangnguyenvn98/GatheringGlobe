import { MicVocal, PartyPopper, TicketCheck } from "lucide-react";
const ServicesComponent = () => {
  const services = [
    {
      title: "Experience you're looking for.",
      Icon: MicVocal,
      text: "There’s no reason to miss out. With tickets to millions of events, and tools like Price Alert to help you stay within budget, we have the ticket that’s right for you.",
    },
    {
      title: "Service and a history you can trust.",
      Icon: TicketCheck,
      text: "You can buy and sell with 100% confidence. With more than 130 trusted partners, award-winning customer service and a convenient, feature-packed mobile app to buy and sell anytime, anywhere, we’ve got you covered.",
    },
    {
      title: "So much more.",
      Icon: PartyPopper,
      text: "The ticket is just the beginning! Loyalty perks for our top buyers, personalized recommendations and surprise seat upgrades are just a few of the ways we give fans more than just the ticket.",
    },
  ];

  return (
    <div className="flex justify-center mt-10">
      <div className="flex flex-col p-10 max-w-screen-lg w-full">
        <section className="p-4">
          <h2 className="text-center font-bold text-2xl text-emerald-400">
            Above and beyond our guarantee, we offer:
          </h2>
          <div className="grid grid-cols-3 mt-10 gap-10">
            {services.map((service, index) => (
              <div
                className="flex flex-col items-center text-center text-sm gap-y-4"
                key={index}
              >
                <h2 className="font-bold text-sm">{service.title}</h2>
                <service.Icon size={60} fill="grey" />
                <p>{service.text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ServicesComponent;
