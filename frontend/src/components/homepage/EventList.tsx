import './EventList.css';
import Evenlist from "../../images/eventlist.jpg"
import Evenlist2 from "../../images/eventlist2.jpg"
import Evenlist3 from "../../images/eventlist3.jpg"

interface Event {
  imageUrl: string;
  title: string;
  artist: string;
  // Additional properties can be added as needed
}

const events: Event[] = [
  {
    imageUrl: Evenlist,
    title: 'Rock Revival Tour',
    artist: 'The Stone Revivals',
  },
  {
    imageUrl: Evenlist,
    title: 'Rock Revival Tour',
    artist: 'The Stone Revivals',
  },
  {
    imageUrl: Evenlist2,
    title: 'Classical Evenings',
    artist: 'The City Orchestra',
  },
  {
    imageUrl: Evenlist3,
    title: 'Classical Evenings',
    artist: 'The City Orchestra',
  },
  {
    imageUrl: Evenlist,
    title: 'Rock Revival Tour',
    artist: 'The Stone Revivals',
  },
  {
    imageUrl: Evenlist2,
    title: 'Classical Evenings',
    artist: 'The City Orchestra',
  },
  {
    imageUrl: Evenlist3,
    title: 'Classical Evenings',
    artist: 'The City Orchestra',
  },
  {
    imageUrl: Evenlist,
    title: 'Rock Revival Tour',
    artist: 'The Stone Revivals',
  },
  {
    imageUrl: Evenlist2,
    title: 'Classical Evenings',
    artist: 'The City Orchestra',
  },
  {
    imageUrl: Evenlist3,
    title: 'Classical Evenings',
    artist: 'The City Orchestra',
  },
  {
    imageUrl: Evenlist,
    title: 'Rock Revival Tour',
    artist: 'The Stone Revivals',
  },
  {
    imageUrl: Evenlist2,
    title: 'Classical Evenings',
    artist: 'The City Orchestra',
  },
  {
    imageUrl: Evenlist3,
    title: 'Classical Evenings',
    artist: 'The City Orchestra',
  },
  {
    imageUrl: Evenlist,
    title: 'Rock Revival Tour',
    artist: 'The Stone Revivals',
  },
  {
    imageUrl: Evenlist2,
    title: 'Classical Evenings',
    artist: 'The City Orchestra',
  },
  {
    imageUrl: Evenlist3,
    title: 'Classical Evenings',
    artist: 'The City Orchestra',
  },
  {
    imageUrl: Evenlist,
    title: 'Rock Revival Tour',
    artist: 'The Stone Revivals',
  },
  {
    imageUrl: Evenlist2,
    title: 'Classical Evenings',
    artist: 'The City Orchestra',
  },
  {
    imageUrl: Evenlist3,
    title: 'Classical Evenings',
    artist: 'The City Orchestra',
  },
  {
    imageUrl: Evenlist2,
    title: 'Classical Evenings',
    artist: 'The City Orchestra',
  },
  {
    imageUrl: Evenlist3,
    title: 'Classical Evenings',
    artist: 'The City Orchestra',
  },
  {
    imageUrl: Evenlist3,
    title: 'Classical Evenings',
    artist: 'The City Orchestra',
  },

];

const EventList:React.FC = () => {
  return (
    <div className="grid grid-cols-4 mx-10 gap-4">
              {events.map((event, index) => (
                <div className="flex flex-col" key={index}>
                  <img src={event.imageUrl} alt={event.title} className="size-auto object-cover" />
                  <div className="flex flex-col gap-y-4 py-2">
                  <h3 className="text-muted-foreground">{event.title}</h3>
                  <h3 className="font-semibold text-2xl">{event.artist}</h3>
                  </div>
                
                </div>
              ))}
    </div>
  );
};

export default EventList