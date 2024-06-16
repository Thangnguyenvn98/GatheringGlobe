import { useEffect, useState } from "react";
import SideBar from "./SideBar";
import MainContent from "./MainContent";

// import UserProfile from "../streaming/[username]/UserProfile";
import { useAuthQuery } from "@/services/queries";
import { axiosInstance } from "@/services/api";

const Dashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const { data } = useAuthQuery();
  console.log(data);

  useEffect(() => {
    if (data == null) return;
    async function fetchData() {
      const result = await axiosInstance.get(`/api/allEvents/${data.userId}`);
      console.log(result);
    }
    fetchData();
  }, [data]);

  return (
    <div className="flex">
      <SideBar onSelectCategory={setSelectedCategory} />
      <MainContent category={selectedCategory} />
      {/* <UserProfile /> */}
    </div>
  );
};

export default Dashboard;
