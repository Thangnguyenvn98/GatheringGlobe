import React from 'react';
import HeroSection from './HeroSection';
// import Countdown from './Countdown';
import NavigationButtons  from './NavigationButtons';
import EventList from './EventList';

const App: React.FC = () => {
  return (
    <div>
      <HeroSection />
      {/* <Countdown /> */}
      <NavigationButtons />
      <EventList displayMode="grid" /> 
      

    </div>
  );
};

export default App;