import LoginPage from "./components/loginPage/loginPage";
import "./global.css";
import DiscoverEvent from "./components/Discover_Event/DiscoverEvent";
import EventDetail from "./components/Discover_Event/event-detail/EventDetail";
import AboutUs from "./components/aboutUs/about-us";
import ChatPage from "./components/chatRoom/Chat";
import Homepage from "./components/homepage/homepage";
import { SocketProvider } from "./components/providers/socket-provider";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./components/layouts/layout";
import Faq from "./components/FAQ/faq";
import ContactUs from "./components/contact-us/contactUs";
import ProtectedRoute from "./utils/ProtectedRoute";
import useCheckAuth from "./hooks/useCheckAuth";

function App() {
  useCheckAuth();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<LoginPage />} />
        <Route
          path="/about"
          element={
            <Layout>
              <AboutUs />
            </Layout>
          }
        />
        <Route element={<ProtectedRoute />} />
        <Route
          path="/messages/c/:ownerId/t/:roomId"
          element={
            <SocketProvider>
              <ChatPage />
            </SocketProvider>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
        <Route
          path="/discover"
          element={
            <Layout>
              <DiscoverEvent />
            </Layout>
          }
        />

        <Route
          path="/discover/event/:eventId"
          element={
            <Layout>
              <EventDetail />
            </Layout>
          }
        />
        <Route
          path="/messages"
          element={
            <SocketProvider>
              <ChatPage />
            </SocketProvider>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
        <Route
          path="/help"
          element={
            <Layout>
              <Faq />
            </Layout>
          }
        />

        <Route
          path="/contact-us"
          element={
            <Layout>
              <ContactUs />
            </Layout>
          }
        />
        <Route
          path="/discover-event-details"
          element={
            <Layout>
              <EventDetail />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
