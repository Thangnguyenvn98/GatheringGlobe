import moongose from 'mongoose';

export type VenueType = { 
venueId: number,    
  name: string,                    
  address: string ,                 
  city: string ,                    
  capacity: number 

};

const venueSchema = new moongose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    capacity: { type: Number, required: true },
}); 

export const Venue = moongose.model<VenueType>("Venue", venueSchema);   