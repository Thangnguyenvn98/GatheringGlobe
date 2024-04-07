import React, { useState, useEffect } from 'react';
import './Countdown.css';
const CountdownToBirthday: React.FC = () => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isItMyBirthday, setIsItMyBirthday] = useState(false);

  useEffect(() => {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    let nextYear = yyyy + 1;
    const dayMonth = '09/30/';
    let birthday = dayMonth + yyyy;

    today = new Date(mm + '/' + dd + '/' + yyyy);
    if (today > new Date(birthday)) {
      birthday = dayMonth + nextYear;
    }

    const countDown = new Date(birthday).getTime();
    const x = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDown - now;

      if (distance < 0) {
        clearInterval(x);
        setIsItMyBirthday(true);
      } else {
        setCountdown({
          days: Math.floor(distance / day),
          hours: Math.floor((distance % day) / hour),
          minutes: Math.floor((distance % hour) / minute),
          seconds: Math.floor((distance % minute) / second),
        });
      }
    }, 1000);

    return () => clearInterval(x);
  }, []);

  return (
    <div className="container">
      <h1 id="headline">{isItMyBirthday ? "It's my birthday!" : 'Countdown to my birthday'}</h1>
      {!isItMyBirthday && (
        <div id="countdown">
          <ul>
            <li><span>{countdown.days}</span> days</li>
            <li><span>{countdown.hours}</span> Hours</li>
            <li><span>{countdown.minutes}</span> Minutes</li>
            <li><span>{countdown.seconds}</span> Seconds</li>
          </ul>
        </div>
      )}
      {isItMyBirthday && (
        <div id="content" className="emoji">
          <span>🥳</span>
          <span>🎉</span>
          <span>🎂</span>
        </div>
      )}
    </div>
  );
};

export default CountdownToBirthday;
