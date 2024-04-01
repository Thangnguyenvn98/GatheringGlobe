import { TabsDemo } from "./components/ui/tabdemo";
import "./global.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AboutUs from "./components/about-us";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<div className="bg-white ">Hello There testing</div>}
        />
        <Route path="/login" element={<TabsDemo />} />

        <Route path="/about" element={<AboutUs />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
