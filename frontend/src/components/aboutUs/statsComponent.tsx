const StatsComponent = () => {
  const stats = [
    {
      percentage: "63%",
      description:
        "of people say that attending a concert would make them happy.",
    },
    {
      percentage: "75%",
      description:
        "of people say making memories is the best part of attending a live event.",
    },
    {
      percentage: "53%",
      description:
        "of people say getting hard-to-get tickets to a concert would be most impressive on a date.",
    },
  ];
  return (
    <div className="flex justify-center bg-slate-950 p-4">
      <div className="flex flex-col p-2">
        <h1 className="text-4xl font-bold text-white mt-4 text-center">
          Live experiences hold the keys to happiness.
        </h1>
        <div className="grid grid-cols-3 gap-x-4 text-emerald-400 mt-4">
          {stats.map((stat, index) => (
            <div className="flex flex-col gap-y-4 text-center" key={index}>
              <h1 className="font-bold text-6xl">{stat.percentage}</h1>
              <p className="text-white">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsComponent;
