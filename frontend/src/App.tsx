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
import ContactUs from "./components/contact-us/contactUs";
import ProtectedRoute from "./utils/ProtectedRoute";
import useCheckAuth from "./hooks/useCheckAuth";
import ForgotPassword from "./components/loginPage/Forgotpassword";
import ResetPassword from "./components/loginPage/ResetPassword";
import EventDetailMock from "./components/testComponent/EventDetailMock";
import Booking from "./components/BookingForm/Booking";
import { OrderConfirmationModal } from "./components/modals/order-confirmation-modal";
import OrderDetails from "./components/order/OrderDetails";
import HostRoom from "./components/streaming/HostRoom";
import KeysPage from "./components/streaming/keys/KeysPage";
import CreatorPage from "./components/streaming/[username]/CreatorPage";
import UploadThingComponent from "./components/testComponent/UploadThingComponent";
import QrScanner from "qr-scanner";
import QrReader from "./components/QrCode/QrReader";

function App() {
  useCheckAuth();
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Homepage />
            </Layout>
          }
        />
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
          <Route path="/u/:username/keys" element={<KeysPage />} />
          <Route
            path="/create-new-event"
            element={
              <Layout>
                <EventForm />
              </Layout>
            }
          />
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
            path="/checkout"
            element={
              <Layout>
                <OrderConfirmationModal />
                <Booking />
              </Layout>
            }
          />
          <Route
            path="/your-account/order-details/:id"
            element={
              <Layout>
                <OrderDetails />
              </Layout>
            }
          />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
        <Route
          path="/discover/*"
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
          path="/channel/:roomName/host"
          element={
            <Layout>
              <HostRoom />
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

        <Route path="/stream/:username" element={<CreatorPage />} />

        <Route
          path="/discover-event-details"
          element={
            <Layout>
              <EventDetail />
            </Layout>
          }
        />
        <Route
          path="/test2"
          element={
            <Layout>
              <UploadThingComponent />
            </Layout>
          }
        />
        <Route path="/booking/:ticketId" element={<EventDetail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/qr-scanner" element={<QrReader />} />

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
