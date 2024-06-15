import { useState } from "react";
import SideBar from "./SideBar";
import MainContent from "./MainContent";
import UserProfile from "../streaming/[username]/UserProfile";

const Dashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  return (
    <div className="flex">
      <SideBar onSelectCategory={setSelectedCategory} />
      <MainContent category={selectedCategory} />
      <UserProfile />
    </div>
  );
};

export default Dashboard;
