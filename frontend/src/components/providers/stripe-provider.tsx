/* eslint-disable react-refresh/only-export-components */
import React, { ReactNode, useContext } from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";

const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY || "";
const stripePromise = loadStripe(STRIPE_PUB_KEY);

type StripeContextType = {
  stripePromise: Promise<Stripe | null>;
};

interface StripeProviderProps {
  children: ReactNode; // This explicitly declares that children are expected
}

const StripeContext = React.createContext<StripeContextType>({ stripePromise });

export const useStripeContext = () => useContext(StripeContext);

export const StripeProvider = ({ children }: StripeProviderProps) => {
  return (
    <StripeContext.Provider value={{ stripePromise }}>
      {children}
    </StripeContext.Provider>
  );
};
