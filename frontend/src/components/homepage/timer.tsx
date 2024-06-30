import { useEffect, useState } from "react";
import bg from "../../images/timerbg1.jpg";
const Timer = () => {
  const [EventTime, setEventTime] = useState(false);
  const [months, setMonths] = useState(0);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    const target = new Date("08/21/2024 23:59:59");
    const interval = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();
      if (difference <= 0) {
        clearInterval(interval);
        setEventTime(true);
      } else {
        setMonths(Math.floor(difference / (1000 * 60 * 60 * 24 * 30)));
        setDays(
          Math.floor(
            (difference % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24),
          ),
        );
        setHours(
          Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        );
        setMinutes(Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {EventTime ? (
        <>
          <h1>Gathering Time!</h1>
        </>
      ) : (
        <>
          <div
            style={{
              backgroundImage: `url("${bg}")`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
            className="flex flex-col h-[400px]"
          >
            <h1 className="text-4xl text-white font-serif mx-auto my-auto">
              Until Gathering Time!
            </h1>
            <div className="my-auto flex flex-row justify-around items-center">
              <div className="flex flex-col justify-between">
                <div className="text-4xl text-white font-serif">{months}</div>
                <div className="text-4xl text-white font-serif">Months</div>
              </div>
              <div className="">:</div>
              <div className="flex flex-col">
                <div className="text-4xl text-white font-serif">{days}</div>
                <div className="text-4xl text-white font-serif"> Days</div>
              </div>
              <div className="">:</div>
              <div className="flex flex-col">
                <div className="text-4xl text-white font-serif">{hours}</div>
                <div className="text-4xl text-white font-serif"> Hours</div>
              </div>
              <div className="">:</div>
              <div className="flex flex-col">
                <div className="text-4xl text-white font-serif">{minutes}</div>
                <div className="text-4xl text-white font-serif">Minutes</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Timer;
