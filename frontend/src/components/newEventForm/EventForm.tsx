import { FormData } from "@/types/formData";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { FormEvent, useCallback, useEffect, useState } from "react";

const EventForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await axios.post("/events", data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success("Event created successfully!");
      console.log(response.data);
    } catch (error) {
      toast.error("Failed to create event. Please try again!");
    }
  };

  const map = useMap();

  const places = useMapsLibrary("places");

  const [sessionToken, setSessionToken] =
    useState<google.maps.places.AutocompleteSessionToken>();

  const [placesService, setPlacesService] =
    useState<google.maps.places.PlacesService | null>(null);

  const [autocompleteService, setAutocompleteService] =
    useState<google.maps.places.AutocompleteService | null>(null);

  const [predictionResults, setPredictionResults] = useState<
    Array<google.maps.places.AutocompletePrediction>
  >([]);

  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    if (!places || !map) return;

    setAutocompleteService(new places.AutocompleteService());
    setPlacesService(new places.PlacesService(map));
    setSessionToken(new places.AutocompleteSessionToken());

    return () => setAutocompleteService(null);
  }, [map, places]);

  const fetchPredictions = useCallback(
    async (inputValue: string) => {
      if (!autocompleteService || !inputValue) {
        setPredictionResults([]);
        return;
      }

      const request = { input: inputValue, sessionToken, types: ["(cities)"] };
      const response = await autocompleteService.getPlacePredictions(request);
      setPredictionResults(response ? response.predictions : []);
    },
    [autocompleteService, sessionToken],
  );

  const onInputChange = useCallback(
    (event: FormEvent<HTMLInputElement>) => {
      const value = (event.target as HTMLInputElement).value;
      setInputValue(value); // Update the state
      fetchPredictions(value);
    },
    [fetchPredictions], // removed inputValue from dependency array
  );

  const handleSuggestionClick = useCallback(
    (placeId: string) => {
      if (!places) return;

      const detailRequestOptions = {
        placeId,
        fields: ["formatted_address"],
        sessionToken,
      };
      const detailsRequestCallback = (
        placeDetails: google.maps.places.PlaceResult | null,
      ) => {
        const formatAddress = placeDetails?.formatted_address
          ?.split(",")
          .splice(0, 2)
          .join(",");
        setPredictionResults([]);
        setInputValue(formatAddress ?? "");
        setSessionToken(new places.AutocompleteSessionToken());
      };
      // Directly use the description from the prediction result
      placesService?.getDetails(detailRequestOptions, detailsRequestCallback);
    },

    [places, placesService, sessionToken],
  );
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="max-w-4xl mx-auto p-5">
        <CardHeader className="text-center">
          <CardTitle>Create New Event</CardTitle>
          <CardDescription>
            Fill out the form below to schedule a new event.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter event title"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <span className="text-red-500">{errors.title.message}</span>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Enter event description"
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && (
              <span className="text-red-500">{errors.description.message}</span>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                type="datetime-local"
                {...register("startTime", {
                  required: "Start time is required",
                })}
              />
              {errors.startTime && (
                <span className="text-red-500">{errors.startTime.message}</span>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                type="datetime-local"
                {...register("endTime", { required: "End time is required" })}
              />
              {errors.endTime && (
                <span className="text-red-500">{errors.endTime.message}</span>
              )}
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="capacity">Capacity</Label>
            <Input
              id="capacity"
              type="number"
              placeholder="Enter maximum capacity"
              {...register("capacity", { required: "Capacity is required" })}
            />
            {errors.capacity && (
              <span className="text-red-500">{errors.capacity.message}</span>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="location">Location</Label>
            <Input
              value={inputValue}
              id="location"
              placeholder="Enter event location"
              onChange={(e) => onInputChange(e)}
              // {...register("location", { required: "Location is required" })}
            />
            {predictionResults.length > 0 && (
              <ul className="left-0 right-0 z-[100] overflow-y-hidden w-full border-solid border-2 border-black max-h-[200px] bg-solid bg-white">
                {predictionResults.map(({ place_id, description }) => {
                  return (
                    <li
                      key={place_id}
                      className="p-2 cursor-pointer"
                      onClick={() => handleSuggestionClick(place_id)}
                    >
                      {description}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="artistName">Artist Name</Label>
            <Input
              id="artistName"
              placeholder="Enter artist name"
              {...register("artistName", {
                required: "Artist name is required",
              })}
            />
            {errors.artistName && (
              <span className="text-red-500">{errors.artistName.message}</span>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="ticketPriceRange">Ticket Price Range</Label>
            <Input
              id="ticketPriceRange"
              placeholder="Enter ticket price range"
              {...register("ticketPriceRange", {
                required: "Ticket price range is required",
              })}
            />
            {errors.ticketPriceRange && (
              <span className="text-red-500">
                {errors.ticketPriceRange.message}
              </span>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="roomChatLink">Room Chat Link</Label>
            <Input
              id="roomChatLink"
              placeholder="Enter room chat link"
              {...register("roomChatLink")}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Create Event
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default EventForm;
