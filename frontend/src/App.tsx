import { TabsDemo } from "./components/ui/tabdemo";
import "./global.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AboutUs from "./components/aboutUs/about-us";
import DiscoverEvent from "./components/Discover_Event/DiscoverEvent";
import EventDetail from "./components/Discover_Event/EventDetail";
import ChatPage from "./components/chatRoom/Chat";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<div className="bg-white ">Hello There stesting</div>}
        />
        <Route path="/login" element={<TabsDemo />} />

        <Route path="/about" element={<AboutUs />} />
        <Route path="/discover" element={<DiscoverEvent />} />
        <Route path="/discover-event-details" element={<EventDetail />} />
        <Route path="/messages" element={<ChatPage />} />
        <Route path="/messages/c/:ownerId/t/:roomId" element={<ChatPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
