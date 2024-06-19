import { useEffect, useState } from "react";
import SideBar from "./SideBar";
import MainContent from "./MainContent";
import { EventType } from "@/types/event";
// import UserProfile from "../streaming/[username]/UserProfile";
import { axiosInstance } from "@/services/api";

const Dashboard = () => {
  // const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [events, setEvents] = useState<EventType[]>([]);

  useEffect(() => {
    async function fetchData() {
      const result = await axiosInstance.get("/api/allEvents");
      console.log(result);
      setEvents(result.data);
    }
    fetchData();
  }, []);

  return (
    <div className="flex">
      <SideBar />
      <MainContent events={events} />
      {/* <UserProfile /> */}
    </div>
  );
};

export default Dashboard;
