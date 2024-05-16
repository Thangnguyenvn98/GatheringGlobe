// import * as React from "react";
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
// import toast from "react-hot-toast";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { FormEvent, useCallback, useEffect, useState } from "react";
// import { DateRange } from "react-day-picker";
// import queryString from "query-string";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import {number} from "zod";
// import {get} from "http";
// import {getDate} from "date-fns";

const EventForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [endTime, setEndTime] = useState<Date>(new Date());
  // const [venueId, setVenueId] = useState("");
  const [capacity, setCapacity] = useState(-1);
  const [location, setLocation] = useState("");
  // const [categories, setCategories] = useState([]);
  const [artistName, setArtistName] = useState("");
  // const [imageUrls, setImageUrls] = useState([]);
  const [ticketPriceRange, setTicketPriceRange] = useState({
    min: -1,
    max: -1,
  });
  const [roomChatLink, setRoomChatLink] = useState("");

  const reset = () => {
    setTitle("");
    setDescription("");
    setStartTime(new Date());
    setEndTime(new Date());
    // setVenueId("")
    setCapacity(-1);
    setInputValue(""); //not setLocation bc of the autocomplete fucntion
    // setCategories([])
    setArtistName("");
    // setImageUrls([])
    setTicketPriceRange({
      min: -1,
      max: -1,
    });
    setRoomChatLink("");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  // const handleChange = (e: any) => {
  //   const [minStr, maxStr] = e.target.value.split('-');
  //   const minInput = minStr ? parseInt(minStr, 10) : NaN; //the string maxStr should be parsed as a decimal number (base 10)
  //   const maxInput = maxStr ? parseInt(maxStr, 10) : NaN;

  //   if (!isNaN(minInput) && !isNaN(maxInput)) {
  //     setTicketPriceRange({ min:minInput, max:maxInput });
  //   }
  // };

  // const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
  // const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    // try {
    //   // const [title, startTime, endTime, venueId, capacity, location, categories, artistName, imageUrls] = data.values()
    //   console.log(data)
    //   toast.success("Event created successfully!");
    // } catch (error) {
    //   console.log(error)
    //   toast.error("Failed to create event. Please try again! (toast error frontend)");
    // }
    //   let params = [
    //     "title=" + title,
    //     "description=" + description,
    //     // "startTime=" + startTime.toISOString(), // Convert Date to string representation
    //     // "endTime=" + endTime.toISOString(), // Convert Date to string representation
    //     "capacity=" + capacity.toString(),
    //     "location=" + queryString.stringify({ location }, { encode: true }).slice(9),
    //     "categories=" + categories.join(","),
    //     "artistName=" + artistName,
    //     "imageUrls=" + imageUrls.join(","),
    //     // Assuming ticketPriceRange is an object with min and max properties
    //     "ticketPriceRange=" + ticketPriceRange.min + "-" + ticketPriceRange.max
    //   ];
    //   const finalParams = params.join("&"); //join the strings into one query
    //   console.log(`${API_BASE_URL}/?${finalParams}`);
    //   try {
    //     //axios.get() is a method provided by the Axios library to send a GET request to a specified URL.
    //     const response = await axios.get(
    //       `${API_BASE_URL}/api/events/search?${finalParams}`,
    //     );
    //     if (response.status === 200) {
    //       //if the data fetched successfully (status code === 200), navigate to another page
    //       response.data.forEach((item: Event) => {
    //         console.log(item);
    //       });
    //       navigate(`/events/search?${finalParams}`);
    //     } else if (response.status === 201) {
    //       //if no matching event found, we dont do the navigate(...) so that there is no error
    //       console.log("No matching event found");
    //     }
    //     // When you have the response navigate the page or refresh the page with the current result, etc ...
    //     //Based on the response navigate to the site that contain the search results
    //     //Noted that we currently do not have that page yet
    //     //So you can test just with response.data to see if we are getting the correct result back
    //     //You can create fake model by making a post request http://localhost:5050/api/events with the data in the events.ts file
    //   } catch (error) {
    //     console.error("Fail to search: ", error);
    //   }
    // };
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
      setLocation(value);
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
              value={title}
              onChange={(data) => setTitle(data.target.value)}
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
              value={description}
              onChange={(data) => setDescription(data.target.value)}
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
                onChange={(data) => setStartTime(new Date(data.target.value))}
                value={startTime.toISOString().slice(0, 16)}
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
                value={endTime.toISOString().slice(0, 16)}
                onChange={(data) => setEndTime(new Date(data.target.value))}
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
              value={capacity > 0 ? capacity : 0}
              onChange={(data) => setCapacity(parseInt(data.target.value, 10))}
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
              required
              {...register("location")}
              onChange={(e) => onInputChange(e)} //place this below so that it doe snot get overwritten?
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
              value={artistName}
              onChange={(data) => setArtistName(data.target.value)}
            />
            {errors.artistName && (
              <span className="text-red-500">{errors.artistName.message}</span>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="ticketPriceRange">Min ticket price</Label>
            <Input
              id="ticketPriceRange"
              type="text"
              placeholder="Enter min-max price range"
              {...register("ticketPriceRange", {
                required: {
                  value: true,
                  message: "input required",
                },
                pattern: {
                  value: /^\d+(\.\d+)?\-\d+(\.\d+)?$/,
                  message:
                    "Input price range must have format min price - max price with no currency unit",
                },
              })}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="roomChatLink">Room Chat Link</Label>
            <Input
              id="roomChatLink"
              placeholder="Enter room chat link"
              {...register("roomChatLink")}
              value={roomChatLink}
              onChange={(data) => setRoomChatLink(data.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="">
            Create Event
          </Button>
          <Button onClick={reset} className="">
            Reset Form
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default EventForm;
//add a clear form button using reset?
