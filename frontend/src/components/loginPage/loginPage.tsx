import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GatheringGlobe from "../../images/GatheringGlobe.png";

import Register from "./registerform";
import Login from "./loginform";
import party from "../../images/party.png";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="flex h-screen" style={{ backgroundColor: "#cce7c9" }}>
      <div className="w-1/2 h-full">
        <img
          className="w-full h-full object-cover"
          src={party}
          alt="website party"
        />
      </div>
      <div className="flex flex-col justify-center w-1/2 items-center p-8 mt-[-50px]">
        <Link to="/">
        <img
          src={GatheringGlobe}
          alt="GatheringGlobe Logo"
          className="justify-items-start mx-28 "
          style={{ width: "200px", height: "200px" }}
        />
        </Link>
    
        <Tabs defaultValue="account" className="w-[400px] mt-[-65px]">
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
