import { FormEvent, useCallback, useEffect, useState } from "react";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { Input } from "../ui/input";
import { useFormContext } from "react-hook-form";

interface EventLocationProps {
  name: string;
  onChange?: (value: string) => void;
}

function EventLocation({ name = "", onChange }: EventLocationProps) {
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [province, setProvince] = useState("");

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
        onChange(value); // Call the onChange prop if provided
      }
    },
    [fetchPredictions, onChange], // removed inputValue from dependency array
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
          console.log(placeDetails.address_components);
          interface AddressMap {
            [key: string]: string;
          }
          const addressMap: AddressMap = {}; //defiend map to use string as key
          placeDetails.address_components.forEach((component) => {
            if (component.types && component.types.length > 0) {
              const primaryType = component.types[0];
              addressMap[primaryType] = component.long_name;
            }
          });
          setCity(
            addressMap["locality"]
              ? addressMap["locality"]
              : addressMap["administrative_area_level_1"],
          );
          setProvince(
            addressMap["locality"]
              ? addressMap["administrative_area_level_1"]
              : "",
          );
          setCountry(addressMap["country"]);
          setPostalCode(addressMap["postal_code"]);

          const formatAddress = placeDetails.formatted_address;
          setPredictionResults([]);
          if (formContext) {
            formContext.setValue(name, formatAddress ?? "");
          }
          if (onChange) {
            onChange(formatAddress ?? "");
          }
          setSessionToken(new places.AutocompleteSessionToken());
        }
      };
      placesService?.getDetails(detailRequestOptions, detailsRequestCallback);
    },
    [places, placesService, sessionToken, formContext, name, onChange],
  );

  return (
    <div className="relative">
      <div className="p-0 mx-0 text-[12pt] text-black text-sm font-medium">
        Postal code*
      </div>
      <div className="flex items-center">
        <Input
          id="postalCode"
          value={postalCode}
          placeholder="Location postal code"
          {...(formContext ? formContext.register(name) : {})} // Register the input with react-hook-form if within a form context
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
      <div className="p-0 mx-0 text-[12pt] text-black text-sm font-medium">
        City*
      </div>
      <div className="flex items-center">
        <Input id="city" readOnly value={city} placeholder="Location city" />
      </div>
      <div className="p-0 mx-0 text-[12pt] text-black text-sm font-medium">
        State/Province*
      </div>
      <div className="flex items-center">
        <Input
          id="province"
          value={province}
          readOnly
          placeholder="Location state/province"
        />
      </div>
      <div className="p-0 mx-0 text-[12pt] text-black text-sm font-medium">
        Country*
      </div>
      <div className="flex items-center">
        <Input
          id="country"
          value={country}
          readOnly
          placeholder="Location postal code"
        />
      </div>
    </div>
  );
}

export default EventLocation;
