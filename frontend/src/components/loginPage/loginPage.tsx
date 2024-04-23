import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GatheringGlobe from "../../images/GatheringGlobe.png";

import Register from "./registerform";
import Login from "./loginform";

const LoginPage = () => {
  return (
    <div
      className="flex justify-center items-center h-screen"
      style={{ backgroundColor: "#cce7c9" }}
    >
      <div className="flex flex-col w-[400px]">
        <img
          src={GatheringGlobe}
          alt="GatheringGlobe Logo"
          className="justify-items-start mx-28 "
          style={{ width: "200px", height: "190px" }}
        />
        <Tabs defaultValue="account" className="w-[400px] ">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Log in</TabsTrigger>
            <TabsTrigger value="password">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Login />
          </TabsContent>

          {/* //Sign in */}
          <TabsContent value="password">
            <Register />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
export default LoginPage;
