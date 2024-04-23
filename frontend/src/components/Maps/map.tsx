import { APIProvider,Map } from '@vis.gl/react-google-maps'
import EventLocation from '../homepage/searchLocation';


const MAPS_API_KEY = import.meta.env.VITE_PUBLIC_GOOGLE_MAPS_API_KEY || "";

const Maps = () => {
  return (
    <APIProvider apiKey={MAPS_API_KEY}>
     <div className="h-screen flex justify-center">
        <Map className="hidden" defaultZoom={3}
        defaultCenter={{lat: 22.54992, lng: 0}}/>
      <EventLocation/>
      </div>
      </APIProvider>
  )
}

export default Maps