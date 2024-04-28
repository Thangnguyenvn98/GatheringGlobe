import LoginPage from "./components/loginPage/loginPage";
import "./global.css";
import DiscoverEvent from "./components/Discover_Event/DiscoverEvent";
import EventDetail from "./components/Discover_Event/EventDetail";
import AboutUs from "./components/aboutUs/about-us";
import ChatPage from "./components/chatRoom/Chat";
import Homepage from "./components/homepage/homepage"
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<div className="bg-white ">Hello There testing</div>}
        />
        <Route path="/register" element={<LoginPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/messages" element={<ChatPage />} />
        <Route path="/messages/c/:ownerId/t/:roomId" element={<ChatPage />} />        
        <Route path="/messages" element={<ChatPage />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/discover" element={<DiscoverEvent />} />
        <Route path="/discover-event-details" element={<EventDetail />} />
        <Route path="/homepage" element={<Homepage />} />
      </Routes>
    </Router>
  );
}

export default App;
