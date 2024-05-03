import LoginPage from "./components/loginPage/loginPage";
import "./global.css";
import DiscoverEvent from "./components/Discover_Event/DiscoverEvent";
import EventDetail from "./components/Discover_Event/EventDetail";
import AboutUs from "./components/aboutUs/about-us";
import ChatPage from "./components/chatRoom/Chat";
import Homepage from "./components/homepage/homepage"
import { SocketProvider } from "./components/providers/socket-provider";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./components/layouts/layout";
import Faq from "./components/FAQ/faq";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<LoginPage />} />
        <Route path="/about" element={<Layout><AboutUs/></Layout>} />
        <Route path="/messages/c/:ownerId/t/:roomId" element={<SocketProvider><ChatPage /></SocketProvider> }/>        
        <Route path="/messages" element={<SocketProvider><ChatPage /></SocketProvider>} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/help" element={<Layout><Faq/></Layout>} />
        <Route path="/discover" element={<Layout><DiscoverEvent /></Layout>} />
        <Route path="/discover-event-details" element={<EventDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
 