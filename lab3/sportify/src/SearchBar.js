import { useState } from "react";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";
  import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
  } from "@reach/combobox";
  import "@reach/combobox/styles.css";

const SearchBar = ({ setAddress, setCenter }) => {
    const {
      ready,
      value,
      setValue,
      suggestions: { status, data },
      clearSuggestions,
    } = usePlacesAutocomplete();
    const [comboboxList, setComboboxList] = useState(true);
  
    const handleSelect = async (address) => {
      setValue(address, false);
      clearSuggestions();
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      setAddress(address);
      setCenter({ lat: lat, lng: lng });
      setComboboxList(false);
    };
  
    return (
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          placeholder={"Search for address"}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setComboboxList(true);
          }}
          disabled={!ready}
        />
        {comboboxList && (
          <ComboboxPopover>
            <ComboboxList className="">
              {status === "OK" &&
                data.map(({ place_id, description }) => (
                  <ComboboxOption key={place_id} value={description} />
                ))}
            </ComboboxList>
          </ComboboxPopover>
        )}
      </Combobox>
    );
  };

  export default SearchBar