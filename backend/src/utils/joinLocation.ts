import { LocationType } from "../models/event";

export const joinLocation = (location: LocationType): string => {
  return [location.city, location.state, location.postalCode, location.country]
    .filter(Boolean)
    .join(", ");
};
