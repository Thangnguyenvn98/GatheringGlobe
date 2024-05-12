import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { FormEvent, useCallback, useEffect, useState } from "react";
// import { APIProvider, Map } from "@vis.gl/react-google-maps";

const EventForm = () => {
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
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-1 container">
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
    </div>
  );
};

// const AppWithAPIProvider = () => {
//   const apikey = import.meta.env.VITE_PUBLIC_GOOGLE_MAPS_API_KEY;

//   return (
//     <APIProvider apiKey={apikey}>
//       <div>
//         <Map
//             defaultZoom={3}
//             defaultCenter={{ lat: 22.54992, lng: 0 }}
//             gestureHandling={"greedy"}
//             disableDefaultUI={true}
//             className="hidden"
//           />
//         <EventForm />
//       </div>
//     </APIProvider>
//   );
// };

// export default AppWithAPIProvider;
export default EventForm;
