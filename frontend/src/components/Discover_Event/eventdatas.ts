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
    description:
      "Join us for an amazing day of music and fun!Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis facere eligendi dignissimos optio maxime, aperiam quaerat illum est eius, illo sed tempora quasi, minima eum placeat! At ea esse eaque consectetur vero sequi facere quis ipsum, dolore rem cupiditate sapiente.",
    startTime: "2021-08-01 12:00AM",
    endTime: "2021-08-01 3:00PM",
    artistName: "DJ Example",
    imageUrls: ["https://st.cdjapan.co.jp/pictures/l/02/45/AVXK-79993.jpg"],
    location: "Downtown Park",
  },
  {
    id: "212515",
    title: "Local Art Exhibition",
    description:
      "Experience stunning artworks from local artists.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis facere eligendi dignissimos optio maxime, aperiam quaerat illum est eius, illo sed tempora quasi, minima eum placeat! At ea esse eaque consectetur vero sequi facere quis ipsum, dolore rem cupiditate sapiente.",
    startTime: "2021-08-05 12:00AM",
    endTime: "2021-08-05 5:00PM",
    artistName: "Art Collective",
    imageUrls: ["https://i.redd.it/g0n1v1x4sgub1.jpg"],
    location: "City Art Gallery",
  },
  {
    id: "15126",
    title: "Autumn Jazz Nights",
    description:
      "Experience the magic of jazz under the stars at our Autumn Jazz Nights. Join us for a soulful evening featuring renowned musicians from around the globe. Enjoy the smooth melodies and vibrant atmosphere in the heart of the city park.",
    startTime: "2021-09-15 5:00PM",
    endTime: "2021-09-15 11:00PM",
    artistName: "Ella Fitzgerald Tribute Band",
    imageUrls: ["https://www.filmposters.com/images/posters/21939.jpg"],
    location: "City Central Park",
  },
  {
    id: "15127",
    title: "Rock the River Festival",
    description:
      "Get ready to rock at this year’s biggest riverbank music festival. Join thousands of music fans and top bands for a weekend of unforgettable live performances and thrilling entertainment along the scenic riverside.",
    startTime: "2021-10-05 2:00PM",
    endTime: "2021-10-07 12:00AM",
    artistName: "The Rockers",
    imageUrls: ["https://www.filmposters.com/images/posters/14314.jpg"],
    location: "Riverside Arena",
  },
  {
    id: "15128",
    title: "Spring Pop Extravaganza",
    description:
      "Celebrate the arrival of spring with the hottest pop stars at the Spring Pop Extravaganza! It’s a full day of top hits, spectacular performances, and pop magic. Don’t miss out on the most awaited pop music event of the season.",
    startTime: "2022-04-10 1:00PM",
    endTime: "2022-04-10 10:00PM",
    artistName: "Pop Sensations",
    imageUrls: [
      "https://i.pinimg.com/originals/f1/b2/8b/f1b28bb7ef467b817ca78261308fdb97.jpg",
    ],
    location: "Metro City Outdoor Arena",
  },
];

export default eventdatas;
