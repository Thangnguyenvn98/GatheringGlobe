import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import './global.css'
import AboutUs from "./components/about-us";


function App() {
  

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            
              <div>
                Hello There testing
              </div>
            
          }
        />
        <Route
          path="/about"
          element={
            
              <AboutUs />
            
          }
        />
       

       
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
