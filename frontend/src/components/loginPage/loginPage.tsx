import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GatheringGlobe from "../../images/GatheringGlobe.png";
import Register from "./registerform";
import Login from "./loginform";
import party from "../../images/party.png";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="flex h-screen" style={{ backgroundColor: "#cce7c9" }}>
      <>
        <div className="w-1/2 h-full">
          <img
            className="w-full h-full object-cover"
            src={party}
            alt="website party"
          />
        </div>
        <div className="flex flex-col justify-center w-1/2 relative items-center p-8 mt-[-50px]">
          <Link to="/" className="absolute h-[200px] w-[200px] top-10">
            <img
              src={GatheringGlobe}
              alt="GatheringGlobe Logo"
              className="my-20 h-full w-full object-contain "
            />
          </Link>

          <Tabs defaultValue="account" className="w-[400px] mt-32">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="account">Log in</TabsTrigger>
              <TabsTrigger value="password">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <Login />
            </TabsContent>

            <TabsContent value="password">
              <Register />
            </TabsContent>
          </Tabs>
        </div>
      </>
    </div>
  );
};

export default LoginPage;
