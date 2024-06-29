import { useGetAllOrdersPagination } from "@/services/queries";
import { format } from "date-fns";
import { Frown, Loader2, ServerCrash } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import EventPaginationButton from "../homepage/homepageEventPagination";

const MyOrders = () => {
  const [page, setPage] = useState(1);
  const { data, isError, isLoading, isPlaceholderData } =
    useGetAllOrdersPagination(page);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const orders = data?.orders || [];

  if (isLoading) {
    return (
      <div className="flex flex-col flex-1 justify-center items-center min-h-[500px]">
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Loading Your Orders
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col flex-1 justify-center items-center min-h-[500px]">
        <ServerCrash className="h-7 w-7 text-zinc-500 my-4" />
        <div className="flex items-center gap-x-2">
          <p className="text-2xl text-zinc-500 dark:text-zinc-400">
            Look like you have no orders yet
          </p>
          <Frown color="red" className="h-8 w-8" />
        </div>
      </div>
    );
  }

  const formatDate = (date: string) => {
    return format(new Date(date), "MMMM dd, yyyy");
  };

  return (
    <div className="flex flex-col items-center w-full max-w-7xl mx-auto my-4">
      <h2 className="text-4xl font-semibold mb-6 self-start">Your Orders</h2>
      {orders.map((order) => (
        <div
          key={order._id}
          className="border-2 border-gray-300 w-full mb-4 rounded-md"
        >
          <div className="grid grid-cols-4 gap-x-4 bg-gray-300 p-4">
            <div className="flex flex-col">
              <h3 className="text-sm font-semibold">ORDER PLACED</h3>
              <span className="text-sm">{formatDate(order.createdAt)}</span>
            </div>
            <div className="flex flex-col">
              <h3 className="text-sm font-semibold">TOTAL</h3>
              <span className="text-sm">${order.totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex flex-col">
              <h3 className="text-sm font-semibold">EMAIL TO</h3>
              <span className="text-sm">{order.email}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold">ORDER # {order._id}</span>
              <Link
                to={`/your-account/order-details/${order._id}`}
                className="text-cyan-600 text-end mr-[1.7rem] hover:underline hover:text-orange-500"
              >
                View order details
              </Link>
            </div>
          </div>
          <div className="p-4">
            {order.events.map((event) => (
              <div
                key={event._id}
                className="p-4 border rounded-lg grid grid-cols-[65%_35%] mt-4"
              >
                <div className="flex flex-col gap-y-4">
                  <div className="grid grid-cols-[30%_70%] gap-x-4">
                    <div className="w-48 h-48 relative">
                      <img
                        className="w-full h-full object-cover rounded-lg"
                        src={event.eventId.imageUrls[0]}
                        alt={event.eventId.title}
                      />
                    </div>
                    <div className="flex flex-col ">
                      <h2 className="font-bold text-lg">
                        {event.eventId.title}
                      </h2>
                      {event.tickets.map((ticket) => (
                        <div
                          key={ticket._id}
                          className="flex items-center gap-x-2 text-md"
                        >
                          <p>{ticket.ticketId.type}</p>
                          <p>x {ticket.quantity}</p>
                        </div>
                      ))}
                      <h2 className="mt-auto">
                        Start On {formatDate(event.eventId.startTime)}
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="gap-y-2 flex flex-col justify-center ml-auto">
                  <Button className="w-60 self-center">
                    Leave Seller Feedback
                  </Button>
                  <Button className="w-60 self-center">
                    Ask a Event-Related Question
                  </Button>
                  <Button className="w-60 self-center">
                    Write a Event Review
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <EventPaginationButton
        currentPage={page}
        onPageChange={handlePageChange}
        totalPages={data?.pagination.totalPages || 1}
        isPlaceholderData={isPlaceholderData}
      />
    </div>
  );
};

export default MyOrders;
