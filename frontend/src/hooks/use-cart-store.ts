import { create } from "zustand";
import { persist } from "zustand/middleware";
import toast from "react-hot-toast";

interface CartItem {
  eventId: string;
  tickets: {
    [ticketId: string]: {
      quantity: number;
      price: number;
    };
  };
}

interface CartStore {
  cartItems: CartItem[];
  addToCart: (eventId: string, ticketId: string, price: number) => void; // Updated signature
  removeFromCart: (eventId: string, ticketType: string) => void;
  clearCart: () => void;
  getTotalCost: () => number;
}

const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      cartItems: [],
      addToCart: (eventId, ticketId, price) => {
        set((state) => {
          const updatedCartItems = state.cartItems.slice(); // Create a shallow copy of cart items
          const cartItem = updatedCartItems.find(
            (item) => item.eventId === eventId,
          );

          if (cartItem) {
            // If the cart already has this event
            if (cartItem.tickets[ticketId]) {
              // If the ticket already exists, increment the quantity by one
              cartItem.tickets[ticketId].quantity += 1;
            } else {
              // If the ticket does not exist, add new ticket under this event with quantity set to 1
              cartItem.tickets[ticketId] = { quantity: 1, price };
            }
          } else {
            // If the event does not exist in the cart, add new event and ticket with quantity set to 1
            updatedCartItems.push({
              eventId,
              tickets: {
                [ticketId]: { quantity: 1, price },
              },
            });
          }
          return { cartItems: updatedCartItems };
        });
        toast.success("Added to cart.");
      },
      removeFromCart: (eventId: string, ticketId: string) => {
        set((state) => {
          const updatedCartItems = state.cartItems.slice(); // Create a shallow copy of cart items
          const cartItemIndex = updatedCartItems.findIndex(
            (item) => item.eventId === eventId,
          );

          if (cartItemIndex !== -1) {
            const cartItem = updatedCartItems[cartItemIndex];
            if (
              cartItem.tickets[ticketId] &&
              cartItem.tickets[ticketId].quantity > 0
            ) {
              cartItem.tickets[ticketId].quantity -= 1; // Decrement the quantity by one

              // If the quantity reaches zero, delete the ticket type from the item
              if (cartItem.tickets[ticketId].quantity === 0) {
                delete cartItem.tickets[ticketId];
              }

              // If no more tickets left for the event, remove the event from the cart
              if (Object.keys(cartItem.tickets).length === 0) {
                updatedCartItems.splice(cartItemIndex, 1);
              }
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
            Object.values(item.tickets).reduce(
              (itemTotal, { quantity, price }) => itemTotal + price * quantity,
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
