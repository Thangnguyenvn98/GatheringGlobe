import {FormEvent, useCallback, useEffect, useState } from 'react';
import { Navigation } from 'lucide-react';
import {useMap, useMapsLibrary} from '@vis.gl/react-google-maps';
import {Input} from '../ui/input';

function EventLocation({setLocationFromParent}:{setLocationFromParent:(value:string)=>void}) {
    //setlocation is the function called when the event happen
    //state of location object is what chenged
    //"Event Locations" is the initial value of location object
    //locationChosen is triggered when button is click, the value locchosen in the button  is passed in
    //it then trigger setlocation which set location object to the value of locchosen
    const map = useMap();
    const places = useMapsLibrary('places');

    const [sessionToken, setSessionToken] =
    useState<google.maps.places.AutocompleteSessionToken>();

    const [placesService, setPlacesService] =
    useState<google.maps.places.PlacesService | null>(null);

  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service
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

      const request = {input: inputValue, sessionToken, types:['(cities)']};
      const response = await autocompleteService.getPlacePredictions(request);
      setPredictionResults(response ? response.predictions : []);
    },
    [autocompleteService, sessionToken]
  );

  const onInputChange = useCallback(
    (event: FormEvent<HTMLInputElement>) => {
      const value = (event.target as HTMLInputElement).value;
      setInputValue(value);  // Update the state
      fetchPredictions(value);
    },
    [fetchPredictions] // removed inputValue from dependency array
  );

  const handleSuggestionClick = useCallback(
    (placeId: string) => {
      if (!places) return;

      const detailRequestOptions = {
        placeId,
        fields: ['formatted_address'],
        sessionToken
      };
      const detailsRequestCallback = (
        placeDetails: google.maps.places.PlaceResult | null
      ) => {
        const formatAddress = placeDetails?.formatted_address?.split(',').splice(0,2).join(',')
        setPredictionResults([]);
        setInputValue(formatAddress ?? '');
        setLocationFromParent(formatAddress ?? '');
        setSessionToken(new places.AutocompleteSessionToken());
      };
      // Directly use the description from the prediction result
      placesService?.getDetails(detailRequestOptions, detailsRequestCallback);

    },

    [ places, placesService, sessionToken]
  );

   
    return (
        <div className="relative">
             <div className="flex items-center justify-between">
            <Navigation/>
             <Input value={inputValue} onChange={(e)=> onInputChange(e)} placeholder='Location'/>

             </div>
            {predictionResults.length > 0 && (
            <ul className="absolute top-[100%] left-0 right-0 z-[10] overflow-y-hidden w-full border-solid border-2 border-black max-h-[200px] bg-white">
          {predictionResults.map(({place_id, description}) => {
            return (
              <li
                key={place_id}
                className="p-2 cursor-pointer"
                onClick={() => handleSuggestionClick(place_id)}>
                {description}
              </li>
            );
          })}
            </ul>
             )}
        </div>
    )
}

export default EventLocation;