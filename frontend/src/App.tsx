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
import ForgotPassword from "./components/loginPage/Forgotpassword";
import ResetPassword from "./components/loginPage/ResetPassword";
import { OrderConfirmationModal } from "./components/modals/order-confirmation-modal";
import Booking from "./components/BookingForm/Booking";
import OrderDetails from "./components/order/OrderDetails";
import QrReader from "./components/QrCode/QrReader";
import ViewerPage from "./components/streaming/[username]/ViewerPage";
import WatchChannelPage from "./components/streaming/[username]/WatchChannelPage";
import CreatorPageWrapper from "./components/streaming/[username]/CreatorPageWrapper";
import GenerateStreamPage from "./components/streaming/keys/GenerateStreamPage.tsx";
import BotChat from "./components/chatbot/BotChat.tsx";
import TicketForm from "./components/TicketForm/TicketForm";
import Dashboard from "./components/userDashboard/Dashboard";
import MyOrders from "./components/order/MyOrders.tsx";
import EventEdit from "./components/Discover_Event/EventEdit.tsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout showChatBot={true}>
              <Homepage />
            </Layout>
          }
        />
        <Route path="/register" element={<LoginPage />} />
        <Route
          path="/about"
          element={
            <Layout showChatBot={true}>
              <AboutUs />
            </Layout>
          }
        />

        <Route element={<ProtectedRoute />}>
          <Route
            path="/u/:username/create-stream"
            element={
              <Layout>
                <GenerateStreamPage />
              </Layout>
            }
          />

          <Route
            path="/u/:username/create-new-event"
            element={
              <Layout>
                <EventForm />
              </Layout>
            }
          />
          <Route
            path="/:eventId/tickets"
            element={
              <Layout>
                <TicketForm />
              </Layout>
            }
          />
          <Route
            path="/messages/c/:ownerId/t/:roomId"
            element={
              <Layout>
                <SocketProvider>
                  <ChatPage />
                </SocketProvider>
              </Layout>
            }
          />
          <Route
            path="/community-chat"
            element={
              <Layout>
                <SocketProvider>
                  <ChatPage />
                </SocketProvider>
              </Layout>
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
          <Route
            path="/dashboard/:username"
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          />
          <Route
            path="your-account/order-history/:username"
            element={
              <Layout backgroundColor="bg-white">
                <MyOrders />
              </Layout>
            }
          />
          <Route
            path="my-event/:eventId/edit/"
            element={
              <Layout backgroundColor="bg-white">
                <EventEdit />
              </Layout>
            }
          />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
        <Route
          path="/discover"
          element={
            <Layout showChatBot={true}>
              <DiscoverEvent />
            </Layout>
          }
        />

        <Route
          path="/help"
          element={
            <Layout showChatBot={true}>
              <Faq />
            </Layout>
          }
        />
        <Route path="/chatbot" element={<BotChat />} />

        <Route
          path="/discover/:eventName/event/:eventId"
          element={
            <Layout showChatBot={true}>
              <EventDetail />
            </Layout>
          }
        />
        <Route
          path="/contact-us"
          element={
            <Layout showChatBot={true}>
              <ContactUs />
            </Layout>
          }
        />

        <Route
          path="/stream/:username"
          element={
            <Layout>
              <CreatorPageWrapper />
            </Layout>
          }
        />
        <Route
          path="/stream/:username/watch"
          element={
            <Layout>
              <ViewerPage />
            </Layout>
          }
        />
        <Route
          path="/stream/channel/watch/all"
          element={
            <Layout showChatBot={true}>
              <WatchChannelPage />
            </Layout>
          }
        />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/qr-scanner"
          element={
            <Layout>
              <QrReader />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
