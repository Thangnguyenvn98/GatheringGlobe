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

];

const EventList: any = ({}) => {
  return (
    <div className="place-items-center items-center w-auto h-auto">
              <div className="grid grid-rows-2 grid-flow-col gap-4">
              {events.map((event, _) => (
                <div className="row-span-1">
                  <img src={event.imageUrl} alt={event.title} className="size-auto" />
                  <h3>{event.title}</h3>
                  <h3>{event.artist}</h3>
                </div>
              ))}
              </div>
    </div>
  );
};

export default EventList