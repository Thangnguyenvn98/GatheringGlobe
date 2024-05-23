interface EventData {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  artistName: string;
  imageUrls: string[];
  location: string;
}

const eventdatas: EventData[] = [
  {
    id: "15125",
    title: "Summer Music Festival",
    description: "Join us for an amazing day of music and fun!",
    startTime: "2021-08-01T12:00:00Z",
    endTime: "2021-08-01T22:00:00Z",
    artistName: "DJ Example",
    imageUrls: ["https://st.cdjapan.co.jp/pictures/l/02/45/AVXK-79993.jpg"],
    location: "Downtown Park",
  },
  {
    id: "212515",
    title: "Local Art Exhibition",
    description: "Experience stunning artworks from local artists.",
    startTime: "2021-08-05T09:00:00Z",
    endTime: "2021-08-05T18:00:00Z",
    artistName: "Art Collective",
    imageUrls: ["https://i.redd.it/g0n1v1x4sgub1.jpg"],
    location: "City Art Gallery",
  },
];

export default eventdatas;
