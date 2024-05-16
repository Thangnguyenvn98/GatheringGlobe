import LoginPage from "./components/loginPage/loginPage";
import "./global.css";
import DiscoverEvent from "./components/Discover_Event/DiscoverEvent";
import EventDetail from "./components/Discover_Event/EventDetail";
import AboutUs from "./components/aboutUs/about-us";
import EventForm from "./components/newEventForm/EventForm";
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
import Ticket from "./components/BookingForm/Ticket";
import ContactUs from "./components/contact-us/contactUs";
import ProtectedRoute from "./utils/ProtectedRoute";
import useCheckAuth from "./hooks/useCheckAuth";
import ForgotPassword from "./components/loginPage/Forgotpassword";
import EventDetailMock from "./components/testComponent/EventDetailMock";
import Booking from "./components/BookingForm/Booking";

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
        <Route element={<ProtectedRoute />}>
          <Route
            path="/messages/c/:ownerId/t/:roomId"
            element={
              <SocketProvider>
                <ChatPage />
              </SocketProvider>
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
          <Route
            path="/:userId/checkout"
            element={
              <Layout>
                <Booking />
              </Layout>
            }
          />
        </Route>

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
          path="/help"
          element={
            <Layout>
              <Faq />
            </Layout>
          }
        />
        <Route
          path="/discover/:eventName/event/:eventId"
          element={
            <Layout>
              <EventDetailMock />
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
        <Route path="/booking/:ticketId" element={<EventDetail />} />
        <Route path="/ticket" element={<Ticket />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/create-new-event"
          element={
            <Layout>
              <EventForm />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
