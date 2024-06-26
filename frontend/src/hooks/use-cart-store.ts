import { create } from "zustand";
import { persist } from "zustand/middleware";
import toast from "react-hot-toast";

export interface TicketItem {
  ticketType: string;
  quantity: number;
  price: number;
}

export interface CartItem {
  eventId: string;
  eventName: string;
  eventImageUrl: string;
  tickets: {
    [ticketId: string]: TicketItem;
  };
}

interface CartStore {
  cartItems: CartItem[];
  addToCart: (
    eventId: string,
    eventName: string, // Added event name
    eventImageUrl: string,
    tickets: {
      [ticketId: string]: {
        ticketType: string;
        quantity: number;
        price: number;
      };
    }, // Added ticket type
  ) => void;
  updateCart: (eventId: string, ticketId: string, increment: number) => void;
  removeFromCart: (eventId: string, ticketId: string) => void;
  clearCart: () => void;
  getTotalCost: () => number;
  getTotalQuantity: () => number;
}

const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      cartItems: [],
      addToCart: (eventId, eventName, eventImageUrl, tickets) => {
        set((state) => {
          const updatedCartItems = state.cartItems.slice();
          let cartItem = updatedCartItems.find(
            (item) => item.eventId === eventId,
          );

          if (!cartItem) {
            cartItem = { eventId, eventName, eventImageUrl, tickets: {} };
            updatedCartItems.push(cartItem);
          }

          Object.entries(tickets).forEach(
            ([ticketId, { ticketType, quantity, price }]) => {
              if (cartItem!.tickets[ticketId]) {
                cartItem!.tickets[ticketId].quantity += quantity;
              } else {
                cartItem!.tickets[ticketId] = { ticketType, quantity, price };
              }
            },
          );

          return { cartItems: updatedCartItems };
        });
        toast.success("Added to cart.");
      },
      updateCart: (eventId, ticketId, increment) => {
        set((state) => {
          const updatedCartItems = state.cartItems.slice();
          const cartItem = updatedCartItems.find(
            (item) => item.eventId === eventId,
          );

          if (cartItem && cartItem.tickets[ticketId]) {
            cartItem.tickets[ticketId].quantity += increment;
            if (cartItem.tickets[ticketId].quantity <= 0) {
              delete cartItem.tickets[ticketId];
              if (Object.keys(cartItem.tickets).length === 0) {
                const index = updatedCartItems.indexOf(cartItem);
                updatedCartItems.splice(index, 1);
              }
            }
          }
          return { cartItems: updatedCartItems };
        });
      },
      removeFromCart: (eventId: string, ticketId: string) => {
        set((state) => {
          const updatedCartItems = state.cartItems.slice();
          const cartItem = updatedCartItems.find(
            (item) => item.eventId === eventId,
          );

          if (cartItem && cartItem.tickets[ticketId]) {
            delete cartItem.tickets[ticketId];
            if (Object.keys(cartItem.tickets).length === 0) {
              const index = updatedCartItems.indexOf(cartItem);
              updatedCartItems.splice(index, 1);
            }
          }
          return { cartItems: updatedCartItems };
        });
        toast.success("Removed from cart.");
      },
      clearCart: () => {
        set({ cartItems: [] });
        toast.success("Cart cleared.");
      },
      getTotalCost: () => {
        return get().cartItems.reduce((total, item) => {
          return (
            total +
            Object.values(item.tickets || {}).reduce(
              (itemTotal, { quantity, price }) => itemTotal + price * quantity,
              0,
            )
          );
        }, 0);
      },
      getTotalQuantity: () => {
        return get().cartItems.reduce((total, item) => {
          return (
            total +
            Object.values(item.tickets || {}).reduce(
              (itemTotal, { quantity }) => itemTotal + quantity,
              0,
            )
          );
        }, 0);
      },
    }),
    {
      name: "cart-session",
    },
  ),
);

export default useCart;
