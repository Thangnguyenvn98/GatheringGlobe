import { useState } from "react";
import SideBar from "./SideBar";
import MainContent from "./MainContent";

const Dashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  return (
    <div className="flex">
      <SideBar onSelectCategory={setSelectedCategory} />
      <MainContent category={selectedCategory} />
    </div>
  );
};

export default Dashboard;
