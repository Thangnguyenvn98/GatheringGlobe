import "./EventList.css";
interface Event {
  imageUrl: string;
  title: string;
  artist: string;
  // Additional properties can be added as needed
}

interface EventProps {
  displayMode: "list" | "grid";
}

const events: Event[] = [
  {
    imageUrl:
      "https://i.pinimg.com/originals/9a/be/a7/9abea783b1b70e6fa0989e57c5bd3863.jpg",
    title: "Global Music Festival",
    artist: "DJ Mark & The Synths",
  },
  {
    imageUrl:
      "https://www.allkpop.com/upload/2020/05/content/042105/1588640745-6.jpg",
    title: "AnimeCon Concert",
    artist: "Haruki & The Manga Band",
  },
  {
    imageUrl: "https://i.redd.it/fxecgcnqu9581.jpg",
    title: "Jazz Nights",
    artist: "Ella Fitzgerald Tribute",
  },
  {
    imageUrl:
      "https://d1ecyrisz7rzac.cloudfront.net/uploads/2017/05/06110828/NCT127_NEW-1-1024x1024.jpg",
    title: "Rock Revival Tour",
    artist: "The Stone Revivals",
  },
  {
    imageUrl:
      "https://d3tvwjfge35btc.cloudfront.net/Assets/85/014/L_p0159801485.jpg",
    title: "Classical Evenings",
    artist: "The City Orchestra",
  },
  {
    imageUrl:
      "https://static.wixstatic.com/media/074aba_f0c1e7be9a8c4326a4e1ebd28eb508e4~mv2.jpg/v1/fill/w_800,h_800,al_c,q_85/074aba_f0c1e7be9a8c4326a4e1ebd28eb508e4~mv2.jpg",
    title: "Classical Evenings",
    artist: "The City Orchestra",
  },
];

const EventList: React.FC<EventProps> = ({ displayMode }) => {
  const gridStyle = {
    display: displayMode === "grid" ? "grid" : "block",
    gridTemplateColumns: displayMode === "grid" ? "repeat(3, 1fr)" : "none",
    gap: displayMode === "grid" ? "20px" : "0",
    paddingLeft: "50px",
    paddingRight: "50px",
  };

  return (
    <div>
      <div
        className="grid place-items-center h-screen p-4 pb-5"
        style={gridStyle}
      >
        {events.map((event, index) => (
          <div key={index} className="mb-5">
            {/* Adjusted image sizing with Tailwind CSS */}
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full max-w-xs h-auto"
            />
            <h3>{event.title}</h3>
            <p>{event.artist}</p>
            <button className="mt-2">View Event Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
