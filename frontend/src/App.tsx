import { RegisterForm } from "./components/ui/tabdemo";
import "./global.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AboutUs from "./components/aboutUs/about-us";
import ChatPage from "./components/chatRoom/Chat";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<div className="bg-white ">Hello There testing</div>}
        />
        <Route path="/register" element={<RegisterForm />} />

        <Route path="/about" element={<AboutUs />} />
        <Route path="/messages" element={<ChatPage />} />
        <Route path="/messages/c/:ownerId/t/:roomId" element={<ChatPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
