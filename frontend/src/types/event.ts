export interface Event {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  artistName: string;
  imageUrls: string[];
  location: string;
  id: string;
  onClick: () => void;
}
