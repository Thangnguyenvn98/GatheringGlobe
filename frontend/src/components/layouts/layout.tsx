import Footer from "../homepage/footer";
import Pageheader from "../homepage/pageheader";
import { APIProvider, Map } from "@vis.gl/react-google-maps";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const apikey = import.meta.env.VITE_PUBLIC_GOOGLE_MAPS_API_KEY;
  return (
    //wrap this around so that everything inside have access to the api
    <APIProvider apiKey={apikey}>
      <div>
        <Map
          defaultZoom={3}
          defaultCenter={{ lat: 22.54992, lng: 0 }}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          className="hidden"
        />
        <div className="flex flex-col min-h-screen">
          <Pageheader />
          <div className="flex-1 pt-[152px]">{children}</div>
          <Footer />
        </div>
      </div>
    </APIProvider>
  );
};

export default Layout;
