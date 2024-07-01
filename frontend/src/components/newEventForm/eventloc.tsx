import { FormEvent, useCallback, useEffect, useState } from "react";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { Input } from "../ui/input";
import { useFormContext } from "react-hook-form";
import { LocationType } from "@/types/event";
interface EventLocationProps {
  onChange?: (value: LocationType) => void;
  initialValues?: LocationType;
}

function EventLocation({ onChange, initialValues }: EventLocationProps) {
  const [city, setCity] = useState(initialValues?.city || "");
  const [postalCode, setPostalCode] = useState(initialValues?.postalCode || "");
  const [country, setCountry] = useState(initialValues?.country || "");
  const [state, setState] = useState(initialValues?.state || "");

  const formContext = useFormContext();
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

      const request = { input: inputValue, sessionToken, types: ["(regions)"] };
      const response = await autocompleteService.getPlacePredictions(request);
      setPredictionResults(response ? response.predictions : []);
    },
    [autocompleteService, sessionToken],
  );

  const onInputChange = useCallback(
    (event: FormEvent<HTMLInputElement>) => {
      const value = (event.target as HTMLInputElement).value;
      fetchPredictions(value);
      setPostalCode(value);
      if (onChange) {
        onChange({ city, postalCode: value, country, state });
      }
    },
    [fetchPredictions, onChange, city, country, state],
  );

  const handleSuggestionClick = useCallback(
    (placeId: string) => {
      if (!places) return;

      const detailRequestOptions = {
        placeId,
        fields: ["address_components", "formatted_address", "geometry"],
        sessionToken,
      };
      const detailsRequestCallback = (
        placeDetails: google.maps.places.PlaceResult | null,
      ) => {
        if (placeDetails && placeDetails.address_components) {
          interface AddressMap {
            [key: string]: string;
          }
          const addressMap: AddressMap = {};
          placeDetails.address_components.forEach((component) => {
            if (component.types && component.types.length > 0) {
              const primaryType = component.types[0];
              addressMap[primaryType] = component.long_name;
            }
          });
          const updatedCity =
            addressMap["locality"] || addressMap["administrative_area_level_1"];
          const updatedState = addressMap["administrative_area_level_1"];
          const updatedCountry = addressMap["country"];
          const updatedPostalCode = addressMap["postal_code"];

          setCity(updatedCity);
          setState(updatedState);
          setCountry(updatedCountry);
          setPostalCode(updatedPostalCode);

          setPredictionResults([]);

          const updatedLocation: LocationType = {
            city: updatedCity,
            postalCode: updatedPostalCode,
            country: updatedCountry,
            state: updatedState,
          };

          if (formContext) {
            formContext.setValue("location.city", updatedCity);
            formContext.setValue("location.postalCode", updatedPostalCode);
            formContext.setValue("location.country", updatedCountry);
            formContext.setValue("location.state", updatedState);
          }
          if (onChange) {
            onChange(updatedLocation);
          }
          setSessionToken(new places.AutocompleteSessionToken());
        }
      };
      placesService?.getDetails(detailRequestOptions, detailsRequestCallback);
    },
    [places, placesService, sessionToken, formContext, onChange],
  );

  useEffect(() => {
    if (formContext) {
      formContext.register("location.city");
      formContext.register("location.postalCode");
      formContext.register("location.country");
      formContext.register("location.state");
    }
  }, [formContext]);

  return (
    <div className="relative">
      <div className="p-0 mx-0 my-2 text-[12pt] text-black text-sm font-medium">
        Postal code*
      </div>
      <div className="flex items-center">
        <Input
          id="postalCode"
          value={postalCode}
          placeholder="Location postal code"
          onChange={(e) => onInputChange(e)}
        />
        {predictionResults.length > 0 && (
          <ul className="absolute top-[100%] left-0 right-0 z-[10] overflow-y-hidden w-full border-solid border-2 border-black max-h-[200px] bg-white">
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
      <div className="p-0 mx-0 my-2 text-[12pt] text-black text-sm font-medium">
        City*
      </div>
      <div className="flex items-center">
        <Input id="city" readOnly value={city} placeholder="Location city" />
      </div>
      <div className="p-0 mx-0 my-2 text-[12pt] text-black text-sm font-medium">
        State*
      </div>
      <div className="flex items-center">
        <Input id="state" value={state} readOnly placeholder="Location state" />
      </div>
      <div className="p-0 mx-0 my-2 text-[12pt] text-black text-sm font-medium">
        Country*
      </div>
      <div className="flex items-center">
        <Input
          id="country"
          value={country}
          readOnly
          placeholder="Location country"
        />
      </div>
    </div>
  );
}

export default EventLocation;
